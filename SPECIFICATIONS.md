# Technical Specifications

## 1. Version Upgrades
- **Next.js**: 15.x -> 16.2.10 (Latest Stable)
- **React**: 19.x (Compatible with Next 16)
- **Tailwind CSS**: 4.x
- **Node.js**: 22.x+

## 2. Blog & MDX Overhaul
- **Current**: `next-mdx-remote`, custom regex frontmatter parser in `app/_db/blog.js`.
- **Target**: Utilize `@next/mdx` or latest standard for MDX rendering.
- **Goal**: Reduce overhead of manual parsing, improve build-time optimizations for blog posts.

## 3. Animation Strategy
- **Current**: GSAP with `ScrollSmoother` and `ScrollTrigger`.
- **Evaluation**: Check if GSAP is necessary. Native CSS `scroll-timeline` or View Transitions API might replace some complex logic. If kept, ensure it's the latest version and optimized for React 19.

## 4. Analytics
- **Integration**: Migrate to `@next/third-parties` for GTM.
- **Clarity**: Keep Microsoft Clarity but optimize loading strategy.
- **Vercel**: Keep Analytics and Speed Insights.

## 5. File Structure
- Move `app/_components` -> `components` (standard).
- Move `app/_utils` -> `lib/utils` or `utils`.
- Move `app/_db` -> `lib/db` or similar.
- Remove `_` prefix for internal folders unless they are specifically private folders in Next.js App Router (which `_components` usually is, but `components` in root is also common).

## 6. CI/CD
- Update GitHub Actions to use latest `actions/checkout`, `actions/setup-node`, etc.
- Ensure pnpm v10 compatibility.
