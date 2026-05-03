# Under Grace

Under Grace is a simple daily mantra and inspired-action ritual app. It helps you begin the day with a mantra, choose one practical next right action, and close with a grounded evening reflection.

The app is intentionally simple: no backend, no account, no payments, and no claims of guaranteed outcomes. It stores your mantra, entries, theme, and settings locally in the browser.

## Features

- Today's editable mantra with reset-to-default
- Three-repeat morning ritual
- One saved next right action per day
- Evening reflection prompt
- Daily history grouped by date
- Streak count based on completed daily actions
- Light and dark mode
- Simple settings panel
- Local browser persistence with `localStorage`
- AI-powered mantra generation through a Vercel serverless API route
- Local mantra fallback if AI generation is unavailable

## Setup

Create an OpenAI API key from your OpenAI dashboard, then create a local environment file:

```bash
cp .env.local.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.local.example .env.local
```

Add your key to `.env.local`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

For production on Vercel, add `OPENAI_API_KEY` in:

```bash
Vercel Project Settings -> Environment Variables -> Production
```

Then install and run the app:

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal, usually:

```bash
http://localhost:5173
```

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run preview` previews the production build locally.

## AI Mantra Generation

The browser calls `/api/generate-mantra`, a Vercel serverless function that uses the OpenAI Responses API with `gpt-4.1-mini`. The OpenAI API key is read only from `process.env.OPENAI_API_KEY` on the server. Do not add OpenAI keys to client-side code or `VITE_` environment variables.

## Product Boundaries

Under Grace is a mindset and action ritual. It does not provide religious guidance, medical advice, financial advice, or guaranteed results. Its language is designed to support reflection, practical action, and calm follow-through.
