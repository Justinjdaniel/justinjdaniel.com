# Overhaul Tasks

## Phase 1: Infrastructure & Setup
- [x] Create `AGENTS.md`
- [x] Create `SPECIFICATIONS.md`
- [x] Create `TASKS.md`

## Phase 2: Dependency Upgrades
- [x] Upgrade Next.js to 16.2.10
- [x] Upgrade React/React-DOM to 19+
- [ ] Upgrade Tailwind CSS to latest 4.x
- [x] Update other dependencies in `package.json`
- [x] Fix any immediate breaking changes/errors

## Phase 3: Blog & MDX Overhaul
- [x] Refactor `getBlogPosts` to be more efficient
- [x] Migrate `next-mdx-remote` to `@next/mdx` or latest pattern
- [x] Remove custom regex parsing if possible
- [x] Verify blog navigation and rendering

## Phase 4: Animation & Performance
- [x] Audit GSAP usage
- [x] Implement native alternatives where beneficial
- [x] Optimize home page performance

## Phase 5: Analytics Refactoring
- [x] Install `@next/third-parties`
- [x] Migrate GTM to `@next/third-parties`
- [x] Clean up existing analytics components

## Phase 6: Code Cleanup & Refactoring
- [ ] Reorganize file structure
- [ ] Remove stale/unwanted code
- [x] Update CI/CD workflows

## Phase 7: Final Validation
- [x] Run full E2E test suite
- [x] Performance audit
- [x] Final UI/UX check
