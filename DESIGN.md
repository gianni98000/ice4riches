---
name: Ice4Riches — cinematic homepage
description: Clear ice through scale, light and precise glass selection.
colors:
  accent: "#ff4a1f"
  accent-hover: "#ff6947"
  graphite: "#18191b"
  raised-graphite: "#222427"
  ice-white: "#eff0f1"
  muted: "#b5b7bb"
  film-black: "#030505"
  header-black: "#080a0b"
  control-grey: "#dfe2e4"
  stage: "#22292b"
  white: "#ffffff"
  compatible-bg: "#e0e8e3"
  incompatible-bg: "#eeded8"
  compatible-ink: "#246346"
  incompatible-ink: "#823419"
typography:
  display:
    fontFamily: "Switzer, sans-serif"
    fontSize: "clamp(56px,6.2vw,96px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Switzer, sans-serif"
    fontSize: "clamp(38px,4.4vw,64px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.035em"
  title:
    fontFamily: "Switzer, sans-serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-.035em"
  body:
    fontFamily: "Switzer, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Switzer, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  wordmark:
    fontFamily: "Switzer, sans-serif"
    fontSize: "clamp(55px,16vw,260px)"
    fontWeight: 600
    lineHeight: 0.9
    letterSpacing: "-.04em"
rounded:
  square: "0px"
  drink-dot: "50%"
spacing:
  control-gap: "8px"
  compact: "16px"
  mobile-gutter: "20px"
  inset: "24px"
  desktop-gutter: "32px"
  lab-gap: "48px"
  section: "120px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#171819"
    rounded: "{rounded.square}"
    padding: "15px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-pour:
    backgroundColor: "{colors.ice-white}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.square}"
    padding: "10px 14px"
  glass-preset:
    backgroundColor: "{colors.control-grey}"
    textColor: "{colors.graphite}"
    padding: "13px 24px"
    rounded: "{rounded.square}"
  glass-preset-selected:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.white}"
  faq-panel:
    backgroundColor: "{colors.raised-graphite}"
    textColor: "{colors.ice-white}"
    padding: "24px"
    rounded: "{rounded.square}"
---
# Design System: Ice4Riches

## Overview

**Creative North Star: "The object, large"**

The object, large: genuine ice photography and the existing H3 macro film carry the atmosphere. Graphite fields, cold optical lettering and generous image scale create presence; ice-white working surfaces and orange actions make choosing a format direct.

This documents the implemented homepage and Ice Lab, using the direction recorded in `.impeccable/surfaces/home.md`. Secondary routes retain their previous styling. It records implementation decisions, not an approved image comp; visual-review evidence remains separate.

**Key Characteristics:**
- Genuine ice imagery and cold optical wordmarks.
- Switzer throughout, with compact headings and readable controls.
- Flat rectangular surfaces, large alternating fields and restrained action color.
- Immediate controls, bounded decorative motion and semantic fallbacks.

## Colors

The palette couples graphite and cool light neutrals with orange actions. Frontmatter values are normative; minor image and SVG shades stay local to their components.

### Primary
- **Action Orange / Hover Orange:** calls to action, keyboard focus and hover feedback.

### Neutral
- **Graphite / Raised Graphite:** page field and FAQ panels; graphite becomes text on light sections.
- **Ice White / White:** dark-field text, working surfaces and selected controls.
- **Muted:** supporting text on dark fields.
- **Film Black / Header Black:** image surround and header.
- **Control Grey / Stage:** light controls and the dark glass demonstration.

### Status
- **Compatible / Incompatible:** quiet green and warm clay feedback backgrounds; stronger matching text colors identify fit in format choices.

**The Action Color Rule.** Orange identifies actions and focus; compatibility remains a labeled status.

## Typography

Switzer is self-hosted at weights 400, 500 and 600 with sans-serif fallback. Scale and weight distinguish display from interface copy. Paragraphs generally stop at 60ch, with shorter hero and craft copy. Measurements use tabular numerals.

Frontmatter records desktop roles. The hero uses `clamp(46px,6vw,63px)` from 701 to 1050 pixels, then 52 pixels on mobile. Many mobile paragraphs and controls use 16 pixels. The opening optical phrase and wordmarks are semibold; the footer scales to 17vw on mobile. These purpose-sized roles do not form a strict modular scale.

