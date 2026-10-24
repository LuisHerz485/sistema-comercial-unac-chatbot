import type { CaseField, Intent, IntentId } from './types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER_PATTERN = /^LJ-?\d{4,6}$/i;
const RUC_PATTERN = /^(10|15|17|20)\d{9}$/;

const required =
  (message: string) =>
  (value: string): string | null =>
    value.trim().length > 0 ? null : message;

/** Campos que se piden en todas las categorías, en este orden. */
export const COMMON_FIELDS: readonly CaseField[] = [
  {
    key: 'nombre',
    label: 'Nombre',
    prompt: '¿A nombre de quién registramos el caso?',
    input: { kind: 'text', placeholder: 'Nombre y apellido' },
    validate: (value) => (value.trim().length >= 3 ? null : 'Escribe tu nombre y apellido.'),
  },
  {
    key: 'correo',
    label: 'Correo',
    prompt: '¿A qué correo te respondemos?',
    input: { kind: 'email', placeholder: 'tucorreo@ejemplo.com' },
    validate: (value) =>
      EMAIL_PATTERN.test(value.trim())
        ? null
        : 'Ese correo no parece válido. Revisa el @ y el dominio.',
  },
  {
    key: 'pedido',
    label: 'Pedido',
    prompt:
      '¿Cuál es tu número de pedido? Lo encuentras en el correo de confirmación (ej. LJ-20451).',
    input: { kind: 'text', placeholder: 'LJ-20451' },
    validate: (value) =>
      ORDER_PATTERN.test(value.trim())
        ? null
        : 'El número de pedido empieza con LJ y lleva de 4 a 6 dígitos, por ejemplo LJ-20451.',
  },
];

