import { CheckCheck } from 'lucide-react';
import { isGoogleFormConfigured } from '../googleForm/config';
import { INTENTS, fieldsFor } from '../intents';
import type { BotContent, ChatMessage } from '../types';
import { IntentSticker } from './IntentSticker';
import styles from './Chat.module.css';

function BotBody({ content }: { content: BotContent }) {
  switch (content.kind) {
    case 'text':
      return <p>{content.text}</p>;

    case 'classified':
      return (
        <div className={styles.classified}>
          <p className={styles.small}>Entendí que tu consulta es sobre</p>
          <IntentSticker intent={content.intent} size="lg" tilt={-3} slap />
          {content.matchedTerms.length > 0 && (
            <p className={styles.small}>
              Pistas: {content.matchedTerms.slice(0, 4).join(', ')} · seguridad{' '}
              <span className="mono">{Math.round(content.confidence * 100)}%</span>
            </p>
          )}
        </div>
      );

    case 'policy': {
      const { policy } = INTENTS[content.intent];
      return (
        <div className={styles.policy} data-intent={content.intent}>
          <p className={styles.policyTitle}>{policy.title}</p>
          <ul>
            {policy.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={styles.demoNote}>Política de demostración.</p>
        </div>
      );
    }

    case 'summary':
      return (
        <dl className={styles.summary}>
          <div>
            <dt>Categoría</dt>
            <dd>{INTENTS[content.intent].formLabel}</dd>
          </div>
          {fieldsFor(content.intent).map((field) => (
            <div key={field.key}>
              <dt>{field.label}</dt>
              <dd>{content.data[field.key] ?? '—'}</dd>
            </div>
          ))}
        </dl>
      );

    case 'receipt':
      return (
        <div className={styles.receipt} data-intent={content.intent}>
          <CheckCheck aria-hidden="true" className={styles.receiptIcon} />
          <p>
            Caso <strong className="mono">{content.caseId}</strong>{' '}
            {isGoogleFormConfigured ? 'registrado.' : 'armado (demo).'}
          </p>
          <p className={styles.small}>
            {isGoogleFormConfigured
              ? 'Te escribiremos al correo que dejaste. Guarda el código por si necesitas consultar.'
              : 'Modo demo: el caso no se envió porque el Google Form aún no está conectado.'}
          </p>
        </div>
      );
  }
}

export function MessageItem({ message }: { message: ChatMessage }) {
  if (message.from === 'user') {
    return (
      <li className={styles.message} data-from="user">
        <span className="visually-hidden">Tú: </span>
        <p>{message.text}</p>
      </li>
    );
  }

  const bare = message.content.kind === 'classified';
  return (
    <li className={styles.message} data-from="bot" data-bare={bare || undefined}>
      <span className="visually-hidden">Asistente: </span>
      <BotBody content={message.content} />
    </li>
  );
}
