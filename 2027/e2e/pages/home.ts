import type { Page } from "@playwright/test";
import { DevThemeSwitcher } from "./dev-theme-switcher";
import { DevSiteStateSwitcher } from "./dev-site-state-switcher";

/**
 * Page Object for the site's home page ("/"). Add locators/actions specific
 * to home-page content here; shared widgets (like the dev theme switcher)
 * should live in their own Component Object under `e2e/pages/` and be
 * composed in, as done below.
 */
export class HomePage {
  readonly page: Page;
  readonly themeSwitcher: DevThemeSwitcher;
  readonly siteStateSwitcher: DevSiteStateSwitcher;

  constructor(page: Page) {
    this.page = page;
    this.themeSwitcher = new DevThemeSwitcher(page);
    this.siteStateSwitcher = new DevSiteStateSwitcher(page);
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
  }
}
