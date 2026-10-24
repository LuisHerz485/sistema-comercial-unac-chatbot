import { fieldsFor } from '../intents';
import type { CaseData, ChatStage } from '../types';
import { IntentSticker } from './IntentSticker';
import styles from './Chat.module.css';

interface CaseTrackerProps {
  stage: ChatStage;
  data: CaseData;
}

/**
 * Cabecera del caso: el sticker de la categoría detectada y una ranura por dato.
 * Las ranuras vacías se dibujan como siluetas: se ve qué falta antes de enviarlo.
 */
export function CaseTracker({ stage, data }: CaseTrackerProps) {
  if (!('intent' in stage)) return null;

  const fields = fieldsFor(stage.intent);
  const filled = fields.filter((field) => data[field.key]).length;

  return (
    <div className={styles.tracker} key={stage.intent}>
      <IntentSticker intent={stage.intent} size="sm" tilt={-4} />
      <ol className={styles.slots} aria-label={`Datos del caso: ${filled} de ${fields.length}`}>
        {fields.map((field) => (
          <li
            key={field.key}
            className={styles.slot}
            data-filled={Boolean(data[field.key]) || undefined}
            data-intent={stage.intent}
            title={field.label}
          >
            <span className="visually-hidden">
              {field.label}: {data[field.key] ? 'listo' : 'pendiente'}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
