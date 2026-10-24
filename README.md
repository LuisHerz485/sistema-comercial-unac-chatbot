# LIJA · tienda streetwear con chatbot de atención comercial

Proyecto de maestría (Grupo 2 · Atención comercial). Tienda online demo hecha con React + TypeScript (Vite) y un chatbot que:

1. Lee la consulta del cliente y la **clasifica** en una de 4 categorías.
2. Explica las **condiciones y plazos** que aplican a esa categoría.
3. Pide **solo los datos necesarios** para esa categoría, validándolos.
4. **Envía el caso a un Google Form**, que lo guarda como una fila en Google Sheets.

| Categoría (valor que llega al Sheet) | Pregunta tipo                                                 | Datos propios que pide              |
| ------------------------------------ | ------------------------------------------------------------- | ----------------------------------- |
| Cambio de prenda en oferta           | Quiero cambiar una prenda comprada en oferta…                 | Prenda, motivo, talla o color nuevo |
| Entrega retrasada                    | ¿Cómo gestiono una entrega retrasada y qué compensación…?     | Fecha de entrega prometida          |
| Producto con falla                   | El producto llegó con una falla. ¿Cómo solicito un reemplazo? | Prenda, descripción, preferencia    |
| Factura a nombre de empresa          | ¿Cómo pido factura a nombre de mi empresa y qué datos enviar? | RUC, razón social, dirección fiscal |

En todas pide además: nombre, correo y número de pedido (formato `LJ-12345`). Si el cliente ya los escribió en su primer mensaje (correo, pedido o RUC), no se los vuelve a pedir.

## Cómo clasifica

[`src/features/chatbot/classifier.ts`](src/features/chatbot/classifier.ts): normaliza el texto (minúsculas, sin tildes) y suma puntos por raíces de palabras de cada categoría (`retras`, `compensa`, `factura`, `ruc`, `falla`, `oferta`, `talla`…). Acepta la categoría si tiene al menos 3 puntos y se separa claramente de la segunda (confianza ≥ 60 %). Si duda, por ejemplo en _"quiero cambiar la prenda porque llegó rota"_, le pide al cliente que elija entre las 4. El cliente siempre puede corregir con "No es eso". La confianza se guarda en el Sheet.

## Scripts

```bash
npm install
npm run dev           # desarrollo en http://localhost:5173
npm run build         # typecheck + build de producción en dist/
npm run preview       # sirve dist/
npm run lint          # ESLint (typescript-eslint strict + react-hooks + jsx-a11y)
npm run format        # Prettier
npm run typecheck
npm run form:entries -- "<URL pública del Form>"   # opcional: imprime las variables VITE_GOOGLE_*
```

Requiere Node 22 o superior.

---

## Cómo armar el Google Form

### 1. Crea el Form con estas preguntas

Usa estos títulos (el atajo `form:entries` los busca por título exacto) y ponlas todas en una sola sección.

| #   | Título de la pregunta            | Tipo                        | Obligatoria |
| --- | -------------------------------- | --------------------------- | ----------- |
| 1   | `ID de caso`                     | Respuesta corta             | Sí          |
| 2   | `Categoría`                      | Opción múltiple (ver abajo) | Sí          |
| 3   | `Confianza de clasificación`     | Respuesta corta             | No          |
| 4   | `Consulta original`              | Párrafo                     | No          |
| 5   | `Nombre`                         | Respuesta corta             | Sí          |
| 6   | `Correo`                         | Respuesta corta             | Sí          |
| 7   | `Número de pedido`               | Respuesta corta             | Sí          |
| 8   | `Prenda`                         | Respuesta corta             | No          |
| 9   | `Motivo del cambio`              | Respuesta corta             | No          |
| 10  | `Talla o color nuevo`            | Respuesta corta             | No          |
| 11  | `Fecha de entrega prometida`     | Respuesta corta             | No          |
| 12  | `Descripción de la falla`        | Párrafo                     | No          |
| 13  | `Preferencia si no hay stock`    | Respuesta corta             | No          |
| 14  | `RUC`                            | Respuesta corta             | No          |
| 15  | `Razón social`                   | Respuesta corta             | No          |
| 16  | `Dirección fiscal`               | Respuesta corta             | No          |
| 17  | `Respuesta entregada por el bot` | Párrafo                     | No          |

