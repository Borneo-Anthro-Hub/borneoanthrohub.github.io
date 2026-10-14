# Testing Patterns — Frontend (2027)

## Core Sections (Required)

### 1) Test Stack and Commands

- **Primary test framework:** Playwright (`@playwright/test`), configured in `playwright.config.ts`.
- **Assertion/mocking tools:** Playwright's built-in `expect` / locator assertions. No other mocking library configured.
- **Commands:**
  ```bash
  pnpm test:e2e       # run all e2e tests headless
  pnpm test:e2e:ui    # run with the Playwright UI runner
  ```
  Playwright automatically boots `pnpm dev` (see `webServer` in `playwright.config.ts`) and runs tests against it, since dev-only UI (e.g. `DevThemeSwitcher`) only renders under `next dev`.

### 2) Test Layout

- **Design pattern:** [Page Object Model](https://playwright.dev/docs/pom). Spec files never call `page.locator(...)` / raw selectors directly - they consume Page Objects (and Component Objects, for widgets shared across pages, e.g. `DevThemeSwitcher`) through fixtures.
  - `e2e/pages/*.ts` — one class per page (`HomePage`) or shared component (`DevThemeSwitcher`). Locators are `readonly` public fields; behavior is exposed as async methods (`selectTheme()`, `cssVariable()`, ...). Page Objects compose Component Objects rather than duplicating their locators.
  - `e2e/fixtures.ts` — extends the base Playwright `test` with one fixture per Page Object (e.g. `homePage`), each fixture doing the `goto()` and any setup. Spec files must import `test`/`expect` from `./fixtures`, not `@playwright/test` directly, so every new page only needs to be wired up in one place.
  - `e2e/*.spec.ts` — test files. Import `{ test, expect } from "./fixtures"`, destructure the Page Object fixture(s) they need, and assert against the Page Object's locators/methods.
- **Test file placement pattern:** `e2e/*.spec.ts` at the project root (sibling of `app/`, `components/`); Page/Component Objects under `e2e/pages/`.
- **Naming convention:** spec files `<feature>.spec.ts` (e.g. `e2e/theme-switcher.spec.ts`); Page Objects `kebab-case.ts` exporting a `PascalCase` class (e.g. `e2e/pages/dev-theme-switcher.ts` exports `DevThemeSwitcher`).
- **Setup files and where they run:** `e2e/fixtures.ts` (fixture wiring) + `playwright.config.ts` (global `webServer`/project config). No other global setup exists.

### 3) Test Scope Matrix

| Scope       | Covered? | Typical target               | Notes                             |
| ----------- | -------- | ---------------------------- | --------------------------------- |
| Unit        | No       | —                            | No unit test runner configured    |
| Integration | No       | —                            | No API layer to test against      |
| E2E         | Yes      | `e2e/theme-switcher.spec.ts` | Playwright, chromium project only |

### 4) Mocking and Isolation Strategy

- **Main mocking approach:** None — tests run against the real dev server with no network/API mocking.
- **Isolation guarantees:** Each test gets a fresh Playwright page/context; no shared state between tests.
- **Common failure mode in tests:** Theme assertions rely on the active theme at dev-server start — by default this is `lib/theme/site-config.ts` `ACTIVE_THEME` (`greyscale`), but the `dev-theme` cookie (set by `DevThemeSwitcher` → `POST /api/dev/theme`) can override it. The E2E spec accounts for this by selecting a theme explicitly before asserting. Changing theme keys/colors in `lib/theme/themes.ts` without updating `e2e/theme-switcher.spec.ts` will break the tests.

### 5) Coverage and Quality Signals

- **Coverage tool + threshold:** `[TODO]` — none configured.
- **Current reported coverage:** `[TODO]` — no coverage collection for e2e tests.
- **Known gaps/flaky areas:** Only the dev theme switcher is covered. All other components, utilities, and future API integrations lack test coverage.

### 6) Evidence

- `web_client/2027/package.json` (`test:e2e`, `test:e2e:ui` scripts, `@playwright/test` devDependency)
- `web_client/2027/playwright.config.ts`
- `web_client/2027/e2e/fixtures.ts`
- `web_client/2027/e2e/pages/home.ts`, `e2e/pages/dev-theme-switcher.ts`
- `web_client/2027/e2e/theme-switcher.spec.ts`
