# Testing Workflow for Integration and E2E

This project uses [Playwright](https://playwright.dev/) for integration and end-to-end (E2E) testing.

## How to Run Playwright Tests

1. **Install dependencies** (if not already):

   ```bash
   pnpm install
   ```

   Or, if you prefer npm:

   ```bash
   npm install
   ```

2. **Install Playwright browsers** (required for first-time setup or after dependency updates):

   ```bash
   pnpm test:e2e:install
   ```

   Or, if you prefer npm:

   ```bash
   npx playwright install
   ```

3. **Build and start your Next.js app** (in a separate terminal):

   ```bash
   pnpm build
   pnpm start
   ```

   Or, for development mode:

   ```bash
   pnpm dev
   ```

4. **Run Playwright tests:**

   ```bash
   pnpm test:e2e
   ```

   This will execute all Playwright tests in the `tests/` directory (e.g., `tests/blog-flow.integration.spec.ts`).

5. **View Playwright HTML report:**
   After running tests, you can view a detailed report:

   ```bash
   pnpm test:e2e:report
   ```

## Scripts Added

- `test:e2e` – Runs all Playwright tests in the project (`pnpm test:e2e`).
- `test:e2e:report` – Opens the Playwright HTML report after a test run (`pnpm test:e2e:report`).
- `test:e2e:install` – Installs Playwright browsers (`pnpm test:e2e:install`).

## Test File Location

- Place integration/E2E tests in the `tests/` directory. Example: `tests/blog-flow.integration.spec.ts`

## Best Practices

- Follow the Arrange-Act-Assert (AAA) pattern in test cases.
- Use descriptive test names and keep tests focused on a single user flow.
- Ensure the app is running before executing Playwright tests.
- For CI/CD, ensure the server is started before running tests.

## References

- [Playwright Docs](https://playwright.dev/docs/intro)
- [Playwright Test CLI](https://playwright.dev/docs/test-cli)
