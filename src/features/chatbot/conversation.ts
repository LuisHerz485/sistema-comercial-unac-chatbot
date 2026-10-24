import { classify, extractKnownData } from './classifier';
import { INTENTS, fieldsFor } from './intents';
import type {
  BotContent,
  CaseData,
  CaseField,
  ChatMessage,
  ChatStage,
  IntentId,
  QuickReply,
} from './types';

export interface ChatState {
  stage: ChatStage;
  messages: readonly ChatMessage[];
  data: CaseData;
  /** Primer mensaje libre del cliente; se guarda en el Sheet como "Consulta original". */
  originalQuery: string;
  confidence: number;
  /** Error de validación del último valor ingresado. */
  fieldError: string | null;
}

export type ChatEvent =
  | { type: 'user-text'; text: string }
  | { type: 'pick-intent'; intent: IntentId }
  | { type: 'pick-value'; value: string }
  | { type: 'open-case' }
  | { type: 'info-only' }
  | { type: 'reclassify' }
  | { type: 'submit' }
  | { type: 'submit-success'; caseId: string }
  | { type: 'submit-failure' }
  | { type: 'restart' };

let messageSeq = 0;
const nextId = (): string => `m${++messageSeq}`;

const bot = (content: BotContent): ChatMessage => ({ id: nextId(), from: 'bot', content });
const botText = (text: string): ChatMessage => bot({ kind: 'text', text });
const user = (text: string): ChatMessage => ({ id: nextId(), from: 'user', text });

const WELCOME =
  'Hola, soy el asistente de LIJA. Cuéntame qué pasó con tu pedido y lo encamino al equipo correcto.';

export function createInitialState(): ChatState {
  return {
    stage: { name: 'awaiting-query' },
    messages: [botText(WELCOME)],
    data: {},
    originalQuery: '',
    confidence: 0,
    fieldError: null,
  };
}

/** Siguiente campo sin responder a partir de `from`, o `null` si ya están todos. */
function nextPendingField(
  intent: IntentId,
  data: CaseData,
  from: number,
): { index: number; field: CaseField } | null {
  const fields = fieldsFor(intent);
  for (let index = from; index < fields.length; index++) {
    const field = fields[index];
    if (field && !data[field.key]) return { index, field };
  }
  return null;
}

function advanceCollection(state: ChatState, intent: IntentId, from: number): ChatState {
  const pending = nextPendingField(intent, state.data, from);
  if (!pending) return withReviewStage(state, intent);
  return {
    ...state,
    stage: { name: 'collecting', intent, fieldIndex: pending.index },
    messages: [...state.messages, botText(pending.field.prompt)],
    fieldError: null,
  };
}

function withReviewStage(state: ChatState, intent: IntentId): ChatState {
  return {
    ...state,
    stage: { name: 'review', intent },
    messages: [
      ...state.messages,
      botText('Revisa tu caso antes de enviarlo:'),
      bot({ kind: 'summary', intent, data: state.data }),
    ],
    fieldError: null,
  };
}

function acceptIntent(
  state: ChatState,
  intent: IntentId,
  confidence: number,
  matched: readonly string[],
): ChatState {
  return {
    ...state,
    stage: { name: 'offer-case', intent },
    confidence,
    messages: [
      ...state.messages,
      bot({ kind: 'classified', intent, confidence, matchedTerms: matched }),
      bot({ kind: 'policy', intent }),
      botText('¿Abrimos un caso para que el equipo lo resuelva?'),
    ],
  };
}

function handleQuery(state: ChatState, text: string): ChatState {
  const result = classify(text);
  const withUser: ChatState = {
    ...state,
    originalQuery: state.originalQuery || text,
    data: { ...extractKnownData(text), ...state.data },
    messages: [...state.messages, user(text)],
  };

  if (result.intent) {
    return acceptIntent(withUser, result.intent, result.confidence, result.matchedTerms);
  }

  return {
    ...withUser,
    stage: { name: 'choose-intent', originalQuery: text },
    confidence: result.confidence,
    messages: [
      ...withUser.messages,
      botText(
        result.matchedTerms.length > 0
          ? 'Tu consulta toca más de un tema. ¿Cuál describe mejor lo que necesitas?'
          : 'No estoy seguro de haber entendido. ¿Cuál de estos temas es el tuyo?',
      ),
    ],
  };
}

function handleFieldValue(
  state: ChatState,
  intent: IntentId,
  fieldIndex: number,
  raw: string,
): ChatState {
  const field = fieldsFor(intent)[fieldIndex];
  if (!field) return state;

  const value = raw.trim();
  const error = field.validate?.(value) ?? null;
  const withUser: ChatState = { ...state, messages: [...state.messages, user(value)] };

  if (error) {
    return { ...withUser, fieldError: error, messages: [...withUser.messages, botText(error)] };
  }

  const normalized = field.key === 'pedido' ? value.toUpperCase() : value;
  return advanceCollection(
    { ...withUser, data: { ...state.data, [field.key]: normalized } },
    intent,
    fieldIndex + 1,
  );
}

