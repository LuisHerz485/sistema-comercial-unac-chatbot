import { googleFormConfig, isGoogleFormConfigured } from './config';
import type { FormFieldKey } from './formFields';

export type CasePayload = Partial<Record<FormFieldKey, string>>;

export interface SubmitResult {
  mode: 'google-form' | 'demo';
}

const DEMO_DELAY_MS = 900;

export function toFormBody(payload: CasePayload): URLSearchParams {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(payload) as [FormFieldKey, string | undefined][]) {
    const entry = googleFormConfig.entries[key];
    if (entry !== undefined && value !== undefined && value.length > 0) {
      body.append(entry, value);
    }
  }
  return body;
}

/**
 * Envía el caso al endpoint público `formResponse` del Google Form.
 * Google no permite CORS, así que la respuesta es opaca: si la red responde, lo damos por enviado.
 * El Form debe aceptar respuestas sin iniciar sesión (sin restricción de dominio).
 */
export async function submitCase(
  payload: CasePayload,
  signal?: AbortSignal,
): Promise<SubmitResult> {
  if (!isGoogleFormConfigured) {
    console.info('[chatbot] Modo demo: configura el Google Form para enviar de verdad.', payload);
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, DEMO_DELAY_MS);
      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Envío cancelado', 'AbortError'));
      });
    });
    return { mode: 'demo' };
  }

  const url = `https://docs.google.com/forms/d/e/${googleFormConfig.formId}/formResponse`;
  await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: toFormBody(payload),
    signal: signal ?? null,
  });
  return { mode: 'google-form' };
}