Opciones de **Categoría**, escritas exactamente así:

- `Cambio de prenda en oferta`
- `Entrega retrasada`
- `Producto con falla`
- `Factura a nombre de empresa`

Reglas para que el envío funcione:

- Las preguntas propias de cada categoría (8 a 16) **no** deben ser obligatorias: cada caso solo llena las suyas.
- **No** actives "Validación de respuestas" ni preguntas tipo Fecha (el bot ya valida y envía texto).
- En **Configuración → Respuestas**: desactiva "Recopilar correos electrónicos" y "Limitar a 1 respuesta", y que **no** pida iniciar sesión ni esté restringido a tu organización.

### 2. Conéctalo a Google Sheets

En la pestaña **Respuestas** del Form → **Vincular con Hojas de cálculo** → _Crear una hoja nueva_. Cada caso del chat aparecerá como una fila, con una columna por pregunta y la marca de tiempo. Para separar por categoría, filtra la columna `Categoría` o crea una pestaña por categoría con `=FILTER(...)`.

### 3. Enlaza el Form con el chatbot (variables de entorno)

El chatbot lee el Form desde variables de entorno: el ID del Form y un `entry.XXXX` por pregunta. La lista completa está en [`.env.example`](.env.example).

**a) El ID del Form.** En el Form, **Enviar → 🔗**. El enlace público es `https://docs.google.com/forms/d/e/<ID>/viewform`; el `<ID>` (empieza con `1FAIpQL`) va en `VITE_GOOGLE_FORM_ID`.

**b) Los IDs de cada pregunta.** En el editor del Form, ⋮ → **Obtener vínculo prellenado**. Escribe cualquier texto en cada pregunta (en `Categoría` elige una opción) → **Obtener vínculo** → **Copiar vínculo**. El vínculo trae un `entry.NNNNNNNNN=...` por pregunta, en el mismo orden del Form:

```
.../viewform?usp=pp_url&entry.1111111=ID&entry.2222222=Entrega+retrasada&entry.3333333=...
```

Asigna cada uno a su variable:

| Pregunta del Form                | Variable                              |
| -------------------------------- | ------------------------------------- |
| `ID de caso`                     | `VITE_GOOGLE_ENTRY_ID_CASO`           |
| `Categoría`                      | `VITE_GOOGLE_ENTRY_CATEGORIA`         |
| `Confianza de clasificación`     | `VITE_GOOGLE_ENTRY_CONFIANZA`         |
| `Consulta original`              | `VITE_GOOGLE_ENTRY_CONSULTA`          |
| `Nombre`                         | `VITE_GOOGLE_ENTRY_NOMBRE`            |
| `Correo`                         | `VITE_GOOGLE_ENTRY_CORREO`            |
| `Número de pedido`               | `VITE_GOOGLE_ENTRY_PEDIDO`            |
| `Prenda`                         | `VITE_GOOGLE_ENTRY_PRENDA`            |
| `Motivo del cambio`              | `VITE_GOOGLE_ENTRY_MOTIVO_CAMBIO`     |
| `Talla o color nuevo`            | `VITE_GOOGLE_ENTRY_TALLA_NUEVA`       |
| `Fecha de entrega prometida`     | `VITE_GOOGLE_ENTRY_FECHA_PROMETIDA`   |
| `Descripción de la falla`        | `VITE_GOOGLE_ENTRY_DESCRIPCION_FALLA` |
| `Preferencia si no hay stock`    | `VITE_GOOGLE_ENTRY_PREFERENCIA_FALLA` |
| `RUC`                            | `VITE_GOOGLE_ENTRY_RUC`               |
| `Razón social`                   | `VITE_GOOGLE_ENTRY_RAZON_SOCIAL`      |
| `Dirección fiscal`               | `VITE_GOOGLE_ENTRY_DIRECCION_FISCAL`  |
| `Respuesta entregada por el bot` | `VITE_GOOGLE_ENTRY_RESPUESTA_BOT`     |

