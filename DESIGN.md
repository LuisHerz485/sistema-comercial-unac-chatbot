---
name: LIJA
description: Streetwear store on a grip-tape ground where everything that matters is a die-cut vinyl sticker, and post-sale help is sorted by color.
colors:
  grip: "#0b0b0c"
  grip-raised: "#17171a"
  grip-edge: "#2a2a2f"
  on-grip: "#f2f1ec"
  on-grip-muted: "#a8a7a2"
  vinyl: "#f4f3ee"
  vinyl-shade: "#e3e1d9"
  ink: "#0b0b0c"
  ink-muted: "#4a4945"
  intent-cambio: "#f3e03b"
  intent-retraso: "#ff6b1f"
  intent-falla: "#ff62a5"
  intent-factura: "#2f5bff"
  on-intent-factura: "#ffffff"
  danger: "#ff8a7a"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(4rem, 10vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.86
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "Archivo Variable, Archivo, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 850
    lineHeight: 1.1
    fontVariation: "'wdth' 75"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  mono:
    fontFamily: "Martian Mono Variable, ui-monospace, monospace"
    fontWeight: 700
    letterSpacing: "-0.02em"
    fontFeature: "'tnum' 1"
rounded:
  mark: "4px"
  sm: "10px"
  md: "12px"
  sticker: "14px"
  lg: "18px"
  sheet: "22px"
  pill: "999px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  gutter: "clamp(16px, 4vw, 48px)"
  section: "clamp(56px, 8vw, 112px)"
  max: "1320px"
components:
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.vinyl}"
    typography: "{typography.title}"
    rounded: "{rounded.sticker}"
    height: "52px"
  button-vinyl:
    backgroundColor: "{colors.vinyl}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "16px"
    padding: "14px 28px"
  chat-launcher:
    backgroundColor: "{colors.vinyl}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "14px 20px 14px 16px"
  intent-sticker:
    backgroundColor: "{colors.intent-cambio}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.sticker}"
    padding: "0.35em 0.75em 0.35em 0.6em"
  chip-reply:
    backgroundColor: "{colors.grip}"
    textColor: "{colors.on-grip}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
    height: "40px"
  size-option:
    backgroundColor: "{colors.vinyl}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "40px"
    width: "44px"
  size-option-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.vinyl}"
  input-composer:
    backgroundColor: "{colors.grip}"
    textColor: "{colors.on-grip}"
    rounded: "{rounded.sticker}"
    padding: "12px 14px"
    height: "48px"
  message-bot:
    backgroundColor: "{colors.vinyl}"
    textColor: "{colors.ink}"
    rounded: "16px"
    padding: "10px 14px"
  message-user:
    backgroundColor: "{colors.grip-edge}"
    textColor: "{colors.on-grip}"
    rounded: "16px"
    padding: "10px 14px"
  price-tag:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.vinyl}"
    rounded: "{rounded.sticker}"
    padding: "12px 12px 12px 16px"
  photo-sheet:
    backgroundColor: "{colors.vinyl}"
    rounded: "{rounded.lg}"
    padding: "8px"
---

# Design System: LIJA

## Overview

**Creative North Star: "The Stickered Deck"**

The whole page is a skateboard deck wrapped in grip tape: a near-black, grained ground that never competes. Everything the visitor should touch or read as a thing (the logo, the buy module, every photo, every price, every help category) is a die-cut vinyl sticker slapped on top of it, with a white cut edge, a soft peel shadow and a slight tilt. Depth comes from stickers lifting off the tape, not from cards stacked in a grid.

Color is not decoration. The ground and the stickers are neutral (grip black, vinyl off-white); the only saturated colors in the system belong to the four post-sale intents, and each hue means exactly one category everywhere it appears: hero stickers, bumper strips, chat replies, the case tracker and the receipt. Type is loud and compressed for anything that is shouted (headlines, labels, buttons) and plain Archivo for anything that is read.

