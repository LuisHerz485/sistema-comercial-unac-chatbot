import { useCallback, useState } from 'react';
import { Toaster, toast } from 'sonner';
import { Closing } from './components/Closing';
import { DropWall } from './components/DropWall';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SupportBumpers } from './components/SupportBumpers';
import { PRODUCTS } from './data/products';
import type { Product, Size } from './data/products';
import { ChatbotProvider } from './features/chatbot/ChatbotContext';
import { ChatWidget } from './features/chatbot/components/ChatWidget';

const [featured, ...rest] = PRODUCTS;

export function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = useCallback((product: Product, size: Size) => {
    setCartCount((count) => count + 1);
    toast(`${product.name} · talla ${size}`, { description: 'Agregado al carrito (demo).' });
  }, []);

  if (!featured) return null;

  return (
    <ChatbotProvider>
      <Header cartCount={cartCount} />
      <main>
        <Hero product={featured} onAdd={addToCart} />
        <DropWall products={rest} onAdd={addToCart} />
        <SupportBumpers />
      </main>
      <Closing />
      <ChatWidget />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'var(--vinyl)',
            color: 'var(--ink)',
            border: '0',
            borderRadius: '14px',
            fontFamily: 'var(--font-body)',
          },
        }}
      />
    </ChatbotProvider>
  );
}
