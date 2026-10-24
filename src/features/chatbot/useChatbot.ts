import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { chatReducer, createInitialState, currentField, quickRepliesFor } from './conversation';
import type { ChatEvent } from './conversation';
import { buildPayload, createCaseId } from './googleForm/buildPayload';
import { submitCase } from './googleForm/submitCase';
import type { QuickReply } from './types';

export function useChatbot() {
  const [state, dispatch] = useReducer(chatReducer, undefined, createInitialState);
  const { stage } = state;

  useEffect(() => {
    if (stage.name !== 'submitting') return;

    const controller = new AbortController();
    const caseId = createCaseId();
    const payload = buildPayload({
      caseId,
      intent: stage.intent,
      confidence: state.confidence,
      originalQuery: state.originalQuery,
      data: state.data,
    });

    submitCase(payload, controller.signal)
      .then(() => {
        dispatch({ type: 'submit-success', caseId });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        console.error('[chatbot] Error al enviar el caso', error);
        dispatch({ type: 'submit-failure' });
      });

    return () => {
      controller.abort();
    };
  }, [stage, state.confidence, state.originalQuery, state.data]);

  const send = useCallback((event: ChatEvent) => {
    dispatch(event);
  }, []);

  const choose = useCallback((reply: QuickReply) => {
    switch (reply.type) {
      case 'intent':
        dispatch({ type: 'pick-intent', intent: reply.intent });
        return;
      case 'value':
        dispatch({ type: 'pick-value', value: reply.value });
        return;
      case 'action':
        dispatch({ type: reply.action === 'retry' ? 'submit' : reply.action });
    }
  }, []);

  return useMemo(
    () => ({
      state,
      send,
      choose,
      quickReplies: quickRepliesFor(state),
      field: currentField(state),
    }),
    [state, send, choose],
  );
}