export function chatReducer(state: ChatState, event: ChatEvent): ChatState {
  const { stage } = state;

  switch (event.type) {
    case 'restart':
      return createInitialState();

    case 'user-text': {
      const text = event.text.trim();
      if (!text) return state;
      if (stage.name === 'collecting')
        return handleFieldValue(state, stage.intent, stage.fieldIndex, text);
      if (
        stage.name === 'awaiting-query' ||
        stage.name === 'choose-intent' ||
        stage.name === 'done'
      ) {
        const base =
          stage.name === 'done' ? { ...createInitialState(), messages: state.messages } : state;
        return handleQuery(base, text);
      }
      if (stage.name === 'offer-case') {
        return handleQuery({ ...state, stage: { name: 'awaiting-query' } }, text);
      }
      return state;
    }

    case 'pick-intent': {
      const intent = INTENTS[event.intent];
      const withUser: ChatState = {
        ...state,
        originalQuery: state.originalQuery || intent.sampleQuestion,
        messages: [...state.messages, user(intent.shortLabel)],
      };
      return acceptIntent(withUser, event.intent, 1, []);
    }

    case 'pick-value':
      if (stage.name !== 'collecting') return state;
      return handleFieldValue(state, stage.intent, stage.fieldIndex, event.value);

    case 'open-case':
      if (stage.name !== 'offer-case') return state;
      return advanceCollection(
        { ...state, messages: [...state.messages, user('Sí, abrir caso')] },
        stage.intent,
        0,
      );

    case 'info-only':
      if (stage.name !== 'offer-case') return state;
      return {
        ...state,
        stage: { name: 'awaiting-query' },
        messages: [
          ...state.messages,
          user('Solo quería saber'),
          botText('Perfecto. Si necesitas algo más, escríbeme aquí mismo.'),
        ],
      };

    case 'reclassify':
      if (stage.name !== 'offer-case') return state;
      return {
        ...state,
        stage: { name: 'choose-intent', originalQuery: state.originalQuery },
        messages: [
          ...state.messages,
          user('No es eso'),
          botText('Gracias por avisar. ¿Cuál es tu tema?'),
        ],
      };

    case 'submit':
      if (stage.name !== 'review' && stage.name !== 'submit-error') return state;
      return { ...state, stage: { name: 'submitting', intent: stage.intent } };

    case 'submit-success':
      if (stage.name !== 'submitting') return state;
      return {
        ...state,
        stage: { name: 'done', intent: stage.intent, caseId: event.caseId },
        messages: [
          ...state.messages,
          bot({ kind: 'receipt', caseId: event.caseId, intent: stage.intent }),
        ],
      };

    case 'submit-failure':
      if (stage.name !== 'submitting') return state;
      return {
        ...state,
        stage: { name: 'submit-error', intent: stage.intent },
        messages: [
          ...state.messages,
          botText(
            'No pude enviar tu caso. Revisa tu conexión e inténtalo otra vez; tus datos siguen aquí.',
          ),
        ],
      };
  }
}

/** Botones de respuesta rápida según la etapa. */
export function quickRepliesFor(state: ChatState): readonly QuickReply[] {
  const { stage } = state;
  switch (stage.name) {
    case 'awaiting-query':
    case 'choose-intent':
      return Object.values(INTENTS).map((intent) => ({
        type: 'intent',
        intent: intent.id,
        label: intent.shortLabel,
      }));
    case 'offer-case':
      return [
        { type: 'action', action: 'open-case', label: 'Sí, abrir caso' },
        { type: 'action', action: 'info-only', label: 'Solo quería saber' },
        { type: 'action', action: 'reclassify', label: 'No es eso' },
      ];
    case 'collecting': {
      const field = fieldsFor(stage.intent)[stage.fieldIndex];
      if (field?.input.kind !== 'choice') return [];
      return field.input.options.map((option) => ({ type: 'value', value: option, label: option }));
    }
    case 'review':
      return [
        { type: 'action', action: 'submit', label: 'Enviar caso' },
        { type: 'action', action: 'restart', label: 'Empezar de nuevo' },
      ];
    case 'submit-error':
      return [
        { type: 'action', action: 'retry', label: 'Reintentar envío' },
        { type: 'action', action: 'restart', label: 'Empezar de nuevo' },
      ];
    case 'done':
      return [{ type: 'action', action: 'restart', label: 'Nueva consulta' }];
    case 'submitting':
      return [];
  }
}

/** Campo que el bot está pidiendo ahora, para adaptar el input. */
export function currentField(state: ChatState): CaseField | null {
  const { stage } = state;
  if (stage.name !== 'collecting') return null;
  return fieldsFor(stage.intent)[stage.fieldIndex] ?? null;
}
