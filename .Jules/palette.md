# Jules' Palette: Critical UX and Accessibility Findings

## 2026-07-12 - Canvas Animation Accessibility
- **Finding:** Ambient animations like the `Particles` component run continuously, consuming substantial CPU resources and posing potential distraction or vestibulopathic issues for users with sensitivity to motion.
- **Fix:** Respect `prefers-reduced-motion: reduce` CSS media queries at the JS level using `window.matchMedia` and completely halt high-frequency animation loops or avoid starting them if the user has requested reduced motion.
