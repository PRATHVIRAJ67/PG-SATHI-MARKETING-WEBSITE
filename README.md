# PG Sathi website

Marketing site for PG Sathi: one page with features, how it works, pricing
and FAQ. Buttons send people to the owner dashboard to sign up.

Built with React, Vite and Tailwind CSS. Deployed as static files on
Cloudflare Workers, like the admin dashboard.

## Run it

Requires Node 20.19 or newer.

```bash
npm install
npm run dev        # http://localhost:5180
```

## Change things

- **Sign-up link, contact details, plans and prices:** `src/config.ts`.
  Fill in `CONTACT` (email, WhatsApp number with country code, phone) to show
  "WhatsApp us / Call us / Email us" buttons. Empty values stay hidden.
- **Text and sections:** `src/App.tsx`.
- **Screenshots:** `public/screens/`. They were taken from the real dashboard
  in demo mode (sample data) at 2880×1800. Replace a file with the same name
  to update it.

## Deploy

```bash
npm run deploy     # builds and uploads to Cloudflare (needs `npx wrangler login` once)
```

It is published as `pg-sathi-website` on your Cloudflare account. To use your
own domain (for example `pgsathi.in`), add it in Cloudflare → Workers →
pg-sathi-website → Settings → Domains & Routes.