Density is loose on the store and tight in the chat. Motion is short and decisive: strong ease-out exits, presses that squash to 0.94-0.97, and one signature move, the intent sticker being slapped onto the case header.

**Key Characteristics:**
- Grain-textured grip-black ground (SVG fractal noise at 6% white, 160px tile) on page and chat panel.
- Vinyl off-white stickers with a white die-cut ring and soft two-layer lift shadow.
- Tilts: large sheets between -3deg and +2.5deg; small marks up to -12deg.
- Four intent hues, one category each, never decorative.
- Archivo compressed (wdth 62-75, weight 750-900, uppercase) for display; Archivo normal for text; Martian Mono only for prices, case codes and figures.
- Rounded everything; no sharp corners outside the full-screen mobile chat.

## Colors

A neutral grip-and-vinyl pair carries the entire layout; four saturated intent hues are reserved for post-sale categories.

### Primary
- **Vinyl White** (vinyl): the sticker surface. Logo, buy module, photo sheets, bot messages, the chat launcher, the white CTA, and the die-cut ring around every colored sticker. Never pure white.
- **Vinyl Shade** (vinyl-shade): unselected size-option strokes on vinyl.

### Secondary (the intent palette)
- **Acid Yellow** (intent-cambio): Cambio de prenda en oferta. Ink text.
- **Safety Orange** (intent-retraso): Entrega retrasada. Ink text.
- **Bubblegum Pink** (intent-falla): Producto con falla. Ink text.
- **Cobalt Blue** (intent-factura): Factura a empresa. Pure white text (on-intent-factura), the only place #fff appears.

Intent colors are applied through a `data-intent` scope that sets `--intent` and `--on-intent`; components read those two variables, never a specific hue.

### Neutral
- **Grip Black** (grip): page ground, under the grain texture; also field and reply-chip fill inside the chat.
- **Grip Raised** (grip-raised): the chat panel and its tracker strip.
- **Grip Edge** (grip-edge): hairline dividers, field and chip strokes, user message fill, image placeholders.
- **Chalk** (on-grip): primary text on the ground; outline stroke for hollow headline lines.
- **Worn Chalk** (on-grip-muted): ledes, nav at rest, captions, placeholders, status lines.
- **Ink** (ink): text on vinyl and on light intents; fill of the add-to-cart button, price tags and the 380 g badge.
- **Faded Ink** (ink-muted): secondary text on vinyl (legends, struck prices, summary labels, demo notes).
- **Coral Alert** (danger): field errors and invalid field strokes only.

### Named Rules
**The Palette Law.** Each intent hue belongs to one post-sale category and nothing else. If an element is not about that category, it does not wear its color; no intent hue on links, headings, CTAs, or ornaments.

**The Two Neutrals Rule.** Every non-intent surface is either grip (ground) or vinyl (sticker). A third surface tone needs a reason in the material.

## Typography

**Display Font:** Archivo Variable, width axis compressed (with Archivo, sans-serif)
**Body Font:** Archivo Variable at normal width (with system-ui)
**Label/Mono Font:** Martian Mono Variable (with ui-monospace)

**Character:** One family doing two jobs: squeezed to wdth 62 and weight 900 it reads like a skate-brand deck graphic; at normal width it is a calm, legible sans. The mono is a price-tag and receipt voice, not a texture.

### Hierarchy
- **Display** (900, wdth 62, clamp(4rem, 10vw, 6rem), line-height 0.86, uppercase): the hero drop title only. The second line is set hollow: transparent fill with a 2px Chalk text stroke.
- **Headline** (900, wdth 62, clamp(3.5rem, 8vw, 5.5rem) for sections, 1.75rem in the chat header, line-height 0.9, uppercase, balanced): section titles; the closing title runs up to 5.75rem. Section titles may repeat the hollow second line.
- **Title** (750-850, wdth 75, 1.0625-1.375rem, uppercase): product names, nav, buttons, sticker labels, the help question, the "ver el drop" link.
- **Body** (400, 1rem, line-height 1.55): running text; ledes at 1.125rem in Worn Chalk, capped at 44-48ch. Chat messages run at 0.9375rem / 1.45.
- **Label** (400, 0.8125rem): legends, captions, status, demo bar, summary terms.
- **Mono** (Martian Mono, tabular numerals, -0.02em): prices, struck prices, case IDs, confidence percentages.

