# Getting Started

## Installation

```bash
npm install
npm run dev
```

## Structure

```
my-design-system/
├── src/
│   ├── components/     # Reusable UI components
│   ├── tokens/         # Design tokens (colors, spacing, typography)
│   └── App.tsx         # Component showcase / dev playground
├── docs/               # Documentation
└── ...config files
```

## Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Utility-first styling
- **HeroUI** — Component library
- **Vite** — Build tool

## Adding a Component

1. Create `src/components/MyComponent/MyComponent.tsx`
2. Export it from `src/components/MyComponent/index.ts`
3. Add a story or preview in `App.tsx`
