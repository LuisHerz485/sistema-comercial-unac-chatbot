import { ArrowUpRight } from 'lucide-react';
import { useChatbotContext } from '../features/chatbot/ChatbotContext';
import { INTENT_ICONS } from '../features/chatbot/components/intentIcons';
import { INTENT_LIST } from '../features/chatbot/intents';
import type { IntentId } from '../features/chatbot/types';
import styles from './SupportBumpers.module.css';

/** El dato que más le importa al cliente en cada caso (de la política demo). */
const KEY_FACT: Record<IntentId, { value: string; caption: string }> = {
  'cambio-oferta': { value: '7 días', caption: 'para cambiar tu prenda en oferta' },
  'entrega-retrasada': { value: '15%', caption: 'de cupón si el retraso pasa de 3 días' },
  'producto-falla': { value: '30 días', caption: 'para reportar una falla de fábrica' },
  'factura-empresa': { value: '48 h', caption: 'máximo para recibir tu factura' },
};

const TILTS = [-1.2, 0.8, -0.6, 1.1] as const;

export function SupportBumpers() {
  const { open } = useChatbotContext();

  return (
    <section className={styles.section} id="ayuda" aria-labelledby="ayuda-title">
      <div className={styles.intro}>
        <h2 id="ayuda-title" className={styles.title}>
          Post-venta
          <span>sin fila</span>
        </h2>
        <p>
          Escríbele al chat como le escribirías a un amigo. Detecta cuál es tu caso, te dice qué
          condiciones aplican y lo registra con los datos que el equipo necesita.
        </p>
      </div>

      <ul className={styles.list}>
        {INTENT_LIST.map((intent, index) => {
          const Icon = INTENT_ICONS[intent.id];
          const fact = KEY_FACT[intent.id];
          return (
            <li key={intent.id} style={{ '--tilt': `${TILTS[index] ?? 0}deg` }}>
              <button
                type="button"
                className={styles.bumper}
                data-intent={intent.id}
                onClick={() => {
                  open(intent.id);
                }}
              >
                <span className={styles.label}>
                  <Icon aria-hidden="true" strokeWidth={2.5} />
                  {intent.shortLabel}
                </span>
                <span className={styles.question}>“{intent.sampleQuestion}”</span>
                <span className={styles.fact}>
                  <strong>{fact.value}</strong> {fact.caption}
                </span>
                <span className={styles.cta}>
                  Preguntar
                  <ArrowUpRight aria-hidden="true" strokeWidth={2.75} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
