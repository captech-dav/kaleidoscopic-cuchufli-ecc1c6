# AGENTS.md

This document provides an overview of the project structure for developers and AI agents working on this codebase.

## Project Overview

A product marketing site built with TanStack Start and deployed on Netlify. Products are listed on the home page with individual detail pages.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
├── public/
│   ├── favicon.ico
│   └── placeholder.png
├── src/
│   ├── data/
│   │   └── products.ts        # Product catalog data
│   ├── routes/
│   │   ├── __root.tsx         # Root layout: global head/meta
│   │   ├── index.tsx          # Home page — product listing grid
│   │   └── products/
│   │       └── $productId.tsx # Product detail page
│   ├── router.tsx             # TanStack Router setup
│   └── styles.css             # Global styles (Tailwind + CSS vars)
├── netlify.toml               # Build command, publish dir, dev server config
├── vite.config.ts             # Vite + TanStack Start + Netlify adapter config
├── tsconfig.json              # TypeScript config — strict, @/* alias for src/*
└── package.json
```

## Key Concepts

### File-Based Routing (TanStack Router)

Routes are files in `src/routes/`:

- `__root.tsx` — root layout wrapping all pages
- `index.tsx` — matches `/`
- `products/$productId.tsx` — matches `/products/:productId`
- `api.*.ts` — server API endpoints

### Adding Products

Products are defined in `src/data/products.ts`. Each product has: `id`, `name`, `shortDescription`, `description`, `price`, `image`.

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite plugins: TanStack Start, Netlify adapter, Tailwind |
| `tsconfig.json` | TypeScript config with `@/*` path alias for `src/*` |
| `netlify.toml` | Build command (`vite build`), publish dir (`dist/client`) |

## Development Commands

```bash
npm run dev      # Start Vite dev server on port 3000
npm run build    # Production build
netlify dev      # Start with Netlify CLI (port 8888)
```

## Conventions

### Naming
- Components: PascalCase
- Utilities/hooks: camelCase
- Route files: kebab-case or TanStack router conventions

### Styling
- Tailwind CSS utility classes
- CSS variables for theme tokens in `styles.css`

### TypeScript
- Strict mode enabled
- Import paths use `@/` alias (maps to `src/`)
- Type-only imports with `type` keyword

## Non-Obvious Decisions

- The Netlify Vite plugin (`@netlify/vite-plugin-tanstack-start`) handles the SSR adapter for Netlify Functions — no manual function wiring needed.
- The `publish` directory is `dist/client` (not `dist`) because TanStack Start separates client and server bundles.
