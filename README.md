# Winshot Photography

Portfolio & booking website for **Winshot Photography** — world-class black-and-white portraiture, weddings and editorial work. Built with **React 19 + Vite + TypeScript + Tailwind CSS v4**. Built by **MAKOR STUDIO / EKO PIXELS**.

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run preview
npm run lint     # type-check
```

## Booking

The booking form dispatches to Formspree (set `VITE_FORMSPREE_ID`), offers instant WhatsApp confirmation, saves the lead to the studio inbox, and lets the client add the tentative session to **Google Calendar** or download an `.ics` file.

## Admin portal

Open `#admin` (e.g. `http://localhost:3000/#admin`).
Default password: `winshot2026` — change it under **Account** on first sign-in.

Dashboard, booking inquiries inbox, and editable site settings are included. Settings and inquiries are stored in the browser (localStorage) for now; moving them to a shared backend so leads reach the studio across devices is the next step.
