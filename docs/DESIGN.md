# Loci design language: the student's notebook

The app should feel like a well-loved study notebook, not a generic AI app. Light mode by default.

## Materials
- **Paper** `#FBF7EE` with blue ruled lines every 32 px and a red margin line. Every screen uses `<Paper>`.
- **Cards** are index cards (`#FFFEFA`) held on with **tape**, tilted −1.5° to 1.5°.
- **Sticky notes** (`#FFF3A6`) for tips and AI ideas.

## Ink and pens
- **Graphite ink** `#1F2430` for text and outlines; **pencil** `#5B606B` for secondary text.
- **Red pen** `#D2453B` only for grading: scores, ticks, corrections, timers running out.

## Highlighters carry meaning
| Colour | Hex | Meaning |
| --- | --- | --- |
| Yellow | `#FFE867` | Primary action, due today, the thing to look at |
| Green | `#B9F2C9` | Solid memory, the current location, correct |
| Pink | `#FFC2D1` | Fading memory, needs review |
| Blue | `#BFE0FF` | Neutral tag (e.g. "just for fun" goal) |

Highlights cover the **lower ~55%** of a line, slightly tilted, like a real marker stroke.

## Type
- **Kalam** (700) — headings, buttons, tabs.
- **Caveat** (500/700) — margin notes, scribbles, annotations, scores in red pen.
- **Atkinson Hyperlegible** — body text and anything longer than a line.

## Shapes
- Buttons: 2 px ink border, uneven corner radii (`sketchRadius`), a 3 px solid offset shadow.
  Pressed = shadow collapses and the button shifts 2 px.
- Checkboxes are wobbly squares; ticks are hand-drawn and overshoot the box.
- Icons are single-stroke, slightly imperfect paths (`HandIcon`).
- Streaks are tally marks; progress bars are pencil outlines filled with highlighter.

## Rules
- No emoji, gradients or glassmorphism.
- Touch targets ≥ 44 px. Body text ≥ 14 px. Ink on paper and on every highlighter passes WCAG AA.
- Tilt at most one or two elements per screen, or it reads as messy instead of personal.
