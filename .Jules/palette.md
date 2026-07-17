# Jules' Palette: Critical UX and Accessibility Findings

## 2026-07-12 - Canvas Animation Accessibility
- **Finding:** Ambient animations like the `Particles` component run continuously, consuming substantial CPU resources and posing potential distraction or vestibulopathic issues for users with sensitivity to motion.
- **Fix:** Respect `prefers-reduced-motion: reduce` CSS media queries at the JS level using `window.matchMedia` and completely halt high-frequency animation loops or avoid starting them if the user has requested reduced motion.

## 2026-07-17 - View Transitions Multi-element Conflict
- **Finding:** Applying a non-unique `view-transition-name` (such as `heading`) to broad selectors like `h1, h2, h3, h4` results in conflicts when multiple elements matching those selectors exist on the same page. This breaks browser View Transitions.
- **Fix:** Remove broad `view-transition-name` properties from general HTML elements and define unique, element-specific transition names (e.g., `project-title-${project.slug}`) to enable seamless and stable Shared Element Transitions.
