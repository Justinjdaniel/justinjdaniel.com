# Copilot Instructions for AI Coding Agents

## Project Overview

- This is a personal portfolio and blog site built with **Next.js (App Router)**, using **Tailwind CSS** for styling and **MDX** for blog content.
- The codebase is modular, with reusable components in `app/_components/` and content in `content/`.
- Data flows are mostly static or file-based, with some dynamic API routes under `app/api/`.

## Key Directories & Patterns

- `app/` — Main Next.js app directory. Pages, layouts, and components are organized here.
  - `app/_components/` — All UI, layout, icons, blog, and utility components. Subfolders group related components (e.g., `blog/`, `layout/`, `icons/`).
  - `app/blog/` and `app/projects/` — Dynamic routes for blog and project pages. Slug-based routing is used for individual posts/projects.
  - `app/_data/` and `app/_db/` — Data helpers and mock DB logic for blog/projects. Used for view counts and metadata.
  - `content/` — Markdown/MDX files for blog posts. Each file is a post, with images in `public/images/blogs/`.
- `public/` — Static assets (images, fonts, icons).
- `lib/` — Utility libraries (e.g., Google Tag Manager integration).

## Developer Workflows

- **Local Development:**
  - Use `pnpm dev` or the VS Code task "Next.js: dev" to start the local server.
  - Open [http://localhost:3000](http://localhost:3000).
- **Build & Production:**
  - Use `pnpm build` or the "Next.js: build" task for production builds.
  - Docker support: Use the "Docker: build" and "Docker: run" tasks for containerized deployment.
- **Testing:**
  - Integration tests are in `tests/` (e.g., `blog-flow.integration.spec.ts`).
  - No test runner config is present; add one if expanding tests.

## Conventions & Patterns

- **Component Structure:**
  - Prefer colocating related components in subfolders under `app/_components/`.
  - Use descriptive, domain-specific names (e.g., `hero-section.js`, `blog-schema.js`).
- **MDX Content:**
  - Blog posts are written in MDX and imported via dynamic routes.
  - Images for posts are stored in `public/images/blogs/` and referenced by relative path.
- **API Routes:**
  - API endpoints (e.g., for view counts) are in `app/api/` and use Next.js route handlers.
- **Styling:**
  - Tailwind CSS is configured in `postcss.config.mjs` and used throughout components.
- **Metadata & SEO:**
  - Metadata for pages is managed in `app/lib/metadata.js` and related files.
  - Open Graph and sitemap logic is in `app/opengraph-image.js`, `app/sitemap.js`, etc.

## External Integrations

- **Google Tag Manager:** See `lib/gtm.js` and `app/_components/analytics/google-tag-manager.js`.
- **Microsoft Clarity:** See `app/_components/analytics/microsoft-clarity.js`.
- **Vercel:** Deployment is automated via GitHub Actions and Vercel (see badges in README).

## Example: Adding a Blog Post

1. Add an `.mdx` file to `content/`.
2. Add any images to `public/images/blogs/`.
3. The post will be available via `/blog/[slug]`.

## Tips for AI Agents

- Always check for existing components before creating new ones.
- Follow the folder structure and naming conventions for new features.
- Reference the README for setup and deployment details.
- When updating data logic, review `app/_db/` and `app/_data/` for patterns.

---

For questions or unclear conventions, ask for clarification or review recent commits for examples.
