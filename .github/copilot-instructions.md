# Project Coding Standards & Copilot Instructions

## Testing & Quality Gates
- Write tests before code (TDD / Prove-It pattern).
- Prioritize Biome for fast, deterministic linting and formatting. Use Prettier for file types Biome doesn't support (Markdown, YAML, HTML).
- Test hierarchy: unit > integration > E2E (Playwright). Use the lowest level possible.
- Run `pnpm run check` and `pnpm run test:e2e` to verify your changes.

## Specialized Agent Personas
You can invoke the following specialized agents in Copilot Chat for targeted review workflows:
- `@code-reviewer`: Review pull requests or code segments across correctness, readability, architecture, security, and performance.
- `@test-engineer`: Audit test suites, coverage, and verify that the "Prove-It" pattern is followed.
- `@security-auditor`: Inspect application endpoints, database queries, and inputs/outputs for OWASP vulnerabilities.

## Code Quality Standards
- No secrets in code or version control. Use `.env.example` as a template.
- Build in thin, vertical slices. Each slice should implement, test, verify, and commit separately.
- Never mix formatting changes with behavioral changes.
- Ensure proper ARIA labels and focus states/keyboard accessibility on all UI features.
