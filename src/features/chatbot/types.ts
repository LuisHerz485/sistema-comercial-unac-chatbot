export const INTENT_IDS = [
  'cambio-oferta',
  'entrega-retrasada',
  'producto-falla',
  'factura-empresa',
] as const;

export type IntentId = (typeof INTENT_IDS)[number];

/** Claves de los datos que el bot recoge. Cada una se mapea a una pregunta del Google Form. */
export type CaseFieldKey =
  | 'nombre'
  | 'correo'
  | 'pedido'
  | 'prenda'
  | 'motivoCambio'
  | 'tallaNueva'
  | 'fechaPrometida'
  | 'descripcionFalla'
  | 'preferenciaFalla'
  | 'ruc'
  | 'razonSocial'
  | 'direccionFiscal';

export type FieldInput =
  | { kind: 'text'; placeholder: string }
  | { kind: 'email'; placeholder: string }
  | { kind: 'textarea'; placeholder: string }
  | { kind: 'choice'; options: readonly string[] };

export interface CaseField {
  key: CaseFieldKey;
  /** Etiqueta corta para el resumen del caso. */
  label: string;
  /** Pregunta que hace el bot. */
  prompt: string;
  input: FieldInput;
  /** Devuelve un mensaje de error o `null` si el valor es válido. */
  validate?: (value: string) => string | null;
}

export interface PolicyBlock {
  title: string;
  points: readonly string[];
}

export interface Intent {
  id: IntentId;
  /** Nombre que se guarda en la columna "Categoría" del Sheet. Debe coincidir con la opción del Form. */
  formLabel: string;
  /** Texto corto para el sticker. */
  shortLabel: string;
  /** Pregunta tipo del cliente (de la consigna). */
  sampleQuestion: string;
  policy: PolicyBlock;
  /** Campos propios de la categoría, además de los comunes. */
  fields: readonly CaseField[];
}

export interface Classification {
  intent: IntentId | null;
  /** 0–1. Qué tan separada está la primera opción de la segunda. */
  confidence: number;
  scores: Record<IntentId, number>;
  matchedTerms: readonly string[];
}

export type CaseData = Partial<Record<CaseFieldKey, string>>;

export type QuickReply =
  | { type: 'intent'; intent: IntentId; label: string }
  | { type: 'value'; value: string; label: string }
  | { type: 'action'; action: ChatAction; label: string };

export type ChatAction = 'open-case' | 'info-only' | 'submit' | 'restart' | 'retry' | 'reclassify';

export type BotContent =
  | { kind: 'text'; text: string }
  | { kind: 'classified'; intent: IntentId; confidence: number; matchedTerms: readonly string[] }
  | { kind: 'policy'; intent: IntentId }
  | { kind: 'summary'; intent: IntentId; data: CaseData }
  | { kind: 'receipt'; caseId: string; intent: IntentId };

export type ChatMessage =
  { id: string; from: 'bot'; content: BotContent } | { id: string; from: 'user'; text: string };

export type ChatStage =
  | { name: 'awaiting-query' }
  | { name: 'choose-intent'; originalQuery: string }
  | { name: 'offer-case'; intent: IntentId }
  | { name: 'collecting'; intent: IntentId; fieldIndex: number }
  | { name: 'review'; intent: IntentId }
  | { name: 'submitting'; intent: IntentId }
  | { name: 'submit-error'; intent: IntentId }
  | { name: 'done'; intent: IntentId; caseId: string };
