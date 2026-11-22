---
name: SukiMart
description: Back office for a Filipino neighborhood store, laid like a cement-tile floor.
colors:
  oxblood: "#7a2a26"
  oxblood-deep: "#5e1f1c"
  oxblood-lit: "#93413b"
  ochre: "#c98a2b"
  ochre-ink: "#8a5a12"
  slate: "#3c4f5c"
  slate-soft: "#c9d1d6"
  tile: "#f3efe7"
  grout: "#e4dfd7"
  line: "#d6cec3"
  ink: "#1f1b18"
  muted: "#645a52"
  on-oxblood: "#f6e7e3"
  on-oxblood-muted: "#dcb5ae"
  danger: "#a3261f"
  ok: "#2f6b4a"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 2.7vw, 2.625rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.025em"
    fontFeature: "lnum"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2vw, 1.875rem)"
    fontWeight: 800
    letterSpacing: "-0.02em"
    fontFeature: "lnum"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 750
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 650
  table-head:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 750
    letterSpacing: "0.04em"
rounded:
  hairline: "2px"
  tile: "3px"
spacing:
  grout: "4px"
  s1: "8px"
  s2: "12px"
  s3: "16px"
  s4: "24px"
  s5: "32px"
  s6: "48px"
components:
  button-primary:
    backgroundColor: "{colors.oxblood}"
    textColor: "#ffffff"
    rounded: "{rounded.tile}"
    padding: "0 16px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.oxblood-deep}"
  button-secondary:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "0 16px"
    height: "44px"
  button-danger:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.danger}"
    rounded: "{rounded.tile}"
    padding: "0 16px"
    height: "44px"
  input:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink}"
    rounded: "{rounded.tile}"
    padding: "0 12px"
    height: "44px"
  tile:
    backgroundColor: "{colors.tile}"
    textColor: "{colors.ink}"
    padding: "24px"
  nav-link-active:
    backgroundColor: "{colors.oxblood-lit}"
    textColor: "#ffffff"
    rounded: "{rounded.tile}"
    height: "42px"
  role-chip:
    backgroundColor: "{colors.ochre}"
    textColor: "{colors.ink}"
    rounded: "{rounded.hairline}"
    padding: "2px 6px"
---

# Design System: SukiMart

## Overview

**Creative North Star: "The Cement-Tile Floor"**

The store's Machuca-style cement-tile floor is the system. Every panel is a square tile of warm limewash (tile) set into a lighter mortar ground (grout), separated by a visible 4px grout joint and finished with one-pixel rules. An oxblood rail runs down the left like the store's painted wainscot. The floor pattern itself, an ochre-slate-oxblood four-fold medallion, is drawn once in `TileMotif.jsx` and in the `--motif` data URI, and is cropped two ways: a quarter-disc in the corner of ordinary tiles, and the full repeat on exactly one element per screen.

Density is a working back office's: compact tables, 44px controls, clear labels in the brief's own words. Colour is pigment, not decoration: oxblood is the store's voice and primary action, ochre marks the live or selected thing (today, focus, the active icon), slate carries data. Depth is almost entirely grout and tone; shadows exist only for things that float above the floor (the pop-up and the phone drawer).

The system refuses the generic white-card admin template: no floating white cards on gray, no soft drop shadows on panels, no rounded 12px pills.

**Key Characteristics:**
- Square tiles on a 4px grout joint; corners never past 3px.
- One full-pattern element per screen; every other tile shows only the quarter-motif corner.
- Oxblood rail and primary action; ochre for the live thing; slate for data.
- One grotesque (Schibsted Grotesk, self-hosted variable 400–900), heavy for figures.
- Flat floor; shadow only on floating layers.

## Colors

Fired-pigment palette: three earth pigments on a warm limewash floor, with ink-dark text.

### Primary
- **Oxblood** (`oxblood`): the sidebar rail and phone top bar, primary buttons, the 3px frame around the patterned element, receipt codes, link text, the big sales figure, and the medallion of the motif. Hover deepens to **Oxblood Deep**; the active nav item and icon-button hover lighten to **Oxblood Lit**.

### Secondary
- **Ochre** (`ochre`): the live or selected thing only. Today's bar in the week chart, the focus outline and focus glow (`rgb(201 138 43 / .35)`), the active nav icon, the `Mart` in the wordmark, the role chip, text selection, the quarter-disc of the motif. **Ochre Ink** (`ochre-ink`) is its text-safe darker form.

