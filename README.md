# Student Hub

Student Hub is a polished, mobile-first Next.js application designed to centralize campus resources and utilities for students. It bundles a set of focused pages (Campus, Community, Study, Finance, Health, Laundry, Mess, Transport, Tools and Settings) inside a clean app shell with a responsive sidebar and mobile navigation.

Repository: https://github.com/abhinavsai2006/Student-Hub

Badges

- License: MIT

Why this project

- Helps students find day-to-day campus utilities quickly.
- Lightweight UI primitives for fast iteration and prototyping.
- Example project to demonstrate Next.js App Router + TypeScript.

Screenshots

- Replace these with real screenshots in `public/` and update the paths below.

- Desktop: ./public/screenshot-desktop.png
- Mobile: ./public/screenshot-mobile.png

Features

- Focused pages for typical campus needs (Study, Finance, Health, Transport, Laundry, Mess).
- Responsive layout: desktop sidebar and a mobile-friendly header + drawer.
- Reusable UI pieces: `AppShell`, `Navbar`, `Sidebar`, `Footer`, `Modal`, `Toaster`.
- Mock data layer for quick UI prototyping in `src/lib/mock-data.ts`.

Quickstart

Prerequisites

- Node.js 16 or newer
- npm, yarn, or pnpm

Install and run locally

```bash
cd student-hub
npm install
npm run dev
# or
yarn
yarn dev
```

Open http://localhost:3000 in your browser.

Build for production

```bash
npm run build
npm start
```

Common scripts

- `dev` — development server
- `build` — production build
- `start` — run the built app

Environment

- The project currently does not require special environment variables. If you add secrets, create a `.env.local` and add it to `.gitignore`.

Project layout

- `app/` — Next.js pages and layouts (App Router)
- `src/components/` — Layout and UI components
- `src/lib/` — Utilities and mock data
- `public/` — Static assets (images, icons)
- `tsconfig.json` — TypeScript configuration

Design & UX notes

- Keep navigation shallow — one or two levels only so students can find resources quickly.
- Use consistent spacing and typographic scale across pages.
- Provide accessible focus states and large touch targets for mobile users.

Accessibility

- Use semantic HTML (headings, lists, landmarks).
- Ensure interactive components are keyboard accessible.
- Provide alt text for images and meaningful labels for form controls.

Customization & Theming

- You can swap color tokens in `src/styles` or integrate Tailwind tokens if preferred.

Contributing

- Fork the repo and create a feature branch per change.
- Keep commits small and focused; open a PR describing the change.

Suggested next improvements (I can implement any of these):

- Add an expressive landing page with screenshots and feature highlights.
- Improve UI components (dark mode, animations, accessibility enhancements).
- Add GitHub Actions CI to run linting and type checks on PRs.

Publishing & Deployment

- Deploy to Vercel for instant production hosting (recommended for Next.js).

Contact

- For questions or help send a message in the repository Issues or tell me what you'd like me to change.

---

If you want, I will also:

- Add an `LICENSE` file (MIT) to this repository.
- Improve UI/UX in a separate branch and open a PR summarizing changes.
- Add a GitHub Actions workflow for CI.

Reply which of the above you'd like next and I'll proceed.
