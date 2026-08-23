# Barkly’s — Groom, Play & Stay

Fear-Free pet grooming, boarding, and daycare website for Charlotte, NC and surrounding towns.

## Stack

- TanStack Start (React)
- Tailwind CSS v4
- Vanilla client form handling (booking requests are reviewed manually)

## Local preview

The app is started with `npm run dev` and served for live preview.

## Vercel Deployment Notes

This is a static-feeling marketing site built on TanStack Start. Vercel can build it from GitHub.

### 1. Push to GitHub

Create a public repository (for example `barklys-website`) and push this project. Keep `package.json`, `vite.config.ts`, `src/`, and `public/` at the repo root.

### 2. Import the project on Vercel

1. Sign in at [vercel.com](https://vercel.com)
2. Click **Add New… → Project**
3. Import the GitHub repository
4. Framework preset: **Vite** (auto-detected)
5. Build command: `npm run build`
6. Output: leave default (Nitro / Vite handles it)
7. Click **Deploy**

### 3. Connect a custom domain

1. Open the project in Vercel
2. Go to **Settings → Domains**
3. Add your domain (example: `barklysclt.com` or `www.barklysclt.com`)
4. At your DNS provider, add the records Vercel shows (usually an `A` record for apex and `CNAME` for `www`)
5. Wait for SSL to provision (often a few minutes)

### 4. Booking form (optional)

The booking form currently confirms in the browser. To receive emails:

1. Create a form at [formspree.io](https://formspree.io)
2. Replace the submit handler in `src/routes/book.tsx` with a Formspree `action` URL
3. Redeploy

### 5. Environment

No secrets are required for the marketing site. Do not commit `.env` files.

## Contact

- Phone: (801) 696-6507
- Email: barklysclt@gmail.com
- Instagram & TikTok: @barklysclt