Ejemplo:

```
VITE_GOOGLE_FORM_ID=1FAIpQLSe...
VITE_GOOGLE_ENTRY_CATEGORIA=entry.2222222
VITE_GOOGLE_ENTRY_CORREO=entry.6666666
```

**c) Dónde ponerlas.**

- **Netlify:** _Site configuration → Environment variables → Add a variable_ (una por una, o _Import from a .env file_ pegando todo el bloque). Después, _Deploys → Trigger deploy → Deploy site_: Vite incrusta las variables al compilar, así que **cada cambio necesita un nuevo deploy**.
- **Local:** copia `.env.example` como `.env`, llénalo y reinicia `npm run dev`. `.env` no se sube a Git.

Para enviar casos bastan `VITE_GOOGLE_FORM_ID`, `VITE_GOOGLE_ENTRY_CATEGORIA` y `VITE_GOOGLE_ENTRY_CORREO`; las preguntas sin variable simplemente no se llenan. Mientras falten esas tres, el chat funciona en **modo demo**: hace todo el recorrido, avisa que el caso no se envió y deja el envío en la consola del navegador.

Prueba un caso desde el chat: la fila debe aparecer en el Sheet en segundos.

> **Atajo opcional (solo en tu PC):** `npm run form:entries -- "<enlace /viewform>"` lee el Form y **imprime** todas las líneas `VITE_...` ya armadas para copiarlas en Netlify. No es necesario: el vínculo prellenado basta.

> **Nota técnica:** Google Forms no permite CORS, así que el envío usa `fetch` con `mode: 'no-cors'` al endpoint `formResponse`. La respuesta es opaca: el bot solo puede detectar errores de red, no si el Form rechazó un valor. Por eso importan los títulos y opciones exactos.

---

## Desplegar en Netlify

El repo ya trae [`netlify.toml`](netlify.toml) (build `npm run build`, publica `dist`, Node 22).

- **Desde Git:** sube el proyecto a GitHub → en Netlify _Add new site → Import an existing project_ → elige el repo. Netlify lee la configuración solo.
- **Sin Git:** `npm run build` y arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop).

Para que los casos lleguen al Sheet, carga las variables `VITE_GOOGLE_*` en Netlify antes del deploy (ver el paso 3 del Form). Con **Netlify Drop** no hay variables de entorno: crea `.env` en tu PC antes de `npm run build` y el `dist/` ya sale con el Form enlazado.

## Estructura

```
src/
  features/chatbot/
    types.ts               tipos del dominio (intenciones, campos, mensajes, etapas)
    intents.ts             las 4 categorías: políticas demo, campos y validaciones
    classifier.ts          clasificación por reglas + extracción de correo/pedido/RUC
    conversation.ts        reducer de la conversación (máquina de estados)
    useChatbot.ts          hook: reducer + envío al Form
    ChatbotContext.tsx     abre el chat desde cualquier parte de la página
    googleForm/            preguntas del Form, config, armado y envío del caso
    components/            panel del chat, mensajes, composer, seguimiento del caso
  components/              header, hero, muro de productos, post-venta, cierre
  data/products.ts         catálogo demo
  styles/                  tokens y estilos globales
scripts/form-entries.ts    enlaza el Google Form
```

## Supuestos de la demo

- Marca, catálogo, precios (en soles) y políticas de cambio, compensación, falla y factura son **ficticios**; ajústalos en [`intents.ts`](src/features/chatbot/intents.ts).
- El RUC se valida con el formato peruano (11 dígitos, empieza con 10, 15, 17 o 20).
- Fotos de [Unsplash](https://unsplash.com), cargadas desde su CDN.
