# Palette's Journal - Critical UX & Accessibility Learnings

This journal documents critical, non-obvious UX and accessibility insights discovered during development.

## 2025-02-14 - Prefers-Reduced-Motion Fallbacks with GSAP & CSS Scroll Snapping
**Learning:** Scroll snapping (`snap-y snap-mandatory`) and high-stagger text entrance animations (such as letter splitting via `SplitText` and typewriter effects) can cause discomfort, dizziness, or confusion for users with motion sensitivity or vestibular conditions. Simply disabling standard CSS transitions is not enough; dynamic JS animations must actively inspect media queries.
**Action:**
- Use Tailwind's native `motion-safe:` prefixes on scroll containers (e.g., `motion-safe:snap-y motion-safe:snap-mandatory`) and main layouts.
- In GSAP/JS effects, check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` on mount to instantly render final layouts/text instead of executing duration-based motion timelines.
