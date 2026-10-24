export const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
export type Size = (typeof SIZES)[number];

export interface Product {
  id: string;
  name: string;
  /** Color/material en una línea. */
  detail: string;
  price: number;
  /** Precio antes de la oferta; si existe, la prenda está en oferta. */
  listPrice?: number;
  image: { src: string; alt: string; credit: string };
}

const unsplash = (id: string, width: number): string =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

/** Catálogo demostrativo: nombres y precios ficticios; fotos de Unsplash. */
export const PRODUCTS: readonly Product[] = [
  {
    id: 'hoodie-calavera',
    name: 'Hoodie Calavera Rosa',
    detail: 'Mostaza · algodón 380 g',
    price: 139,
    listPrice: 189,
    image: {
      src: unsplash('1609873814058-a8928924184a', 900),
      alt: 'Persona de espaldas con hoodie mostaza estampado con una calavera y una rosa',
      credit: 'Unsplash',
    },
  },
  {
    id: 'hoodie-escalera',
    name: 'Hoodie Escalera',
    detail: 'Terracota · felpa cepillada',
    price: 179,
    image: {
      src: unsplash('1578768079052-aa76e52ff62e', 700),
      alt: 'Persona con hoodie terracota y capucha puesta frente a una escalera de concreto',
      credit: 'Unsplash',
    },
  },
  {
    id: 'hoodie-callejon',
    name: 'Hoodie Callejón',
    detail: 'Verde musgo · capucha doble',
    price: 129,
    listPrice: 169,
    image: {
      src: unsplash('1565978771542-0db9ab9ad3de', 700),
      alt: 'Persona con hoodie verde y capucha cubriéndole el rostro en una calle angosta',
      credit: 'Unsplash',
    },
  },
  {
    id: 'overshirt-cuadros',
    name: 'Overshirt Cuadros',
    detail: 'Rojo y negro · franela',
    price: 149,
    image: {
      src: unsplash('1628030328071-538b251a4455', 700),
      alt: 'Persona sentada en escalones con overshirt a cuadros rojo y zapatillas rojas',
      credit: 'Unsplash',
    },
  },
  {
    id: 'hoodie-concreto',
    name: 'Hoodie Concreto',
    detail: 'Arena · corte oversize',
    price: 159,
    image: {
      src: unsplash('1564557287817-3785e38ec1f5', 700),
      alt: 'Persona con hoodie color arena y lentes oscuros apoyada en una columna',
      credit: 'Unsplash',
    },
  },
  {
    id: 'chaqueta-nocturna',
    name: 'Chaqueta Nocturna',
    detail: 'Negro · sherpa interior',
    price: 219,
    image: {
      src: unsplash('1586231912972-d0970f9ce787', 700),
      alt: 'Persona con chaqueta negra frente a una pared con grafitis',
      credit: 'Unsplash',
    },
  },
];

export const formatPrice = (value: number): string => `S/ ${value}`;
