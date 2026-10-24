/**
 * Preguntas del Google Form.
 * - `title`: título EXACTO de la pregunta en el Form (lo usa `npm run form:entries`).
 * - `env`: variable de entorno donde va su `entry.XXXX` (en `.env` o en Netlify).
 *
 * Este archivo no importa nada para que el script de Node pueda leerlo directamente.
 */
export const FORM_FIELDS = {
  idCaso: { title: 'ID de caso', env: 'VITE_GOOGLE_ENTRY_ID_CASO' },
  categoria: { title: 'Categoría', env: 'VITE_GOOGLE_ENTRY_CATEGORIA' },
  confianza: { title: 'Confianza de clasificación', env: 'VITE_GOOGLE_ENTRY_CONFIANZA' },
  consulta: { title: 'Consulta original', env: 'VITE_GOOGLE_ENTRY_CONSULTA' },
  nombre: { title: 'Nombre', env: 'VITE_GOOGLE_ENTRY_NOMBRE' },
  correo: { title: 'Correo', env: 'VITE_GOOGLE_ENTRY_CORREO' },
  pedido: { title: 'Número de pedido', env: 'VITE_GOOGLE_ENTRY_PEDIDO' },
  prenda: { title: 'Prenda', env: 'VITE_GOOGLE_ENTRY_PRENDA' },
  motivoCambio: { title: 'Motivo del cambio', env: 'VITE_GOOGLE_ENTRY_MOTIVO_CAMBIO' },
  tallaNueva: { title: 'Talla o color nuevo', env: 'VITE_GOOGLE_ENTRY_TALLA_NUEVA' },
  fechaPrometida: {
    title: 'Fecha de entrega prometida',
    env: 'VITE_GOOGLE_ENTRY_FECHA_PROMETIDA',
  },
  descripcionFalla: {
    title: 'Descripción de la falla',
    env: 'VITE_GOOGLE_ENTRY_DESCRIPCION_FALLA',
  },
  preferenciaFalla: {
    title: 'Preferencia si no hay stock',
    env: 'VITE_GOOGLE_ENTRY_PREFERENCIA_FALLA',
  },
  ruc: { title: 'RUC', env: 'VITE_GOOGLE_ENTRY_RUC' },
  razonSocial: { title: 'Razón social', env: 'VITE_GOOGLE_ENTRY_RAZON_SOCIAL' },
  direccionFiscal: { title: 'Dirección fiscal', env: 'VITE_GOOGLE_ENTRY_DIRECCION_FISCAL' },
  respuestaBot: {
    title: 'Respuesta entregada por el bot',
    env: 'VITE_GOOGLE_ENTRY_RESPUESTA_BOT',
  },
} as const;

export type FormFieldKey = keyof typeof FORM_FIELDS;
export type FormEntryEnvName = (typeof FORM_FIELDS)[FormFieldKey]['env'];

export const FORM_ID_ENV = 'VITE_GOOGLE_FORM_ID';
