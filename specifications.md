# Technical Specifications & Project Definition

This document outlines the core technical specifications and foundational parameters of **justinjdaniel.com** as of July 2026.

## Tech Stack Overview

- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS v4 (CSS-first approach using `@import "tailwindcss"`).
- **Runtime Environment**: Node.js 22 (LTS).
- **Package Manager**: pnpm 10.x.
- **Linter & Formatter**: Biome as primary; Prettier as fallback for non-Biome-supported files (Markdown, HTML, YAML).

## CI/CD Workflows

The repository leverages GitHub Actions to maintain rigorous standards:
1. **Next.js CI (`build.yml`)**: Builds and verifies the application.
2. **Playwright E2E Tests (`playwright.yml`)**: Automates end-to-end browser user flows on all Pull Requests.
3. **Lighthouse CI (`lighthouse.yml`)**: Runs Lighthouse audits to protect Core Web Vitals (Performance, SEO, Best Practices, Accessibility).
4. **CodeQL Analysis (`codeql-analysis.yml`)**: Regularly audits the codebase for security vulnerabilities.
5. **Dependabot Auto-Merge (`dependabot-auto-merge.yml`)**: Automatically triggers safe, non-breaking dependency updates.

## Local Development Standards

All developers and AI assistants must follow these standards:
- Always run `pnpm run check` to verify linting and formatting before pushing.
- Always run `pnpm run test:e2e` locally to verify browser behaviors.
- Ensure new elements have precise ARIA roles and labels for high-quality accessibility.
