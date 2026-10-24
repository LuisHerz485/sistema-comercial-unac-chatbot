import { INTENTS } from '../intents';
import type { CaseData, IntentId } from '../types';
import type { CasePayload } from './submitCase';

interface BuildPayloadInput {
  caseId: string;
  intent: IntentId;
  confidence: number;
  originalQuery: string;
  data: CaseData;
}

/** Convierte el caso del chat en una fila del Sheet (una pregunta del Form por columna). */
export function buildPayload({
  caseId,
  intent,
  confidence,
  originalQuery,
  data,
}: BuildPayloadInput): CasePayload {
  const { formLabel, policy } = INTENTS[intent];
  return {
    ...data,
    idCaso: caseId,
    categoria: formLabel,
    confianza: `${Math.round(confidence * 100)}%`,
    consulta: originalQuery,
    respuestaBot: `${policy.title}: ${policy.points.join(' ')}`,
  };
}

export function createCaseId(now: Date = new Date()): string {
  const stamp = now.getTime().toString(36).toUpperCase().slice(-6);
  return `CS-${stamp}`;
}
