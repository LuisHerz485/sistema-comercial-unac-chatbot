# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript (Vite), strict typing, ESLint + Prettier. Deployed as a static site on Netlify (prueba de concepto). Chatbot classification runs locally in the browser (keyword/score rules, no API key). Submissions go to a Google Form linked to a Google Sheet.

## Users

Compradores jóvenes de una tienda online de streetwear unisex (hispanohablantes) que ya hicieron un pedido y necesitan resolver un problema post-venta desde el móvil o el escritorio, sin llamar a nadie.

## Product Purpose

Tienda online demo (proyecto de maestría, grupo 2 · Atención comercial) cuyo valor central es un chatbot de atención que entiende la consulta, la clasifica en una de cuatro categorías, recoge los datos necesarios y registra el caso en Google Forms → Google Sheets. Éxito = cada caso llega clasificado correctamente y con los datos completos para que el equipo lo atienda sin repreguntar.

## Positioning

El chatbot no es un FAQ: detecta la intención, explica las condiciones aplicables y abre el caso con los campos específicos de esa intención.

## Capabilities and Constraints

Cuatro intenciones obligatorias:

1. Cambio de prenda comprada en oferta (condiciones y plazos).
2. Entrega retrasada y compensación.
3. Producto con falla → reemplazo.
4. Factura a nombre de empresa (datos tributarios).

Datos comunes: nombre, correo, nº de pedido, categoría, mensaje. Datos específicos por categoría (talla/motivo, fecha prometida, descripción de falla, RUC/razón social/dirección fiscal).

Clasificación por reglas locales; si la confianza es baja, el bot pide al cliente que elija la categoría.

## Brand Commitments

Streetwear unisex, tono joven y directo. Nombre de marca inventado (ficticio, demo).

## Evidence on Hand

No hay fotos de producto, precios reales, políticas reales ni testimonios. Todo el catálogo, precios y políticas son demostrativos y deben marcarse como tal; no inventar clientes, reseñas ni cifras.

## Product Principles

- Resolver, no entretener: cada respuesta del bot acerca al caso registrado.
- Clasificar con transparencia: el cliente ve y puede corregir la categoría detectada.
- Pedir solo lo necesario para la categoría.
- Funcionar sin backend propio.

## Accessibility & Inclusion

WCAG AA: teclado completo en el chat, foco visible, roles ARIA de diálogo y log, respeto a prefers-reduced-motion.