## Layout

Full-width fields use 32-pixel desktop and 20-pixel mobile gutters. Large sections generally use 120-pixel desktop vertical padding, reducing to 70–80 pixels on mobile. Breakpoints are 1050 and 700 pixels.

The desktop film occupies 72% of the hero with right-aligned copy alongside. The viewport-relative hero has a 730-pixel minimum and 1000-pixel maximum. Mobile uses a 740-pixel hero and 410-pixel film with left-aligned copy beneath. These are implementation measurements, not a guarantee of fitting every viewport.

The collection has unequal 1.15:0.85 columns and offset alternate products. The lab uses 1.15:1 columns and a sticky dark stage; tablet format choices become one column. At 700 pixels and below sections stack, the stage loses stickiness and format choices return to two columns. Logo grids step from six to three to two columns. These arrangements belong to this surface, not every future page.

## Elevation & Depth

The interface uses tonal separation without box shadows. Real photography, translucent SVG glass gradients and refracted lettering carry material depth. Gradients blend the film edges into the background; optical effects do not decorate ordinary controls.

**The Flat Controls Rule.** Control depth comes from contrast, selection borders and immediate state feedback, not floating shadows.

## Shapes

Controls, panels and image frames have square corners. Format choices use a two-pixel selection border. Circular drink swatches and sphere geometry are deliberate exceptions; small SVG radii belong to the ice drawing. Product images use square or 1.25 aspect ratios; mobile normalizes the collection to 1.25.

## Components

### Actions and navigation
Primary actions have orange backgrounds, dark text and a 54-pixel minimum height. Fine-pointer hover lightens orange; button presses scale to .97. Underlined text links carry lighter actions. The dark header combines a semibold wordmark, plain section links and underlined ordering; navigation wraps to its own row on mobile.

Keyboard focus uses a three-pixel orange outline with five-pixel offset. Touch actions use manipulation. The light pour button and view switch belong to the dark stage and remain visually distinct from ordering.

### Ice Lab controls
Glass and drink presets use neutral rectangular buttons with dark selected states exposed through `aria-pressed`. Format choices combine photographs, dimensions and written fit results; selection adds a dark border on white. Native ranges use graphite accent color and measured outputs. An explicit checkbox flags irregular glassware. Feedback combines a polite live region, written status and colored field.

### Product entries and disclosures
Product entries are open image-and-copy arrangements without elevated card shells. FAQs use native details/summary within raised-graphite panels; measurements use a light disclosure panel. No homepage text-entry field is implemented: range and checkbox are the canonical inputs here.

### Optical lettering and film
The Paper Design liquid-logo adaptation appears on the opening phrase and closing wordmark. Canvas is decorative; underlying text supplies semantics and remains visible when initialization fails or WebGL is lost. Motion has approximately four seconds of active time per mounted mark, pauses offscreen/hidden and is static under reduced motion. Pixel ratio is capped at 1.5. This document makes no shader-fidelity approval claim.

The muted looping film has a poster and explicit play/pause control, and pauses offscreen. Reduced motion and data-saving initially suppress automatic loading; users may explicitly play it. Content reveals run once for 560 milliseconds with an 18-pixel rise. Control transitions last 140–180 milliseconds. Reduced motion suppresses reveals and transitions. Fine-pointer product hover scales imagery to 1.035 over 500 milliseconds.

## Do's and Don'ts

### Do:
- Do preserve the original product imagery and French product identity.
- Do use orange for actions and visible keyboard focus.
- Do distinguish compatibility with text as well as color.
- Do retain semantic lettering when WebGL is unavailable.
- Do respect reduced motion and explicit film playback controls.

### Don't:
- Don’t extend homepage tokens to secondary routes without a separate migration.
- Don’t substitute generic decorative ice imagery for product photographs.
- Don’t turn flat controls into rounded floating cards or add decorative interface shadows.
- Don’t make decorative motion continuous or delay an Ice Lab response.
- Don’t present illustrative liquid levels as a physical simulation.
