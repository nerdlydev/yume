# Yume Design System

## 1. Principles
- **Native First:** If installed as a PWA, it should feel like an iOS/Android app, not a website.
- **Content First:** The UI never competes with content. Navigation and chrome stay subtle.
- **Motion with Purpose:** Animations communicate state changes, hierarchy, and continuity—not decoration.
- **Consistency Over Novelty:** If two components solve the same problem, they behave the same way. Reuse patterns before inventing new ones.

## 2. Design Language
- **Visual:** Calm, Minimal, Premium, Human, Soft, Friendly, Spacious. Not loud, neon, or corporate.
- **Motion:** Smooth, Intentional, Soft, Native, Responsive. Not flashy. Think iOS.
- **Shape:** Everything follows the same family (Buttons, Cards, Inputs, Bottom Sheets, Dialogs). Consistent radii.

## 3. Color Philosophy
We use semantic colors mapped to CSS variables (via daisyUI/Tailwind).
- `Primary`, `Secondary`, `Accent`
- `Base-100`, `Base-200`, `Base-300` (Surfaces)
- `Base-Content` (Text)
- `Info`, `Success`, `Warning`, `Error`

## 4. Typography
Defined in `index.css`. Used via Tailwind utilities.
- `.text-display`
- `.text-h1` through `.text-h3`
- `.text-title`
- `.text-body`
- `.text-caption`
- `.text-label`
- `.text-overline`

## 5. Spacing
Consistent spacing scale mapped in CSS (0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96).

## 6. Radius
- `xs` (4px), `sm` (8px), `md` (12px), `lg` (16px), `xl` (24px), `2xl` (32px), `full` (9999px).

## 7. Elevation (Shadows & Z-Index)
**Shadows (CSS):**
- `surface`, `card`, `floating`, `popover`, `modal`
**Z-Index (TS):**
- `base`, `sticky`, `dock`, `dropdown`, `sheet`, `dialog`, `toast`, `overlay`

## 8. Blur
Backdrop blurs for glassmorphism: `none`, `subtle`, `medium`, `strong`.

## 9. Motion
Centralized in `app/design/motion/`. Reusable tokens (SpringSnappy, SpringGentle, etc).

## 10. Breakpoints (Layout Modes)
Mapped in TS for conditional rendering.
- `Compact`: < 640px
- `Medium`: 640px - 1023px
- `Expanded`: 1024px - 1279px
- `Large`: >= 1280px

## 11. Iconography
Using Phosphor Icons. Only acceptable sizes: `16, 20, 24, 28, 32`.

## 12. Component States
Every interactive component must support:
`Default`, `Hover`, `Pressed`, `Focused`, `Disabled`, `Loading`, `Selected`, `Error`.

## 13. Accessibility Tokens
- **Focus Ring:** Must be highly visible (`focus-visible:ring`).
- **Minimum Tap Size:** 44px for interactive targets.
- **Contrast Rules:** Follow WCAG AA.
- **Keyboard Navigation:** Fully supported.
