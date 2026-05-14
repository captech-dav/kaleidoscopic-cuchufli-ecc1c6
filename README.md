# Marketing Site

A product marketing site with an AI-powered assistant, built with TanStack Start and deployed on Netlify.

## Tech Stack

- **Framework**: TanStack Start (SSR, file-based routing)
- **Frontend**: React 19, TanStack Router
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5.7 (strict mode)
- **Deployment**: Netlify

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000) (or port 8888 via Netlify CLI).

To use the Netlify CLI for local development (recommended for Netlify features):

```bash
netlify dev
```

## Build

```bash
npm run build
```

Output is placed in `dist/client/`.

## Environment Variables

For AI features, set one of the following:

- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `OLLAMA_BASE_URL`
