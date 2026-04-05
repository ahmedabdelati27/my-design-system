# My Design System

A component library and design token system for **منصة الصيانة**, built with **React 18 + TypeScript + Tailwind CSS + HeroUI**. All tokens are extracted directly from Figma and kept in sync with the source of truth.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Design Tokens](#design-tokens)
- [Components](#components)
  - [Button](#button)
  - [Input](#input)
  - [RadioButton](#radiobutton)
  - [Toggle](#toggle)
  - [Checkbox](#checkbox)
- [Storybook](#storybook)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

---

## Overview

This design system provides:

- **Design tokens** extracted from Figma — colors, typography, spacing, border radius, and border width — available as CSS custom properties and a typed TypeScript module.
- **React components** that implement the Figma spec pixel-perfectly, using HeroUI as an accessible base and our token system for all visual values.
- **Storybook** documentation showing every component variant, state, and interactive example.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + CSS Custom Properties |
| Component base | HeroUI 2 |
| Build tool | Vite 5 |
| Documentation | Storybook 8 |
| Font | IBM Plex Sans Arabic |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install

```bash
git clone https://github.com/YOUR_USERNAME/my-design-system.git
cd my-design-system
npm install
```

### Run the dev app

```bash
npm run dev
```

Opens a component preview at `http://localhost:5173`.

### Run Storybook

```bash
npm run storybook
```

Opens the full component documentation at `http://localhost:6006`.

### Build

```bash
npm run build
```

---

## Design Tokens

All tokens live in `src/tokens/` and are synced from Figma.

### Available token files

| File | Description |
|---|---|
| `tokens.json` | Raw token values (source of truth) |
| `variables.css` | CSS custom properties (`--color-primary-500`, `--spacing-400`, …) |
| `index.ts` | Typed TypeScript exports |

### CSS custom properties

Import `variables.css` (already done in `src/index.css`) and use anywhere:

```css
.my-button {
  background-color: var(--color-surface-action-default); /* #007aff */
  border-radius: var(--radius-lg);                        /* 8px     */
  padding: var(--spacing-400);                            /* 16px    */
  font-size: var(--font-size-body1);                      /* 1rem    */
}
```

### TypeScript tokens

```tsx
import tokens, { colors, spacing, palette, borderRadius } from "@/tokens";

// Semantic color
console.log(colors.text.action);          // "#007aff"

// Palette scale
console.log(palette.primary[500]);        // "#007aff"

// Spacing
console.log(spacing[400]);                // "1rem"

// Border radius
console.log(borderRadius.lg);            // "0.5rem"
```

### Color groups

| Group | Purpose |
|---|---|
| `palette.primary` | Brand blue (50–900) |
| `palette.error` | Error / destructive (50–900) |
| `palette.success` | Success / positive (50–900) |
| `palette.warning` | Warning / caution (50–900) |
| `palette.info` | Informational (50–900) |
| `palette.neutrals` | Grays + white/black |
| `colors.text` | Semantic text colors |
| `colors.icon` | Semantic icon colors |
| `colors.surface` | Background surfaces |
| `colors.border` | Border colors |

---

## Components

All components are exported from `src/components/index.ts`:

```tsx
import { Button, Input, RadioButton, Toggle, Checkbox } from "@/components";
```

---

### Button

Three visual variants directly mapped from the Figma spec.

```tsx
import { Button } from "@/components";

// Solid (Default) — filled blue, primary action
<Button variant="solid">التالي</Button>

// Bordered (Secondary) — outlined blue
<Button variant="bordered">إلغاء</Button>

// Ghost — text only
<Button variant="ghost">رجوع</Button>

// Disabled
<Button variant="solid" isDisabled>إرسال</Button>

// With icons
<Button variant="solid" trailingIcon={<ArrowRightIcon />} leadingIcon={<ArrowLeftIcon />}>
  التالي
</Button>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"solid" \| "bordered" \| "ghost"` | `"solid"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height: 40 / 56 / 64 px |
| `isDisabled` | `boolean` | `false` | Disables interaction |
| `leadingIcon` | `ReactNode` | — | Icon on the leading side |
| `trailingIcon` | `ReactNode` | — | Icon on the trailing side |
| `onClick` | `() => void` | — | Click handler |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type |

---

### Input

Text field with five states matching the Figma spec.

```tsx
import { Input } from "@/components";

// Default
<Input label="البريد الإلكتروني" placeholder="example@email.com" />

// Error state
<Input
  label="كلمة المرور"
  isInvalid
  errorMessage="كلمة المرور غير صحيحة"
/>

// Disabled
<Input label="اسم المستخدم" isDisabled />

// Phone / Flag variant
<Input
  label="رقم الجوال"
  isPhoneInput
  phoneCode="+966"
  type="tel"
/>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label (Medium 16px) |
| `placeholder` | `string` | `"أدخل اسم الحقل"` | Placeholder text |
| `value` | `string` | — | Controlled value |
| `onChange` | `(v: string) => void` | — | Change handler |
| `isInvalid` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | — | Error text below field |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `helperText` | `string` | — | Helper text (right side) |
| `helperTextEnd` | `string` | — | Helper text (left side) |
| `isPhoneInput` | `boolean` | `false` | Flag / phone variant |
| `phoneCode` | `string` | `"+966"` | Country code in Flag variant |
| `leadingIcon` | `ReactNode` | — | Icon on the leading side |
| `trailingIcon` | `ReactNode` | — | Icon on the trailing side |

---

### RadioButton

Single radio control. Compose multiples with a shared `name` for mutual exclusion.

```tsx
import { RadioButton } from "@/components";

const [selected, setSelected] = useState("a");

<RadioButton
  id="opt-a"
  name="options"
  value="a"
  label="خيار أول"
  checked={selected === "a"}
  onChange={() => setSelected("a")}
/>
<RadioButton
  id="opt-b"
  name="options"
  value="b"
  label="خيار ثاني"
  checked={selected === "b"}
  onChange={() => setSelected("b")}
/>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Selected state |
| `onChange` | `(v: boolean) => void` | — | Change handler |
| `label` | `string` | — | Visible label |
| `id` | `string` | — | Ties label to input |
| `name` | `string` | — | Group name for mutual exclusion |
| `value` | `string` | — | Value submitted with a form |
| `isDisabled` | `boolean` | `false` | Disabled state |

---

### Toggle

On/off switch. 44×24 px pill, wraps HeroUI `Switch`.

```tsx
import { Toggle } from "@/components";

const [on, setOn] = useState(false);

<Toggle checked={on} onChange={setOn} label="تفعيل الإشعارات" />

// Label on the left (settings layout)
<Toggle checked={on} onChange={setOn} label="الوضع الداكن" labelPlacement="left" />
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | On/off state |
| `onChange` | `(v: boolean) => void` | — | Change handler |
| `label` | `string` | — | Visible label |
| `labelPlacement` | `"left" \| "right"` | `"right"` | Position of the label |
| `isDisabled` | `boolean` | `false` | Disabled state |

---

### Checkbox

24×24 px checkbox, 2 px border-radius. Wraps HeroUI `Checkbox`.

```tsx
import { Checkbox } from "@/components";

const [agreed, setAgreed] = useState(false);

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="أوافق على الشروط والأحكام"
/>

// Indeterminate (parent of a partial group)
<Checkbox isIndeterminate label="تحديد الكل" />
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Checked state |
| `onChange` | `(v: boolean) => void` | — | Change handler |
| `label` | `string` | — | Visible label |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `isIndeterminate` | `boolean` | `false` | Partial-selection state |
| `name` | `string` | — | Form field name |
| `value` | `string` | — | Form field value |

---

## Storybook

Every component has a full Storybook file with:

- **Playground** — interactive Controls panel for all props
- **All States** — every Figma state rendered side by side
- **Usage Examples** — realistic compositions (login form, settings list, permissions checklist, etc.)
- **Autodocs** — auto-generated props table from TypeScript types

```bash
npm run storybook
# http://localhost:6006
```

---

## Project Structure

```
my-design-system/
├── .storybook/
│   ├── main.ts          # Storybook config (Vite builder, addons, @ alias)
│   └── preview.tsx      # Global decorator: HeroUIProvider + RTL + font
│
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Component
│   │   │   ├── Button.stories.tsx  # Storybook stories
│   │   │   └── index.ts
│   │   ├── Input/
│   │   ├── RadioButton/
│   │   ├── Toggle/
│   │   ├── Checkbox/
│   │   └── index.ts                # Barrel export
│   │
│   ├── tokens/
│   │   ├── tokens.json             # Raw Figma tokens (source of truth)
│   │   ├── variables.css           # CSS custom properties
│   │   └── index.ts                # Typed TypeScript exports
│   │
│   ├── App.tsx                     # Component showcase / dev playground
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Tailwind directives + token import
│
├── tailwind.config.ts   # Configured with heroui() plugin
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Contributing

### Branching

```
main          — production-ready code
feature/*     — new components or features
fix/*         — bug fixes
tokens/*      — design token updates from Figma
```

### Adding a new component

1. Create `src/components/MyComponent/MyComponent.tsx` with a typed props interface.
2. Add a barrel `src/components/MyComponent/index.ts`.
3. Export from `src/components/index.ts`.
4. Create `src/components/MyComponent/MyComponent.stories.tsx` covering all variants, states, and a usage example.
5. Open a PR against `main`.

```tsx
// src/components/MyComponent/MyComponent.tsx
export interface MyComponentProps {
  // props here
}

export function MyComponent({ ...props }: MyComponentProps) {
  return <div>...</div>;
}

export default MyComponent;
```

### Updating design tokens

1. Open the Figma file and run the Figma MCP extraction script.
2. Update `src/tokens/tokens.json` with new values.
3. Regenerate `src/tokens/variables.css` and `src/tokens/index.ts`.
4. Open a PR with the branch prefix `tokens/`.

### Commit style

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add ghost variant
fix(input): correct error border color
tokens(colors): update primary palette from Figma
docs(checkbox): add indeterminate usage example
```

### Code standards

- TypeScript strict mode — no `any`.
- All visual values must come from `@/tokens` — no hardcoded hex colors.
- Every component needs a Storybook file before merging.
- Run `npm run lint` and `npx tsc --noEmit` before opening a PR.

---

## License

MIT