### Tertiary
- **Slate** (`slate`): data. Every non-today bar in the week chart, the arc ring of the motif, and the border of secondary buttons on hover. **Slate Soft** is its pale tint.

### Neutral
- **Tile** (`tile`): every panel, card, table well, modal and login tile surface.
- **Grout** (`grout`): the page ground, read-only inputs, and the 4px joints' surrounding field.
- **Line** (`line`): the grout joint itself (tile borders and grid gaps), table rules, input strokes, form dividers.
- **Ink** (`ink`): body text and the baseline under the week bars. Backdrops are ink at 40–50%.
- **Muted** (`muted`): page subtitles, tile labels, field labels, table headers, empty states.
- **On-Oxblood** / **On-Oxblood Muted**: text and icons on the rail; muted for nav-group labels and inactive nav icons.
- **Danger** (`danger`) and **OK** (`ok`): destructive buttons, errors, short change in POS; success icon and positive change. Their pale washes (`#fbeeec`, `#e6f0ea`) back the modal icons.
- Inputs and hovered rows/tiles lift to plain white (`#ffffff`), the one place pure white appears.

### Named Rules
**The Pigment Roles Rule.** Oxblood speaks for the store and the primary action; ochre marks the one live or selected thing; slate carries data. Never swap roles: a slate button or an ochre primary action is off-system.

**The No-White-Card Rule.** Panels are tile (`#f3efe7`) on a grout joint, never white cards on gray. White is reserved for input wells and hover lift.

## Typography

**Display Font:** Schibsted Grotesk (with system-ui, sans-serif)
**Body Font:** Schibsted Grotesk
**Label/Mono Font:** none; one family carries everything.

**Character:** A sturdy newspaper grotesque, set heavy (750–800) for headings and figures and plain (400–550) for running text. Self-hosted as a variable woff2 (weights 400–900, latin and latin-ext subsets) so the peso sign and Filipino greetings render without a network font.

### Hierarchy
- **Display** (800, `clamp(1.875rem, 2.7vw, 2.625rem)`, 1.05, -0.025em): the headline figure on the patterned dashboard tile, in oxblood.
- **Headline** (800, 1.875rem, 1.15, -0.02em; 1.5rem under 900px): page titles (`h1`), balanced wrap. Login title is 2.125rem.
- **Figure** (800, `clamp(1.5rem, 2vw, 1.875rem)`, -0.02em): stat-tile counts and amounts. Cart total 1.5rem, summary cells 1.25rem.
- **Title** (750, 1.0625rem): panel headings (`h2`).
- **Body** (400, 16px, 1.45): running text; tables at 0.875rem; buttons 700 at 0.9375rem.
- **Label** (650–700, 0.875rem, muted): field labels and tile labels, sentence case.
- **Table head** (750, 0.75rem, 0.04em, uppercase, muted): column headers only. The sidebar's group headings (0.75rem, 700, 0.1em, uppercase, on-oxblood-muted) and the role chip (0.6875rem, 800, 0.08em, uppercase) are the only other uppercase text.

### Named Rules
**The Lining Figures Rule.** Money and counts use the grotesque's own proportional lining figures (`font-variant-numeric: lining-nums`), never tabular. Right-alignment in table `num` columns does the aligning; the figures keep their natural widths.

**The One Family Rule.** Schibsted Grotesk at varied weight is the whole type system. Hierarchy comes from weight and size, not from a second face.

## Layout

A two-column shell: a fixed 264px oxblood rail and a content column (padding 32px top, 48px sides, max-width 1360px). Everything sits on one 4px module: the grout joint is 4px, and spacing steps are 8 / 12 / 16 / 24 / 32 / 48px.

Tile groups (dashboard stats, payroll summary) are CSS grids whose `gap` and border are both the 4px line colour, so tiles read as laid floor rather than spaced cards. The dashboard stat row is `2fr 1fr 1fr 1fr` with the patterned tile in the wide slot; a cashier's two-tile row becomes `2fr 1fr`. Panels below sit in a `1.15fr 1fr` row with a 16px gap. POS is a product grid (`minmax(156px, 1fr)`, 4px grout) beside a 360px sticky cart. Forms use `repeat(auto-fill, minmax(240px, 1fr))`, max 920px, with actions below a one-pixel rule.

