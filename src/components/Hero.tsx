import type { Product, Size } from '../data/products';
import { IntentSticker } from '../features/chatbot/components/IntentSticker';
import { useChatbotContext } from '../features/chatbot/ChatbotContext';
import { INTENT_IDS } from '../features/chatbot/types';
import { AddToCart } from './AddToCart';
import styles from './Hero.module.css';

interface HeroProps {
  product: Product;
  onAdd: (product: Product, size: Size) => void;
}

const HELP_TILTS = [-3, 2, -1.5, 2.5] as const;

export function Hero({ product, onAdd }: HeroProps) {
  const { open } = useChatbotContext();

  return (
    <section className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.copy}>
        <h1 id="hero-title" className={styles.title}>
          Drop 07
          <span>Calle fría</span>
        </h1>
        <p className={styles.lede}>
          Hoodies de 380 g, overshirts y chaquetas para salir de noche. Llegan en 2 a 4 días
          hábiles, y si algo falla, el chat lo resuelve.
        </p>
        <AddToCart product={product} onAdd={onAdd} />
        <a href="#drop" className={styles.seeDrop}>
          Ver el drop completo
        </a>
      </div>

      <figure className={styles.photo}>
        <div className={styles.sheet}>
          <img
            src={product.image.src}
            alt={product.image.alt}
            width={900}
            height={1125}
            fetchPriority="high"
          />
        </div>
        <span className={styles.flap} aria-hidden="true" />
        <span className={styles.weight} aria-hidden="true">
          <span className={styles.weightInner}>
            380<small>g</small>
          </span>
        </span>
      </figure>

      <div className={styles.help}>
        <p className={styles.helpLead}>¿Ya compraste y algo salió mal?</p>
        <ul className={styles.helpList}>
          {INTENT_IDS.map((intent, index) => (
            <li key={intent}>
              <button
                type="button"
                className={styles.helpButton}
                onClick={() => {
                  open(intent);
                }}
              >
                <IntentSticker intent={intent} size="md" tilt={HELP_TILTS[index] ?? 0} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
