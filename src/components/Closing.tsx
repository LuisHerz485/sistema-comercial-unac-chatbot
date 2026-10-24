import { useChatbotContext } from '../features/chatbot/ChatbotContext';
import styles from './Closing.module.css';

const SKATE_PHOTO =
  'https://images.unsplash.com/photo-1638206420050-7bb7f09ab779?auto=format&fit=crop&w=900&q=70';

export function Closing() {
  const { open } = useChatbotContext();

  return (
    <>
      <section className={styles.closing} aria-labelledby="closing-title">
        <div className={styles.sheet}>
          <img
            src={SKATE_PHOTO}
            alt="Tabla de skate cubierta de stickers en pleno truco"
            loading="lazy"
          />
        </div>
        <div className={styles.copy}>
          <h2 id="closing-title" className={styles.title}>
            Si llega mal, lo arreglamos.
          </h2>
          <p>
            Cambios, retrasos, fallas o facturas: abre el chat, cuéntalo con tus palabras y sal con
            un código de caso.
          </p>
          <button
            type="button"
            className={styles.cta}
            onClick={() => {
              open();
            }}
          >
            Abrir el chat
          </button>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>
          <strong>LIJA</strong> es una tienda ficticia. Maestría · Grupo 2 · Atención comercial.
        </p>
        <p>
          Fotos de{' '}
          <a href="https://unsplash.com" target="_blank" rel="noreferrer">
            Unsplash
          </a>
          .
        </p>
      </footer>
    </>
  );
}
