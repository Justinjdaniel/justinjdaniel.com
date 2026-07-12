# Claude Code Rules (CLAUDE.md)

## 1. Reusable AI Agentic Skills
This repository has 160+ reusable agentic skills installed under `.cursor/skills/`.
- Always check the `.cursor/skills/` directory for any relevant skill playbooks (e.g. `performance-optimizer`, `api-endpoint-builder`, `debugging-and-error-recovery`).
- Use the playbooks in these directories to guide your development constraints, testing strategies, and outcome validation.

## 2. Modern Web Guidance
We strictly adhere to the **Modern Web Guidance** (supported by Google Chrome and Microsoft Edge) to prefer high-performance, native web platform APIs and CSS-only behaviors over bloated JavaScript or heavy polyfills.
- **Search Guidance**: Run `npx modern-web-guidance search "<query>"` to look up standard modern patterns (e.g. Popover API, `<dialog>`, native entry/exit animations, etc.).
- **Retrieve Guides**: Run `npx modern-web-guidance retrieve <guide-id>` to get exact, expert-curated implementation patterns and progressive enhancement fallbacks.
- **Implementation Rules**:
  - Favor native browser APIs and CSS (e.g. `@supports`, CSS-only transitions, container queries).
  - Add `aria-hidden="true"` to purely decorative visual components (e.g., scroll-progress bars).
  - Respect user motion preferences via the `prefers-reduced-motion` media query.

## 3. Tech Stack & Commands
- **Framework**: Next.js 16 (App Router), React 19.
- **Styling**: Tailwind CSS 4 (configured CSS-first in `src/app/globals.css`).
- **Database**: Lazy Neon/PostgreSQL connection. Bypass during builds via `DATABASE_URL=mock`.
- **Linter/Formatter**: Biome.js. Run `pnpm check` to lint/format.
- **Next.js Routing Rule**: In dynamic route segments and layouts, `params` and `searchParams` are Promises and must be explicitly awaited before accessing their keys.

### Essential Commands
- **Development**: `pnpm dev`
- **Build**: `pnpm build` (Uses `DATABASE_URL=mock` for static builds if DB is not available)
- **Check/Lint**: `pnpm check`
- **Format**: `pnpm format`
- **E2E Tests**: `pnpm test:e2e` (Playwright E2E tests under `tests/`)
