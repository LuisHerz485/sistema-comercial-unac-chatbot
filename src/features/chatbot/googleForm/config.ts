import { FORM_FIELDS } from './formFields';
import type { FormFieldKey } from './formFields';

export interface GoogleFormConfig {
  /** Id público del Form: el tramo `1FAIpQL...` de `https://docs.google.com/forms/d/e/<id>/viewform`. */
  formId: string;
  entries: Partial<Record<FormFieldKey, string>>;
}

const ENTRY_PATTERN = /^entry\.\d+$/;

/**
 * Lee el Form desde las variables de entorno (`.env` en local, "Environment variables" en Netlify).
 * Vite las incrusta al compilar, así que tras cambiarlas en Netlify hay que volver a desplegar.
 */
function readConfig(): GoogleFormConfig {
  const env = import.meta.env;
  const entries: Partial<Record<FormFieldKey, string>> = {};

  for (const [key, field] of Object.entries(FORM_FIELDS) as [
    FormFieldKey,
    (typeof FORM_FIELDS)[FormFieldKey],
  ][]) {
    const value = env[field.env]?.trim();
    if (!value) continue;
    if (ENTRY_PATTERN.test(value)) entries[key] = value;
    else console.warn(`[chatbot] ${field.env} debe tener el formato entry.123456789.`);
  }

  return { formId: env.VITE_GOOGLE_FORM_ID?.trim() ?? '', entries };
}

export const googleFormConfig = readConfig();

/** Sin Form configurado el bot funciona en modo demo: arma el envío pero no lo manda. */
export const isGoogleFormConfigured =
  googleFormConfig.formId.length > 0 &&
  googleFormConfig.entries.categoria !== undefined &&
  googleFormConfig.entries.correo !== undefined;
