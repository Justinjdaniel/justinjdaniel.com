# Bolt's Journal: Performance-Obsessed Agentic Learnings

## 2026-07-12 - Zero-Allocation Canvas Animation Loops
**Learning:** High-frequency animation loops (like requestAnimationFrame) in React components can quickly degrade performance and trigger Garbage Collection (GC) jank if they allocate objects or arrays on every frame. Common patterns like `{ ...circle }` cloning or `Array.prototype.splice` should be replaced with in-place mutations (e.g., reset properties on existing objects). Additionally, tab inactivity must always pause the loop using `document.hidden` to reduce CPU usage to 0% when the user is not actively viewing the site.
**Action:** Always optimize animation callbacks to run zero allocations, reuse existing objects, respect reduced-motion query configurations, and register clean background listeners.
