import { Plus } from 'lucide-react';
import { useId, useState } from 'react';
import { SIZES, formatPrice } from '../data/products';
import type { Product, Size } from '../data/products';
import styles from './AddToCart.module.css';

interface AddToCartProps {
  product: Product;
  onAdd: (product: Product, size: Size) => void;
}

export function AddToCart({ product, onAdd }: AddToCartProps) {
  const [size, setSize] = useState<Size>('M');
  const groupId = useId();

  return (
    <form
      className={styles.buy}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(product, size);
      }}
    >
      <div className={styles.head}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>
          <span className="mono">{formatPrice(product.price)}</span>
          {product.listPrice !== undefined && (
            <s className="mono">
              <span className="visually-hidden">Antes </span>
              {formatPrice(product.listPrice)}
            </s>
          )}
        </p>
      </div>
      <fieldset className={styles.sizes}>
        <legend id={groupId}>Talla</legend>
        {SIZES.map((option) => (
          <label key={option} className={styles.size}>
            <input
              type="radio"
              name={`${groupId}-size`}
              value={option}
              checked={size === option}
              onChange={() => {
                setSize(option);
              }}
            />
            <span>{option}</span>
          </label>
        ))}
      </fieldset>
      <button type="submit" className={styles.add}>
        <Plus aria-hidden="true" strokeWidth={3} />
        Agregar al carrito
      </button>
    </form>
  );
}
