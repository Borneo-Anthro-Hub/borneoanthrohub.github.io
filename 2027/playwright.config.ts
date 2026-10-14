import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E config. Tests live in `e2e/` and run against a dev server
 * (`pnpm dev`) that Playwright starts automatically - the dev-only
 * `DevThemeSwitcher` (see components/DevThemeSwitcher.tsx) is only rendered
 * when `NODE_ENV === "development"`, so E2E must run against `next dev`,
 * not a production build.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    // Full trace (needed for the UI mode timeline/snapshots) locally; leaner
    // on-first-retry in CI since passing runs don't need one.
    trace: process.env.CI ? "on-first-retry" : "on",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
