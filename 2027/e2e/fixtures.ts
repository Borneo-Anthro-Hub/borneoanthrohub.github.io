import { test as base } from "@playwright/test";
import { HomePage } from "./pages/home";

interface Fixtures {
  homePage: HomePage;
}

/**
 * Extends the base Playwright test with one fixture per Page Object.
 * Spec files must import `test`/`expect` from this file (not directly from
 * `@playwright/test`) and consume Page Objects via fixtures rather than
 * constructing them inline - this is the single place new pages get wired
 * up as the suite grows.
 */
export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