All compressed display text carries `word-spacing: 0.14em` so words stay separate at narrow widths.

### Named Rules
**The Shout and Read Rule.** Compressed uppercase is for things that are shouted or pressed; anything a person reads as a sentence is Archivo at normal width, sentence case.

**The Receipt Rule.** Martian Mono appears only on codes and money: prices, case and order numbers, RUC, percentages. Never on headings, labels or prose.

## Layout

A centered 1320px column with a fluid gutter (clamp(16px, 4vw, 48px)). Sections breathe with clamp(56px, 8vw, 112px) vertical padding. The hero is a two-column grid (1.1fr / 0.9fr) with copy and the help stickers on the left and the tilted photo sheet on the right; it collapses to a single column at 860px with the photo between copy and help.

The drop wall is a 12-column dense grid of 5/6/7-span sheets with a tall-row variant, so photos sit at irregular sizes and tilts instead of a uniform card grid; at 900px everything is 6-span square, at 560px full width. The help section is a vertical stack of full-width bumper strips (26px gap), each with its own tilt. The chat is a fixed 420 x 680px panel anchored bottom-right, becoming full-screen under 560px.

Spacing within components steps through 6, 8, 12, 16, 20, 24 and 28px.

## Elevation & Depth

Depth is physical: stickers lifting off grip tape. Shadows are soft, dark and downward, always paired with a tight contact shadow, and colored stickers add a solid vinyl ring (the die-cut edge) outside the fill. There are no hard offset shadows and no glows.

### Shadow Vocabulary
- **Die-cut** (`box-shadow: 0 0 0 3px var(--vinyl)`): the white cut edge around intent stickers and price tags; 4px on bumpers and the weight badge, 2px on small chips.
- **Lift** (`0 1px 1px rgb(0 0 0 / 0.35), 0 8px 18px -6px rgb(0 0 0 / 0.6)`): resting stickers, logo, photo sheets, bot messages, the white CTA.
- **Lift High** (`0 2px 2px rgb(0 0 0 / 0.35), 0 18px 34px -10px rgb(0 0 0 / 0.7)`): the buy module, the launcher, the closing sheet, hovered bumpers, the first frame of the slap.
- **Panel** (`0 2px 4px rgb(0 0 0 / 0.4), 0 30px 60px -20px rgb(0 0 0 / 0.85)`): the chat panel only.

### Named Rules
**The Peel Rule.** Lift is expressed by shadow depth and tilt changing together: on hover a sticker straightens toward 0deg and rises 2-4px, on press it squashes to 0.94-0.97.

## Shapes

Every surface is rounded, scaled to its size: 4px tracker slots, 10px size options and logo, 12px icon buttons and photos inside sheets, 14px stickers, buttons and fields, 16-22px messages, bumpers and sheets, full pills for the launcher, cart, reply chips and bumper CTAs, circles for the weight badge and status dot. Photos sit inside a vinyl sheet with 8-10px of white margin. The hero sheet uses a clip-path to cut its bottom-right corner, with a gradient flap showing the sticker's folded back; the peel grows from 48px to 72px on hover. Chat messages pinch the corner nearest their speaker to 6px.

Empty case fields are ghost stickers: 14 x 18px slots with a 1.5px dashed Worn Chalk stroke that become solid intent-colored, vinyl-edged and tilted -4deg when filled.

## Components