Responsive:
- **≤1180px:** stat tiles go to three columns with the patterned tile spanning the row (a cashier's two-tile row stacks both full width); dashboard panels and POS stack, and the cart stops being sticky.
- **≤900px:** the rail becomes a 60px sticky oxblood top bar with a slide-in drawer (min(300px, 86vw)) and scrim; content padding drops to 24/16px; page actions fill the width.
- **≤560px:** stat tiles two-up, the last odd tile spans; the patterned tile keeps zero padding with 16px on its text column so the pattern field still meets the frame; summary two-up; forms single column; week bars hide their amount labels.

## Elevation & Depth

The floor is flat. Depth comes from the grout joint, the tile-to-grout tone step, and one-pixel rules. Shadows exist only on layers that genuinely float above the floor.

### Shadow Vocabulary
- **Pop-up lift** (`box-shadow: 0 24px 60px -20px rgb(31 27 24 / .55)`): the Save / confirm modal.
- **Drawer edge** (`box-shadow: 12px 0 40px -12px rgb(31 27 24 / .5)`): the open phone drawer.
- **Pattern frame** (`box-shadow: inset 0 0 0 3px var(--ox)`): not depth but an inlaid 3px oxblood border on the one patterned element; the inset form keeps the grout geometry intact.
- **Focus glow** (`box-shadow: 0 0 0 3px rgb(201 138 43 / .35)`): focused inputs.

### Named Rules
**The Flat Floor Rule.** Tiles, panels and tables never carry a drop shadow. If it sits on the floor, it is separated by grout; only the modal and the drawer lift.

## Shapes

Square and laid. Corners are at most 3px (`rounded.tile`) on tiles, buttons, inputs and nav items; 2px (`rounded.hairline`) on the role chip, wordmark motif and the tops of chart bars; POS product tiles are fully square inside their grout. Borders are the 4px grout joint around tile groups and panels, and one-pixel line rules inside them. The only circles are the motif's own discs and arcs and the 56px modal status icon.

The motif is a single 200-unit drawing: four ochre quarter-discs with slate arcs in the corners, an oxblood ring and diamond medallion with a tile-coloured inner diamond and ochre centre, and four slate petals. Ordinary tiles show only a 40px top-right quarter (ochre disc to 21px, slate arc at 28–30px), drawn in CSS gradients.

### Named Rules
**The One Patterned Tile Rule.** Exactly one element per screen carries the full pattern: the dashboard's Today's sales tile (pattern field on its right 30%), or a `.patterned` band (a 40px pattern strip under a 3px oxblood rule along the top of the page's main tile: the registration form, user account form, POS cart, report results tile (the band sits on a wrapper around a borderless table well, so the pattern stays outside the horizontal scroll), login tile at 96px, payroll's Net pay cell at 26px). A patterned element drops its quarter corner. A second full pattern on a screen is off-system.

**The Quarter Corner Rule.** Every other panel, card, stat tile and POS product shows the quarter-motif in its top-right corner, and clears it with 44px of top padding so the heading sits beneath the corner rather than beside it.

## Components

### Buttons
Solid, square-shouldered, 44px tall.
- **Shape:** gently squared (3px), 1px border matching the fill, padding 0 16px, 700 weight at 0.9375rem, icon gap 8px.
- **Primary:** oxblood fill, white text; hover oxblood-deep. Disabled at 45% opacity.
- **Secondary:** tile fill, ink text, line border; hover lifts to white with a slate border.
- **Danger:** tile fill, danger text and border; hover pale red wash.
- **Link:** oxblood text, 700, 1px underline offset 3px; hover oxblood-deep.
- **Icon button (rail):** transparent, on-oxblood icon, 44px square; hover oxblood-lit.
- Transitions are 150ms ease-out on colour, border and shadow.

### Chips
- **Role chip:** ochre fill, ink text, 0.6875rem 800 uppercase with 0.08em tracking, 2px corners, beside the username in the rail foot.

### Cards / Containers
- **Corner Style:** 3px.
- **Background:** tile.
- **Shadow Strategy:** none (Flat Floor Rule).
- **Border:** 4px line-colour grout joint.
- **Internal Padding:** 24px; panels take 44px on top to clear the quarter corner (16px for POS products, 12/16px for summary cells, 32px for the login tile).
- **Report results tile:** a grout-framed tile holding a borderless, horizontally scrolling table well; the patterned band belongs to the frame, not the scroll area.
- **Stat tile:** min 148px tall, label top, heavy figure bottom, quarter corner.
- **Summary strip:** four tile cells in a grout grid, muted label over a 1.25rem figure; the last figure in oxblood.

### Inputs / Fields
- **Style:** white well, 1px line stroke, 3px corners, 44px tall, 0 12px padding; label above in muted 650 at 0.875rem with a 6px gap. Selects and date inputs use custom oxblood chevron and calendar glyphs (inline SVG data URIs).
- **Hover:** stroke darkens to `#b9ae9f`.
- **Focus:** stroke turns oxblood with a 3px ochre glow; elsewhere focus is a 2px ochre outline offset 2px.
- **Read-only:** grout fill, muted text (computed gross and net pay).
- **Error:** danger text at 600.

### Navigation
- **Rail:** oxblood, 264px, sticky full height. Wordmark (Suki in white, Mart in ochre, 1.5rem 800) with the corner motif at 28px.
- **Groups:** Forms / Reports / Admin headings in on-oxblood-muted small caps.
- **Links:** 42px, 0.9375rem 550, on-oxblood at 82% opacity with an 18px Lucide line icon; hover full opacity on a 7% white wash; active oxblood-lit fill, white 750 text, ochre icon.
- **Foot:** username, role chip, and an outlined Log out button over a 14% white rule.
- **Mobile:** 60px oxblood top bar with wordmark and menu button; the rail slides in from the left (280ms, `cubic-bezier(.16, 1, .3, 1)`) over an ink scrim.

### Tables
Compact report tables on a tile well: 0.875rem, 11px × 16px cells, one-pixel line rules, sticky uppercase muted headers, white row hover, receipt and record codes in oxblood 700, numeric columns right-aligned.

### Week Chart
Seven columns, 280px tall (220px on phones): slate bars with 2px tops on an ink baseline, today's bar ochre with its label and amount in ink 750. Bars grow with a 600ms `cubic-bezier(.16, 1, .3, 1)` ease.

### Pop-up (Modal)
The Save confirmation every form promises. Centered tile, 3px corners, max 400px, 32/24px padding, pop-up lift shadow over an ink 50% backdrop. A 56px round status icon (green check on pale green for saved; red warning on pale red for confirm), the message at 1.0625rem 600, and full-width equal action buttons (OK; or Cancel secondary plus danger confirm). Enters with a 180ms fade and a 280ms rise from 12px below.

## Do's and Don'ts

### Do:
- **Do** separate tiles with the 4px grout joint (line-colour gap and border), not with spacing and shadow.
- **Do** give every screen exactly one full-pattern element: the dashboard tile field or one `.patterned` band on the page's main tile.
- **Do** put the quarter-motif corner on every other panel, card, stat tile and product, and give the panel 44px of top padding to clear it.
- **Do** keep oxblood for the rail and primary action, ochre for today, focus and the selected item, slate for data.
- **Do** set money and counts heavy (800) with proportional lining figures, right-aligned in tables.
- **Do** keep controls at 44px minimum for touch.
- **Do** respect reduced motion: under `prefers-reduced-motion` every spatial or reveal animation is removed (pattern bloom and lay, bar rise, page rise, check draw, drawer slide, button press); colour feedback stays (150ms nav fades, the POS cart glow) and the pop-up keeps a 150ms fade.
- **Do** lay a patterned band in whole tiles: the lay steps by exactly one tile width (`--lay-tile` × `--lay-count`), never by a percentage of the band.
- **Do** start entrances from an already-visible state: a page change rises from opacity .65, never from blank.

### Don't:
- **Don't** round corners past 3px on tiles, buttons, inputs or nav.
- **Don't** put a drop shadow on any tile, panel or table; only the modal and drawer lift.
- **Don't** use plain white as a panel surface; white is for input wells and hover lift.
- **Don't** show the full pattern twice on one screen, or add a quarter corner to the patterned element.
- **Don't** use tabular figures for money.
- **Don't** add a second typeface.
