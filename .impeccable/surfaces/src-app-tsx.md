---
version: 1
slug: "src-app-tsx"
primary_target: "src/App.tsx"
related_targets: []
---

# Surface brief: Tienda LIJA + chatbot de atención

Scope: home de la tienda (src/App.tsx) y widget de chatbot. Visitor mode: Persuade (tienda) con el chat como herramienta Operate embebida.
Audience: compradores de streetwear con un pedido en curso o recibido. Action: comprar (agregar al carrito) y, sobre todo, abrir un caso post-venta en el chat.
Proof: el chat clasificando en vivo la consulta y mostrando condiciones; catálogo y políticas son demo y se rotulan como tal.

## Direction contract

THESIS: La tienda es una tabla de skate forrada en lija: todo lo que importa se pega encima como sticker de vinilo troquelado. Rechaza la tienda blanca con grid de cards y chat-burbuja azul genérico.

OWN-WORLD: Suelo negro lija (#0e0e0f con grano), stickers de vinilo con borde blanco troquelado, sombra suave de despegue, rotación ±3°. Ley de paleta: cambio-oferta = amarillo ácido, retraso = naranja seguridad, falla = rosa chicle, factura = azul cobalto; nunca decorativos. Archivo (ancho comprimido, 800-900) para display, Archivo normal para texto, Martian Mono solo para nº de pedido/RUC/precios. Campos vacíos = silueta fantasma de sticker con borde punteado (raise de 7 segmentos).

STORY: El visitante ve drop actual, entiende que la tienda resuelve post-venta en el chat, escribe su problema, ve cómo el bot pega la categoría detectada y completa su caso.

FIRST VIEWPORT: Izquierda: titular comprimido "DROP 07 / CALLE FRÍA" (LIJA vive en el sticker-logo del header), módulo de compra en vinilo blanco con tallas y "Agregar al carrito", enlace "Ver el drop completo"; debajo, "¿Ya compraste y algo salió mal?" con las 4 intenciones como stickers que abren el chat en esa categoría. Derecha: foto del drop como sticker grande rotado con esquina despegada y badge 380 g. Esquina inferior derecha: lanzador del chat en píldora de vinilo. Enmienda (revisión final): las 4 intenciones se movieron del lanzador a la columna de compra para que estén visibles sin abrir nada; titular del drop en vez de "LIJA" para no repetir la marca del logo.

FORM: Grip tape + stickers, candidato 3 de 7 en la lista; seed key 8143af9a. Signature interaction: al clasificar, el sticker de categoría se "pega" (scale 1.15→1 + rotación con ease-out fuerte) en la cabecera del caso. Raise del arcade: ley de paleta por categoría.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
