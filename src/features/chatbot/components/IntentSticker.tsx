import { INTENTS } from '../intents';
import type { IntentId } from '../types';
import { INTENT_ICONS } from './intentIcons';
import styles from './IntentSticker.module.css';

interface IntentStickerProps {
  intent: IntentId;
  size?: 'sm' | 'md' | 'lg';
  /** Inclinación en grados; los stickers nunca quedan perfectamente rectos. */
  tilt?: number;
  /** Anima el sticker como si se pegara de golpe. */
  slap?: boolean;
}

export function IntentSticker({
  intent,
  size = 'md',
  tilt = -2,
  slap = false,
}: IntentStickerProps) {
  const Icon = INTENT_ICONS[intent];
  return (
    <span
      className={styles.sticker}
      data-intent={intent}
      data-size={size}
      data-slap={slap || undefined}
      style={{ '--tilt': `${tilt}deg` }}
    >
      <Icon aria-hidden="true" strokeWidth={2.5} className={styles.icon} />
      {INTENTS[intent].shortLabel}
    </span>
  );
}
