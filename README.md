# CDS Prototype

A Coursera prototype with **CDS (Coursera Design System)** styling. Pre-configured with Tailwind CSS v4, CDS tokens, and AI instruction files.

## Getting Started

```bash
npm install
npm run dev
```

Open the URL shown in terminal (usually http://localhost:5173) and edit `src/App.tsx` to start building.

## Add CDS to an Existing Prototype

If you want to add CDS to a different project instead:

1. Copy the `packages/cds-tailwind` folder into the root of your project
2. Tell your AI assistant:

> Add CDS styling to this project and migrate existing components to use CDS tokens. Follow the instructions in `cds-tailwind/SETUP-EXISTING.md`

That's it. The AI will add the CDS CSS file, set up the font, copy over the CDS convention files, and migrate all existing components to use CDS tokens — **without breaking your existing styling**.

### What this does

- Adds all CDS design tokens as CSS variables (`var(--cds-color-blue-700)`, etc.)
- Adds CDS typography classes (`cds-title-lg`, `cds-body-primary`, etc.)
- Copies AI instruction files so your assistant follows CDS conventions
- **Does NOT change** your existing Tailwind classes, spacing, or colors

### Full Tailwind v4 setup (advanced)

If you want to fully replace your Tailwind setup with CDS (resets all defaults, `p-8` = 8px), use:

> Set up CDS styling in this project. Follow the instructions in `cds-tailwind/SETUP.md`

**Warning:** This replaces your existing Tailwind configuration. Only use for projects where you want a clean CDS-only setup.

## What's Included

| File | Purpose |
|------|---------|
| `packages/cds-tailwind/` | CDS design tokens, AI instruction files, and setup scripts |
| `cds-styling-spec.md` | Component styling rules (buttons, inputs, dialogs, etc.) |
| `CLAUDE.md` | AI instructions for Claude Code |
| `.cursor/rules/cds.mdc` | AI instructions for Cursor |
| `src/App.tsx` | Starter app — edit this |
| `src/index.css` | Imports Tailwind + CDS |

## CDS Cheat Sheet

### Colors

Scales: `grey`, `blue`, `purple`, `green`, `red`, `yellow`, `pink`, `aqua` — weights 25 to 975.

```
bg-blue-700      → Primary action (#0056d2)
text-grey-975    → Body text (#0f1114)
text-grey-600    → Secondary text
border-grey-100  → Borders
bg-grey-25       → Page background
bg-white         → Surface/cards
```

### Spacing (numbers = pixels)

```
p-8   → 8px       gap-24 → 24px
p-16  → 16px      m-32   → 32px
```

CDS grid: 2, 4, 8, 12, 16, 24, 32, 48, 64, 80, 112

### Typography

```
cds-display        → 64px, semibold
cds-title-lg       → 48px, semibold
cds-title-md       → 36px, semibold
cds-title-sm       → 30px, semibold
cds-title-xs       → 24px, semibold
cds-subtitle-lg    → 20px, semibold
cds-body-primary   → 16px, normal
cds-body-secondary → 14px, normal
cds-action-primary → 16px, semibold
```

### Border Radius

```
rounded-4  → 4px      rounded-16 → 16px
rounded-8  → 8px      rounded-full → pill
```

### Shadows

```
shadow-elevation-1 → Cards
shadow-elevation-2 → Dropdowns
shadow-elevation-3 → Modals
```

## Component Reference

Visit the [CDS website](https://cds.coursera.org) for full component documentation.
