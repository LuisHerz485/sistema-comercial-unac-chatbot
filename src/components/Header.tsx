import { ShoppingBag } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  cartCount: number;
}

const NAV = [
  { href: '#drop', label: 'Drop 07' },
  { href: '#drop', label: 'Hoodies' },
  { href: '#ayuda', label: 'Ayuda' },
] as const;

export function Header({ cartCount }: HeaderProps) {
  return (
    <>
      <p className={styles.demo}>
        Tienda demo para un proyecto académico. Productos, precios y políticas son ficticios.
      </p>
      <header className={styles.header}>
        <a href="#top" className={styles.logo} aria-label="LIJA, inicio">
          LIJA
        </a>
        <nav aria-label="Principal">
          <ul className={styles.nav}>
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#drop" className={styles.cart} aria-label={`Carrito, ${cartCount} prendas`}>
          <ShoppingBag aria-hidden="true" strokeWidth={2.25} />
          <span aria-hidden="true">{cartCount}</span>
        </a>
      </header>
    </>
  );
}
