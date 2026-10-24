import { INTENT_IDS } from './types';
import type { CaseData, Classification, IntentId } from './types';

interface Signal {
  /** Raíz o frase ya normalizada (minúsculas, sin tildes). */
  term: string;
  weight: number;
}

/**
 * Señales por categoría. Se usan raíces para cubrir variantes:
 * "retras" atrapa retraso, retrasado, retrasada, retrasó.
 * El peso refleja qué tan exclusiva es la palabra de esa categoría.
 */
const SIGNALS: Record<IntentId, readonly Signal[]> = {
  'cambio-oferta': [
    { term: 'cambi', weight: 3 },
    { term: 'oferta', weight: 3 },
    { term: 'rebaja', weight: 3 },
    { term: 'descuento', weight: 2 },
    { term: 'promo', weight: 2 },
    { term: 'liquidacion', weight: 3 },
    { term: 'talla', weight: 2 },
    { term: 'me queda', weight: 2 },
    { term: 'grande', weight: 1 },
    { term: 'pequen', weight: 1 },
    { term: 'chic', weight: 1 },
    { term: 'otro color', weight: 2 },
    { term: 'plazo', weight: 1 },
    { term: 'condicion', weight: 1 },
  ],
  'entrega-retrasada': [
    { term: 'retras', weight: 4 },
    { term: 'atras', weight: 3 },
    { term: 'demor', weight: 3 },
    { term: 'no llega', weight: 4 },
    { term: 'no ha llegado', weight: 4 },
    { term: 'no me llego', weight: 4 },
    { term: 'aun no llega', weight: 4 },
    { term: 'todavia no', weight: 2 },
    { term: 'tarda', weight: 2 },
    { term: 'entrega', weight: 2 },
    { term: 'envio', weight: 1 },
    { term: 'courier', weight: 2 },
    { term: 'seguimiento', weight: 2 },
    { term: 'tracking', weight: 2 },
    { term: 'compensa', weight: 3 },
    { term: 'donde esta mi pedido', weight: 4 },
  ],
  'producto-falla': [
    { term: 'falla', weight: 4 },
    { term: 'fallad', weight: 4 },
    { term: 'defect', weight: 4 },
    { term: 'roto', weight: 3 },
    { term: 'rota', weight: 3 },
    { term: 'rasgad', weight: 3 },
    { term: 'descosi', weight: 3 },
    { term: 'costura', weight: 2 },
    { term: 'mancha', weight: 3 },
    { term: 'agujero', weight: 3 },
    { term: 'hueco', weight: 2 },
    { term: 'danad', weight: 3 },
    { term: 'malogr', weight: 3 },
    { term: 'cierre', weight: 1 },
    { term: 'despeg', weight: 2 },
    { term: 'reemplaz', weight: 3 },
    { term: 'mal estado', weight: 3 },
    { term: 'llego mal', weight: 3 },
  ],
  'factura-empresa': [
    { term: 'factura', weight: 5 },
    { term: 'ruc', weight: 4 },
    { term: 'empresa', weight: 3 },
    { term: 'razon social', weight: 4 },
    { term: 'fiscal', weight: 3 },
    { term: 'tributari', weight: 3 },
    { term: 'comprobante', weight: 2 },
    { term: 'boleta', weight: 2 },
    { term: 'contabilidad', weight: 2 },
  ],
};

/** Puntaje mínimo para aceptar una categoría sin preguntar. */
const MIN_SCORE = 3;
/** Confianza mínima (separación entre la primera y la segunda categoría). */
const MIN_CONFIDENCE = 0.6;

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9@.\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function emptyScores(): Record<IntentId, number> {
  return { 'cambio-oferta': 0, 'entrega-retrasada': 0, 'producto-falla': 0, 'factura-empresa': 0 };
}

/** Busca la señal al inicio de una palabra para que "ruc" no coincida con "estructura". */
function containsTerm(haystack: string, term: string): boolean {
  return ` ${haystack}`.includes(` ${term}`);
}

export function classify(text: string): Classification {
  const normalized = normalize(text);
  const scores = emptyScores();
  const matchedTerms: string[] = [];

  for (const intent of INTENT_IDS) {
    for (const signal of SIGNALS[intent]) {
      if (containsTerm(normalized, signal.term)) {
        scores[intent] += signal.weight;
        matchedTerms.push(signal.term);
      }
    }
  }

  const ranked = [...INTENT_IDS].sort((a, b) => scores[b] - scores[a]);
  const [first, second] = ranked;
  if (first === undefined || second === undefined) {
    return { intent: null, confidence: 0, scores, matchedTerms };
  }

  const top = scores[first];
  const runnerUp = scores[second];
  const confidence = top === 0 ? 0 : (top - runnerUp) / top;
  const accepted = top >= MIN_SCORE && confidence >= MIN_CONFIDENCE;

  return {
    intent: accepted ? first : null,
    confidence: Number(confidence.toFixed(2)),
    scores,
    matchedTerms,
  };
}

/** Saca del primer mensaje los datos que el cliente ya escribió, para no volver a pedirlos. */
export function extractKnownData(text: string): CaseData {
  const data: CaseData = {};
  const email = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/.exec(text);
  if (email) data.correo = email[0];
  const order = /\bLJ-?\d{4,6}\b/i.exec(text);
  if (order) data.pedido = order[0].toUpperCase();
  const ruc = /\b(10|15|17|20)\d{9}\b/.exec(text);
  if (ruc) data.ruc = ruc[0];
  return data;
}