### Buttons
Tactile, stuck-on, and pressed with a squash.
- **Ink button** (add to cart): Ink fill, Vinyl text, compressed title type at 1.125rem, 52px tall, sticker radius. Press scales to 0.97 over 120ms.
- **Vinyl button** (closing CTA at 16px radius; chat launcher as a full pill): Vinyl fill, Ink text, compressed title type 1.0625-1.25rem, lift shadow, resting tilt -1.5deg to -2deg, straightens and rises 2px on hover.
- **Icon buttons**: 40-48px squares, 12-14px radius; transparent on grip (Grip Edge on hover) or Vinyl fill for send and add. Disabled at 35% opacity.

### Chips
- **Reply chip**: 40px pill, Grip fill, 1.5px Grip Edge stroke, Chalk text 0.875rem/600; hover lightens the stroke to Worn Chalk.
- **Intent reply**: same pill filled with the intent hue and a 2px vinyl ring; tilts -2deg on hover.
- **Primary reply**: Vinyl fill, Ink text.

### Cards / Containers
- **Photo sheet**: Vinyl, 8-10px padding, 18-22px radius, lift shadow, individual tilt; image inside at 12-14px radius.
- **Buy module**: Vinyl, 20px padding, 18px radius, lift-high, -1deg tilt.
- **Price tag**: Ink sticker overlapping the bottom of its photo by 34px, die-cut ring plus lift, counter-tilted to its sheet.

### Inputs / Fields
- **Composer**: Grip fill, 1.5px Grip Edge stroke, 14px radius, min 48px tall, auto-growing to 140px.
- **Focus**: stroke turns Vinyl (global focus ring is a 3px Vinyl outline offset 3px; Ink on vinyl surfaces).
- **Error / Disabled**: Coral Alert stroke plus a Coral Alert message line; disabled at 60% opacity.

### Navigation
Compressed uppercase title type at 1.0625rem/750 in Worn Chalk, Chalk on hover; hidden under 640px. The logo is a Vinyl sticker at -3deg in 900-weight display; the cart is a Grip Edge pill.

### Intent Sticker (signature)
The atomic unit of the palette law: an intent-filled sticker with an inline SVG icon, compressed uppercase label, 14px radius, die-cut ring and lift, tilted about -2deg. Sizes sm (0.8125rem), md (1rem), lg (1.375rem). When the bot classifies a message the sticker is slapped onto the case header: it drops from 14px above at 1.35x scale and 9deg extra rotation to rest over 460ms on a hard ease-out.

### Bumper Strip
A full-width vinyl bumper sticker per intent: intent fill, 4px vinyl ring, 20px radius, four columns (compressed label with icon, the quoted question, the key fact, an Ink pill CTA); collapses to a stack under 960px.

## Do's and Don'ts

### Do:
- **Do** lay every touchable or priced thing on a Vinyl or Ink sticker over the grained grip ground.
- **Do** route intent color through `data-intent` so components read `--intent` / `--on-intent` and the palette law holds by construction.
- **Do** pair Archivo compressed (wdth 62-75, 750-900, uppercase, word-spacing 0.14em) for shouted text with normal-width Archivo for sentences.
- **Do** set prices, case IDs, order numbers and RUC in Martian Mono with tabular numerals.
- **Do** keep large sheets within -3deg to +2.5deg and let only small marks (badges, slots, mini chips) tilt further.
- **Do** animate with `--ease-out` (cubic-bezier(0.23, 1, 0.32, 1)) at 120ms presses, 200ms UI and 260ms panels, and honor reduced motion.
- **Do** show empty data as dashed ghost stickers that fill with the intent color.

### Don't:
- **Don't** use an intent hue for anything that is not its category: no yellow highlights, no blue links, no pink accents.
- **Don't** lay a uniform grid of identical product cards; the drop wall varies span, aspect and tilt.
- **Don't** use hard offset shadows or colored glows; depth is the soft peel shadow plus the die-cut ring.
- **Don't** use sharp corners or pure white surfaces; vinyl is off-white and every edge is rounded.
- **Don't** set Martian Mono on headings, labels or body copy.
- **Don't** use ease-in curves on UI motion.
