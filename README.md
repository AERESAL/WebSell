# WebSell

Marketing website for selling custom websites, built with Next.js and Tailwind CSS.

## Features

- Sales landing page with service packages
- Quote request form UI
- Nodemailer API endpoint at `/api/quote` for sending quote emails
- GitHub Pages deployment workflow for static export

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy environment values:
   ```bash
   cp .env.example .env.local
   ```
3. Set valid SMTP values in `.env.local`.
4. Run development server:
   ```bash
   npm run dev
   ```

## Nodemailer quote endpoint

`POST /api/quote` expects:

```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "company": "Company",
  "budget": "$1,000-$2,500",
  "message": "Need a 5 page business site"
}
```

Required environment variables:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `QUOTE_TO_EMAIL`

For GitHub Pages, set a repository variable named `NEXT_PUBLIC_QUOTE_ENDPOINT` to a hosted backend endpoint URL (the default `/api/quote` only works in environments that run the Next.js server runtime).

## Deploy to GitHub Pages

1. In repository **Settings > Pages**, set source to **GitHub Actions**.
2. Push to `main`.
3. The workflow `.github/workflows/deploy-pages.yml` builds and deploys the static `out/` export.
