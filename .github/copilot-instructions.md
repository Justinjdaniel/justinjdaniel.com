# Copilot Instructions for AI Coding Agents

## Project Overview

- This is a personal portfolio and blog site built with **Next.js (App Router)**, using **Tailwind CSS** for styling and **MDX** for blog content.
- The codebase is modular, with reusable components in `src/components/` and content in `content/`.
- Data flows are mostly static or file-based, with some dynamic API routes under `src/app/api/`.

## Reusable AI Agentic Skills

This repository has 160+ reusable agentic skills installed under `.cursor/skills/`.
- Whenever you are working on a feature, bug fix, or review, check if there's a relevant skill playbook in `.cursor/skills/` (e.g., `performance-optimizer`, `api-endpoint-builder`, `debugging-and-error-recovery`).
- Use these playbooks to guide your development constraints, testing strategies, and outcome validation.

## Modern Web Guidance

We strictly adhere to the **Modern Web Guidance** (supported by Google Chrome and Microsoft Edge) to prefer high-performance, native web platform APIs and CSS-only behaviors over bloated JavaScript or heavy polyfills.
- **Search Guidance**: Run `npx modern-web-guidance search "<query>"` to look up standard modern patterns (e.g. Popover API, `<dialog>`, native entry/exit animations, etc.).
- **Retrieve Guides**: Run `npx modern-web-guidance retrieve <guide-id>` to get exact, expert-curated implementation patterns and progressive enhancement fallbacks.
- **Example Pattern**: The scroll-progress bar in `src/components/ui/scroll-progress.js` is built with a native `@supports (animation-timeline: scroll())` CSS timeline, utilizing a safe, lightweight scroll-listener fallback only when CSS timelines are unsupported.

## Key Directories & Patterns

- `src/app/` — Main Next.js app directory. Pages, layouts, and components are organized here.
- `src/components/` — All UI, layout, icons, blog, and utility components. Subfolders group related components (e.g., `blog/`, `layout/`, `icons/`, `sections/`, `ui/`).
- `content/` — Markdown/MDX files for blog posts.
- `public/` — Static assets (images, fonts, icons).
- `src/lib/` — Utility libraries and third-party integrations.

## Developer Workflows

- **Local Development:** `pnpm dev`
- **Build & Production:** `pnpm build`
- **Lint & Format:** `pnpm check`
- **Testing:** `pnpm test:e2e` (Playwright E2E tests under `tests/`)

## Conventions & Patterns

- **Component Structure:**
  - Prefer colocating related components in subfolders under `src/components/`.
  - Use descriptive, domain-specific names (e.g., `hero-section.js`, `blog-schema.js`).
- **MDX Content:**
  - Blog posts are written in MDX and imported via dynamic routes.
  - Images for posts are stored in `public/images/blogs/` and referenced by relative path.
- **API Routes:**
  - API endpoints (e.g., for view counts) are in `src/app/api/` and use Next.js route handlers.
- **Styling:**
  - Tailwind CSS 4 is configured CSS-first via `@import "tailwindcss";` in `src/app/globals.css`.
- **Metadata & SEO:**
  - Metadata for pages is managed dynamically.
- **Next.js 15/16 Routing Async Rule:**
  - In dynamic route segments and layouts, `params` and `searchParams` are Promises and must be explicitly awaited before accessing their keys.

---

For questions or unclear conventions, ask for clarification or review recent commits for examples.
