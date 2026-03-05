# Student Hub

Student Hub is a modern, responsive Next.js app built to help students manage campus life — from study resources and campus events to finance, health, transport, laundry and more. It provides a clean app shell with a sidebar and mobile-friendly layout so students can quickly access the tools and resources they need.

## Demo

- Local: run the app and open http://localhost:3000

## Key Features

- **Campus:** Campus-specific pages and resources.
- **Community:** Connect with other students and view events.
- **Finance:** Track and access finance-related tools and links.
- **Health:** Quick access to health-related resources.
- **Laundry, Mess, Transport:** Utility pages for daily student needs.
- **Settings & Tools:** App settings and small utilities.
- **Responsive layout:** Desktop sidebar and a mobile-friendly shell.

## Project Structure

- `app/` — Next.js App Router pages and layout.
- `src/components/` — Reusable UI components: `AppShell`, `Navbar`, `Sidebar`, `Footer`, `Modal`, `Toaster`.
- `src/lib/` — Utilities and mock data.
- `src/types/` — TypeScript types.

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS (configured via `postcss` and `tailwind` in the project)

## Getting Started (Local)

Prerequisites:

- Node.js 16+ or newer
- npm, yarn or pnpm

Install dependencies and run the dev server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:

```bash
npm run build
npm start
```

## Development Notes

- Pages live under `app/` — edit `app/page.tsx` or nested pages (e.g. `app/study/page.tsx`) to change content.
- UI components live under `src/components/` and are organized by layout and ui primitives.
- Add or update mock data in `src/lib/mock-data.ts` when developing UI variations.

## Commit & Push (recommended commands)

If you want to push this project to your GitHub repository, run the following (adjust the remote URL if needed):

```bash
git init
git add .
git commit -m "chore: add Student Hub project and README"
git remote add origin https://github.com/abhinavsai2006/Student-Hub.git
git branch -M main
git push -u origin main
```

Note: GitHub authentication (PAT or SSH) will be required for `git push`.

## Contributing

Contributions are welcome — open issues or pull requests with improvements, design updates or bug fixes. Please follow the standard git flow: create a branch, make changes, open a PR.

## License

This repository does not include a LICENSE file. Add a license (e.g., MIT) if you want to make the project open source.

---

If you want, I can also:

- Add a `LICENSE` file (MIT).
- Create a GitHub Actions workflow for CI/deploy.
- Prepare example environment variables or sample data.

Tell me which of those you'd like next and I will proceed.
