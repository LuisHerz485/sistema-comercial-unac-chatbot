/// <reference types="vite/client" />

import type { FormEntryEnvName } from './features/chatbot/googleForm/formFields';

declare global {
  type GoogleFormEntryEnv = Readonly<Partial<Record<FormEntryEnvName, string>>>;

  interface ImportMetaEnv extends GoogleFormEntryEnv {
    /** Id público del Google Form (tramo `1FAIpQL...` del enlace /viewform). */
    readonly VITE_GOOGLE_FORM_ID?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
