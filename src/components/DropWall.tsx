import { Plus } from 'lucide-react';
import { formatPrice } from '../data/products';
import type { Product, Size } from '../data/products';
import styles from './DropWall.module.css';

interface DropWallProps {
  products: readonly Product[];
  onAdd: (product: Product, size: Size) => void;
}

/** Cada sticker tiene su forma y su inclinación: un muro pegado a mano, no una grilla. */
const LAYOUT = [
  { shape: 'tall', tilt: -2 },
  { shape: 'wide', tilt: 1.5 },
  { shape: 'wide', tilt: -1 },
  { shape: 'square', tilt: 2 },
  { shape: 'square', tilt: -1.5 },
] as const;

export function DropWall({ products, onAdd }: DropWallProps) {
  return (
    <section className={styles.section} id="drop" aria-labelledby="drop-title">
      <div className={styles.intro}>
        <h2 id="drop-title" className={styles.title}>
          El drop
        </h2>
        <p>Cinco piezas más. Tallas XS a XL, todas unisex.</p>
      </div>

      <ul className={styles.wall}>
        {products.map((product, index) => {
          const layout = LAYOUT[index % LAYOUT.length] ?? LAYOUT[0];
          return (
            <li
              key={product.id}
              className={styles.item}
              data-shape={layout.shape}
              style={{ '--tilt': `${layout.tilt}deg` }}
            >
              <div className={styles.sheet}>
                <img src={product.image.src} alt={product.image.alt} loading="lazy" />
              </div>
              <div className={styles.tag}>
                <div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.detail}>{product.detail}</p>
                </div>
                <p className={styles.price}>
                  <span className="mono">{formatPrice(product.price)}</span>
                  {product.listPrice !== undefined && (
                    <s className="mono">
                      <span className="visually-hidden">Antes </span>
                      {formatPrice(product.listPrice)}
                    </s>
                  )}
                </p>
                <button
                  type="button"
                  className={styles.add}
                  aria-label={`Agregar ${product.name}, talla M, al carrito`}
                  onClick={() => {
                    onAdd(product, 'M');
                  }}
                >
                  <Plus aria-hidden="true" strokeWidth={3} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
