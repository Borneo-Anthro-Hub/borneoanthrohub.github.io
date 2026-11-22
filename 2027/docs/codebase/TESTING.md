# Testing Patterns — Frontend (2027)

## Core Sections (Required)

### 1) Test Stack and Commands

- **Primary test framework:** None configured right now.
- **Assertion/mocking tools:** None configured right now.
- **Commands:**
  ```bash
  # no automated test commands are currently defined
  ```
  Storybook is kept for manual visual QA of the theme engine:
  ```bash
  pnpm storybook
  pnpm build-storybook
  ```

### 2) Test Layout

- **Design pattern:** No automated test layout is in use.
- **Current Storybook scope:** only `components/client/DevThemeSwitcher.stories.tsx` is kept to review theme switching behavior.
- **Setup files and where they run:** Storybook config lives in `.storybook/`.

### 3) Test Scope Matrix

| Scope       | Covered? | Typical target | Notes                                 |
| ----------- | -------- | -------------- | ------------------------------------- |
| Unit        | No       | —              | No unit test runner configured        |
| Integration | No       | —              | No integration test runner configured |
| E2E         | No       | —              | No E2E test runner configured         |

### 4) Mocking and Isolation Strategy

- **Main mocking approach:** Not applicable (no automated tests).
- **Isolation guarantees:** Not applicable (no automated tests).
- **Common failure mode in tests:** Not applicable (no automated tests).

### 5) Coverage and Quality Signals

- **Coverage tool + threshold:** `[TODO]` — none configured.
- **Current reported coverage:** `[TODO]` — no coverage collection is configured.
- **Known gaps/flaky areas:** The entire app currently relies on manual QA.

### 6) Evidence

- `web_client/2027/package.json` (no test scripts; only `storybook` + `build-storybook`)
- `web_client/2027/.storybook/main.ts`
- `web_client/2027/components/client/DevThemeSwitcher.stories.tsx`