export const INTENTS: Record<IntentId, Intent> = {
  'cambio-oferta': {
    id: 'cambio-oferta',
    formLabel: 'Cambio de prenda en oferta',
    shortLabel: 'Cambio en oferta',
    sampleQuestion:
      'Quiero cambiar una prenda comprada en oferta. ¿Qué condiciones y plazos aplican?',
    policy: {
      title: 'Cambios de prendas en oferta',
      points: [
        'Tienes 7 días calendario desde la entrega para pedir el cambio.',
        'La prenda debe estar sin uso, sin lavar y con sus etiquetas.',
        'Se cambia por otra talla o color del mismo modelo, o por un vale del mismo valor.',
        'Las prendas en oferta no tienen devolución de dinero, salvo que lleguen con falla.',
        'El envío del cambio es gratis si recogemos en tu dirección dentro de la zona urbana.',
      ],
    },
    fields: [
      {
        key: 'prenda',
        label: 'Prenda',
        prompt: '¿Qué prenda quieres cambiar?',
        input: { kind: 'text', placeholder: 'Ej. Hoodie Calavera, talla M' },
        validate: required('Cuéntanos qué prenda es.'),
      },
      {
        key: 'motivoCambio',
        label: 'Motivo',
        prompt: '¿Por qué la quieres cambiar?',
        input: { kind: 'choice', options: ['Talla', 'Color', 'Otro modelo'] },
      },
      {
        key: 'tallaNueva',
        label: 'Talla/color nuevo',
        prompt: '¿Qué talla o color prefieres ahora?',
        input: { kind: 'text', placeholder: 'Ej. L, o negro' },
        validate: required('Indica la talla o el color que quieres.'),
      },
    ],
  },
  'entrega-retrasada': {
    id: 'entrega-retrasada',
    formLabel: 'Entrega retrasada',
    shortLabel: 'Entrega retrasada',
    sampleQuestion: '¿Cómo gestiono una entrega retrasada y qué compensación podría recibir?',
    policy: {
      title: 'Entregas retrasadas y compensación',
      points: [
        'Plazo normal: 2 a 4 días hábiles en zona urbana y 5 a 8 en otras ciudades.',
        '1 a 3 días hábiles de retraso: te devolvemos el costo del envío.',
        'Más de 3 días hábiles: además, un cupón de 15% para tu próxima compra.',
        'Más de 10 días hábiles: puedes cancelar el pedido y te reembolsamos el 100%.',
        'Revisamos el caso con el courier y te escribimos en menos de 24 horas hábiles.',
      ],
    },
    fields: [
      {
        key: 'fechaPrometida',
        label: 'Fecha prometida',
        prompt: '¿Qué fecha de entrega te indicamos al comprar?',
        input: { kind: 'text', placeholder: 'Ej. 18/10/2026' },
        validate: required('Indica la fecha aproximada de entrega que te dimos.'),
      },
    ],
  },
  'producto-falla': {
    id: 'producto-falla',
    formLabel: 'Producto con falla',
    shortLabel: 'Producto con falla',
    sampleQuestion: 'El producto llegó con una falla. ¿Cómo solicito un reemplazo?',
    policy: {
      title: 'Productos con falla y reemplazo',
      points: [
        'Repórtalo dentro de los 30 días desde que lo recibiste.',
        'Te pediremos fotos de la falla por correo para validarla.',
        'Si es falla de fábrica, reemplazamos la prenda (mismo modelo y talla) sin costo.',
        'Recogemos la prenda en tu dirección; no pagas envío.',
        'Si no hay stock, eliges otra prenda o el reembolso completo.',
      ],
    },
    fields: [
      {
        key: 'prenda',
        label: 'Prenda',
        prompt: '¿Qué prenda llegó con la falla?',
        input: { kind: 'text', placeholder: 'Ej. Cargo Asfalto, talla 30' },
        validate: required('Cuéntanos qué prenda es.'),
      },
      {
        key: 'descripcionFalla',
        label: 'Falla',
        prompt: 'Describe la falla: dónde está y cómo se ve.',
        input: { kind: 'textarea', placeholder: 'Ej. Costura abierta en el bolsillo derecho' },
        validate: (value) =>
          value.trim().length >= 10 ? null : 'Danos un poco más de detalle (mínimo 10 caracteres).',
      },
      {
        key: 'preferenciaFalla',
        label: 'Prefiere',
        prompt: 'Si no tuviéramos stock para reemplazarla, ¿qué prefieres?',
        input: { kind: 'choice', options: ['Reemplazo por otra prenda', 'Reembolso'] },
      },
    ],
  },
  'factura-empresa': {
    id: 'factura-empresa',
    formLabel: 'Factura a nombre de empresa',
    shortLabel: 'Factura a empresa',
    sampleQuestion: '¿Cómo pido factura a nombre de mi empresa y qué datos debo enviar?',
    policy: {
      title: 'Factura a nombre de empresa',
      points: [
        'Pídela dentro del mismo mes de la compra.',
        'Necesitamos: RUC (11 dígitos), razón social, dirección fiscal y número de pedido.',
        'La enviamos a tu correo en 24 a 48 horas hábiles.',
        'Si ya se emitió boleta, la anulamos y la reemplazamos por la factura.',
      ],
    },
    fields: [
      {
        key: 'ruc',
        label: 'RUC',
        prompt: '¿Cuál es el RUC de la empresa?',
        input: { kind: 'text', placeholder: '20123456789' },
        validate: (value) =>
          RUC_PATTERN.test(value.replace(/\s/g, ''))
            ? null
            : 'El RUC tiene 11 dígitos y empieza con 10, 15, 17 o 20.',
      },
      {
        key: 'razonSocial',
        label: 'Razón social',
        prompt: '¿Cuál es la razón social?',
        input: { kind: 'text', placeholder: 'Ej. Estudio Norte S.A.C.' },
        validate: required('Escribe la razón social tal como figura en el RUC.'),
      },
      {
        key: 'direccionFiscal',
        label: 'Dirección fiscal',
        prompt: '¿Y la dirección fiscal?',
        input: { kind: 'text', placeholder: 'Av. Ejemplo 123, distrito, ciudad' },
        validate: required('Escribe la dirección fiscal.'),
      },
    ],
  },
};

export const INTENT_LIST: readonly Intent[] = Object.values(INTENTS);

/** Campos que el bot pedirá para una categoría: primero los comunes, luego los propios. */
export function fieldsFor(intent: IntentId): readonly CaseField[] {
  return [...COMMON_FIELDS, ...INTENTS[intent].fields];
}
