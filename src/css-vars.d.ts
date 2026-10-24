import 'react';

declare module 'react' {
  // La aumentación de módulo necesita una interfaz con firma de índice; un Record no se fusiona.
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  interface CSSProperties {
    /** Permite custom properties tipadas: style={{ '--tilt': '-2deg' }} */
    [key: `--${string}`]: string | number | undefined;
  }
}
