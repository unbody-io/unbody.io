# Design Language: Ambient Liquid

This document captures the design language extracted from the Unbody Lab landing page, characterized by its soft, ethereal aesthetic that creates a sense of calm focus.

## Design Philosophy

The design embodies **ambient minimalism** — it creates atmosphere without demanding attention. The visual language suggests depth and softness while maintaining clarity and readability. Key principles:

- **Atmospheric, not decorative**: Visual elements serve to create mood, not distraction
- **Soft boundaries**: Nothing feels hard-edged; everything bleeds and fades
- **Quiet confidence**: Typography is understated but deliberate
- **Layered transparency**: Depth through overlapping translucent elements

---

## Color Palette

### Base Colors
| Name | Value | Usage |
|------|-------|-------|
| Background | `#e5f3f3` | Page background (pale cyan/mint) |
| Surface White | `rgba(255,255,255,0.4)` | Overlay tints, gradient masks |
| Text Primary | `#000000` | Headlines, active navigation |
| Text Muted | `rgba(0,0,0,0.5)` | Inactive navigation |
| Text Body | `rgba(115,115,115,0.9)` | Paragraph text (neutral-600/90) |

### Accent Colors
| Name | Value | Usage |
|------|-------|-------|
| Cyan Pulse | `#06b6d4` | Status indicator with glow |
| Cyan Glow | `rgba(6,182,212,0.8)` | Shadow/glow effect |

### Selection State
- Background: Black (`#000000`)
- Text: White (`#ffffff`)

---

## Typography

### Font Stack
```css
font-family: 'IBM Plex Mono', monospace;
```

The monospace typeface creates a technical, laboratory feel while remaining highly readable.

### Type Scale

| Element | Size | Weight | Tracking | Transform |
|---------|------|--------|----------|-----------|
| Navigation | 10px | normal/bold | 0.2em | uppercase |
| Section Headers | 14px (sm) | normal | wider | uppercase |
| Body Text | 14px (sm) | normal | normal | none |
| Footer Label | 9px | normal | 1em | uppercase |
| Version Tag | 7px | normal | 0.2em | uppercase |

### Typographic Principles
- **Uppercase sparingly**: Reserved for navigation, labels, and section headers
- **Generous letter-spacing**: Uppercase text uses expanded tracking (0.2em–1em)
- **Relaxed line-height**: Body text uses `leading-relaxed` for comfortable reading
- **Hierarchical opacity**: Importance conveyed through color opacity, not size

---

## Layout System

### Container
- Max width: `max-w-2xl` (672px)
- Centered horizontally
- Top padding: `pt-40` (160px) to clear fixed header
- Bottom padding: `pb-48` (192px)

### Spacing Scale
| Use | Value |
|-----|-------|
| Section margin | `mb-20` (80px) |
| Paragraph margin | `mb-8` (32px) |
| Header margin | `mt-16 mb-4` |
| Final footer margin | `mt-32` (128px) |

### Fixed Elements
- Navigation header: `top-8` (32px from top)
- Sketch menu: `bottom-8 right-8` (32px from edges)

---

## Visual Effects

### Ambient Background
The signature effect uses a heavily processed background image:

```css
filter: blur(120px) saturate(0.05) brightness(1.1);
transform: scale(1.2);
```

- **Extreme blur** (120px): Dissolves image into pure color fields
- **Near-grayscale saturation** (0.05): Removes color identity, keeps luminance
- **Slight brightness boost** (1.1): Keeps it airy
- **Scaled up** (1.2): Prevents edge artifacts from blur

### Gradient Masks
Fixed top and bottom fade overlays create reading focus:

```css
/* Top mask */
background: linear-gradient(to bottom,
  rgba(255,255,255,0.6),
  rgba(255,255,255,0.3),
  transparent
);
height: 192px;

/* Bottom mask */
background: linear-gradient(to top,
  rgba(255,255,255,0.6),
  rgba(255,255,255,0.3),
  transparent
);
height: 192px;
```

### Glass Morphism (Navigation)
```css
background: rgba(255,255,255,0.1);
backdrop-filter: blur(64px); /* backdrop-blur-3xl */
border: 1px solid rgba(255,255,255,0.3);
box-shadow: 0 10px 40px rgba(0,0,0,0.05);
```

### Pulse Indicator
```css
width: 6px;
height: 6px;
border-radius: 50%;
background: #06b6d4;
animation: pulse;
box-shadow: 0 0 12px rgba(6,182,212,0.8);
```

---

## Component Patterns

### Floating Pill Navigation
```
┌─────────────────────────────────────────────────────────┐
│  [home]  [■ lab ■]  [blog]  [about]  ●                 │
└─────────────────────────────────────────────────────────┘
```

- Container: `rounded-full`, glass morphism background
- Items: `rounded-full`, `px-5 py-2`
- Active state: Black fill, white text, `scale-105`, elevated shadow
- Inactive state: Transparent, muted text (`text-black/50`)
- Status dot: Cyan with pulse animation and glow

### Content Flow
```
[Fixed Nav Header]
[Top Fade Mask]

        ┌──────────────────────────┐
        │    Section Header        │
        │    (uppercase, muted)    │
        │                          │
        │    Paragraph content     │
        │    with relaxed leading  │
        │    and soft color        │
        │                          │
        │         ···              │
        │                          │
        │    [Vertical Line]       │
        │    FOOTER LABEL          │
        │    VERSION_TAG           │
        └──────────────────────────┘

[Bottom Fade Mask]
```

### Decorative Footer
```css
/* Vertical fade line */
width: 1px;
height: 96px;
background: linear-gradient(to bottom, black, transparent);
margin-bottom: 32px;
```

---

## Animation

### Entry Animation (Header)
```css
animation: fade-in, slide-in-from-top-4;
duration: 1000ms;
```

### Micro-interactions
- Navigation hover: `transition-all duration-300`
- Background color: `transition: background-color 0.5s ease`
- Button transforms: Smooth scale transitions

---

## Design Tokens Summary

```css
:root {
  /* Colors */
  --color-bg: #e5f3f3;
  --color-surface: rgba(255,255,255,0.4);
  --color-text-primary: #000000;
  --color-text-muted: rgba(0,0,0,0.5);
  --color-text-body: rgba(115,115,115,0.9);
  --color-accent: #06b6d4;

  /* Typography */
  --font-family: 'IBM Plex Mono', monospace;
  --tracking-wide: 0.2em;
  --tracking-wider: 1em;

  /* Spacing */
  --space-section: 80px;
  --space-paragraph: 32px;
  --container-max: 672px;

  /* Effects */
  --blur-ambient: 120px;
  --blur-glass: 64px;
  --transition-default: 300ms;
}
```

---

## Usage Guidelines

### Do
- Use transparency to create depth, not decoration
- Let content breathe with generous whitespace
- Apply uppercase treatment only to labels and navigation
- Keep body text at low contrast for calm reading
- Use blur effects to create atmosphere

### Don't
- Add hard borders or sharp shadows
- Use saturated colors in large areas
- Create high-contrast body text
- Add decorative elements that compete for attention
- Use multiple typefaces

---

## Mood Keywords

*Ethereal • Calm • Technical • Atmospheric • Soft • Minimal • Focused • Laboratory • Ambient • Liquid*
