# Code style for this project

This project uses JavaScript with the following styles:

- Follow Next.js best practices for file naming and routing conventions.
- Use camelCase for variables, PascalCase for components, and kebab-case for files.

## Next.js

- Uses Next.js version 15.3.0 or above.
- Follow Next.js page/layout naming conventions.
- Use route handlers for API endpoints.
- Utilize Next.js built-in components like Image, Link, and Script for optimal performance.
- Implement proper metadata using the Metadata API.
- Implement error boundaries and loading states using Next.js error.js and loading.js.
- Use React Suspense for client components when needed.
- Leverage Next.js Server Components by default, using the 'use client' directive only when client-side interactivity is required.
- Follow Next.js data fetching patterns, use server-side functions where possible, and implement proper caching strategies.
- Optimize images using the Next.js Image component with proper sizing and loading strategies.
- Implement responsive designs using Tailwind CSS.
- Use Next.js middleware for authentication and routing protection, along with proper error handling for API routes.

## React

- Follow React best practices: use hooks efficiently, implement proper prop validation, and maintain a clean component architecture.
- Use functional components and hooks instead of class components.
- Implement error boundaries at strategic component levels.
- Keep components small and focused on a single responsibility.
- Use proper TypeScript types/interfaces for props and state when applicable.

## Code Style

- Use Biome for formatting and linting as the primary toolchain.
- Use ESLint with recommended rules and Prettier as secondary options for consistent formatting.
- Follow SOLID principles and DRY (Don't Repeat Yourself) patterns.
- Write meaningful comments for complex logic and document public APIs.
- Use descriptive variable and function names that clearly explain their purpose.
- Keep functions pure and avoid side effects when possible.

## Performance

- Implement proper code splitting and lazy loading for optimal bundle size.
- **Leverage built-in browser APIs before using third-party libraries.** For instance, make full use of native options such as viewTransitions, scroll-driven animations, navigators, and service workers to achieve desired functionality before relying on external libraries.
- Use memoization (useMemo, useCallback) judiciously for expensive operations.
- Implement virtual scrolling for long lists when needed.
- Optimize re-renders by using proper key props and state management techniques.

## Testing

- Write unit tests for utilities and components using Jest and React Testing Library.
- Implement integration tests for critical user flows.
- Use snapshot testing for UI components.
- Follow the AAA (Arrange-Act-Assert) pattern in test cases.
- Maintain good test coverage for core functionality.

## Accessibility

- Follow WCAG guidelines for accessible web development.
- Use semantic HTML elements appropriately.
- Implement proper ARIA labels and roles where needed.
- Ensure keyboard navigation works correctly.
- Test with screen readers and accessibility tools.
