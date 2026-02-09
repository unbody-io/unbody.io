# Design Spec

These are non-negotiable first principles. Every UI decision must pass through them.

---

## 1. One Source of Truth

All styling lives in the Tailwind theme. Components consume defaults — they don't invent their own.

- **No inline overrides**: If a value (color, size, spacing) appears as a one-off class, it belongs in the theme instead.
- **No custom/magic numbers**: Every value used in markup must trace back to a TW token.
- **Change holistically**: If something needs to look different, update the theme — not the component. One change, everywhere at once.
- **Test**: If you delete a class from a component and it still looks right from the theme defaults, that class shouldn't have been there.

---

## 2. Typography

Strict minimalism. Hierarchy through style, not size or weight.

### Sizes
- **Normal**: 13px — the one size for almost everything.
- **Small**: One step down on the TW scale — for captions, metadata, secondary labels.
- That's it. Two sizes. No `text-lg`, no `text-2xl`, no custom font sizes.

### Weight
- **Regular (400)** — the only weight. No bold, no semibold, no medium.

### Hierarchy
Since size and weight are locked, create visual hierarchy with:
- **Font style**: `italic` to emphasize or distinguish.
- **Decoration**: `underline`, `line-through` for semantic cues.
- **Opacity/color**: Muted vs primary text color.
- **Uppercase + tracking**: For labels and section markers.
- **Spacing**: Let whitespace do the work.

### What's forbidden
- Multiple font sizes on the same page beyond the two defined.
- `font-bold`, `font-semibold`, `font-medium` or any weight other than regular.
- Using font size to create hierarchy.

---

## 3. Color

A near-monochrome palette. The page should always feel like a soft, grayish photograph.

### Background
- Always a muted, grayish tone — the ambient blurred image treatment or equivalent.
- Never pure white, never saturated.

### Text
- **Primary**: Black (`#000`) — for headings, active states, emphasis.
- **Body**: Dark gray (e.g. `neutral-600/90`) — for paragraph content.
- That's the palette. Two text tones.

### What's forbidden
- Saturated colors in text or large surfaces.
- Multiple accent colors competing for attention.
- High-contrast body text (body should feel calm, not loud).

---

## 4. Interactive Components

The minimalism above applies to content. Interactive UI elements (navigation, controls, overlays) are allowed to break the austerity — but with taste.

### Allowed
- `backdrop-blur` for glass morphism.
- `box-shadow` for elevation and depth.
- Subtle borders (`border-white/30` etc.).
- Transitions and micro-animations.
- Active/hover state changes (color inversion, scale).

### Principle
These components float above the content layer. They should feel like physical objects — translucent, elevated, tactile — while the content beneath stays flat and typographic.

---

## How to Use This

Before writing or reviewing any UI code:

1. **Is this value in the theme?** If not, add it there first.
2. **Am I adding a new font size or weight?** If yes, stop. Use the two sizes or hierarchy tools instead.
3. **Am I adding a new color?** If yes, stop. Use black, dark gray, or the background tone.
4. **Is this an interactive component?** Only then can you reach for blur, shadow, elevation.
