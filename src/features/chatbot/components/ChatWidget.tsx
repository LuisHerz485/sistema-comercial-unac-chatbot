import { MessageCircleQuestion, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useChatbotContext } from '../ChatbotContext';
import type { QuickReply } from '../types';
import { CaseTracker } from './CaseTracker';
import { Composer } from './Composer';
import { MessageItem } from './MessageItem';
import styles from './Chat.module.css';

const DISABLED_HINT: Partial<Record<string, string>> = {
  review: 'Usa los botones de arriba',
  submitting: 'Enviando tu caso…',
  'submit-error': 'Usa “Reintentar envío”',
};

function replyKey(reply: QuickReply): string {
  if (reply.type === 'intent') return reply.intent;
  if (reply.type === 'value') return `v-${reply.value}`;
  return reply.action;
}

export function ChatWidget() {
  const { state, quickReplies, field, choose, send, isOpen, open, close } = useChatbotContext();
  const { stage, messages } = state;
  const logRef = useRef<HTMLOListElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Al abrir, el foco va al campo; al cerrar, vuelve al botón que abrió el chat.
  useEffect(() => {
    if (!isOpen && wasOpen.current) launcherRef.current?.focus();
    wasOpen.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    log.scrollTo({ top: log.scrollHeight, behavior: reduce ? 'auto' : 'smooth' });
  }, [messages.length, quickReplies.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  const composerDisabled =
    stage.name === 'review' || stage.name === 'submitting' || stage.name === 'submit-error';

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={styles.launcher}
        data-hidden={isOpen || undefined}
        aria-expanded={isOpen}
        aria-controls="chat-panel"
        onClick={() => {
          open();
        }}
      >
        <MessageCircleQuestion aria-hidden="true" strokeWidth={2.5} />
        <span>¿Problema con tu pedido?</span>
      </button>

      <section
        id="chat-panel"
        className={styles.panel}
        data-open={isOpen || undefined}
        role="dialog"
        aria-modal="false"
        aria-labelledby="chat-title"
        inert={!isOpen}
      >
        <header className={styles.panelHeader}>
          <div>
            <h2 id="chat-title" className={styles.title}>
              Atención LIJA
            </h2>
            <p className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              Responde al instante
            </p>
          </div>
          <div className={styles.headerActions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => {
                send({ type: 'restart' });
              }}
              aria-label="Empezar una conversación nueva"
              title="Empezar de nuevo"
            >
              <RotateCcw aria-hidden="true" />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              onClick={close}
              aria-label="Cerrar chat"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        <CaseTracker stage={stage} data={state.data} />

        <ol
          ref={logRef}
          className={styles.log}
          role="log"
          aria-live="polite"
          aria-label="Conversación"
        >
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {stage.name === 'submitting' && (
            <li className={styles.message} data-from="bot" aria-label="Enviando caso">
              <span className={styles.typing} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </li>
          )}
        </ol>

        {quickReplies.length > 0 && (
          <div className={styles.replies} role="group" aria-label="Respuestas rápidas">
            {quickReplies.map((reply) => (
              <button
                key={replyKey(reply)}
                type="button"
                className={styles.reply}
                data-intent={reply.type === 'intent' ? reply.intent : undefined}
                data-primary={
                  (reply.type === 'action' &&
                    ['open-case', 'submit', 'retry'].includes(reply.action)) ||
                  undefined
                }
                onClick={() => {
                  choose(reply);
                }}
              >
                {reply.label}
              </button>
            ))}
          </div>
        )}

        <Composer
          field={field}
          disabled={composerDisabled}
          disabledHint={DISABLED_HINT[stage.name] ?? ''}
          error={state.fieldError}
          active={isOpen}
          onSend={(text) => {
            send({ type: 'user-text', text });
          }}
        />
      </section>
    </>
  );
}
