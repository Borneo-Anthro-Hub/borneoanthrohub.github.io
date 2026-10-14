import type { Locator, Page } from "@playwright/test";
import { themes, type ThemeKey } from "@/lib/theme/themes";

/**
 * Component Object for the dev-only theme switcher widget
 * (components/DevThemeSwitcher.tsx). It is rendered on every route while
 * `NODE_ENV === "development"` (see app/layout.tsx), so any Page Object can
 * compose an instance of this alongside its own locators instead of
 * duplicating selectors.
 *
 * The switcher is a custom button + dropdown (not a native `<select>`), so
 * interactions use click + text matching rather than `.selectOption()`.
 */
export class DevThemeSwitcher {
  /** The `<button aria-label="Switch theme">` element. */
  readonly button: Locator;
  /** The `<html data-theme="...">` element the provider writes to. */
  readonly html: Locator;
  /** The open dropdown container, scoped so page content isn't matched. */
  readonly menu: Locator;
  /** Reverse lookup: theme label → theme key. */
  private readonly labelToKey: Record<string, ThemeKey>;

  constructor(page: Page) {
    this.button = page.getByLabel("Switch theme");
    this.html = page.locator("html");
    this.menu = page.getByTestId("theme-switcher-menu");

    this.labelToKey = {} as Record<string, ThemeKey>;
    for (const [key, theme] of Object.entries(themes)) {
      this.labelToKey[theme.label] = key as ThemeKey;
    }
  }

  /** Open the dropdown and click the theme option matching `themeKey`. */
  async selectTheme(themeKey: ThemeKey): Promise<void> {
    await this.button.click();
    await this.menu.getByText(themes[themeKey].label, { exact: true }).click();
  }

  /**
   * Open the dropdown, read every theme label visible there, close the
   * dropdown, and return the corresponding theme keys in DOM order.
   */
  async optionValues(): Promise<string[]> {
    await this.button.click();

    // Build a regex matching every theme label, e.g. /^(label1|label2|…)$/
    const pattern = new RegExp(
      `^(${Object.values(themes)
        .map((t) => t.label)
        .join("|")})$`,
    );
    const optionLocator = this.menu.getByText(pattern);
    // allTextContents() does not auto-wait, so ensure the dropdown is
    // rendered before reading — see
    // https://playwright.dev/docs/api/class-locator#locator-all-text-contents
    await optionLocator.first().waitFor();
    const texts = await optionLocator.allTextContents();

    // Close the dropdown by pressing Escape
    await this.button.page().keyboard.press("Escape");

    return texts.map((t) => String(this.labelToKey[t.trim()]));
  }

  /** Reads a resolved `--css-var` value off the theme provider's `<html>` element. */
  async cssVariable(name: string): Promise<string> {
    return this.html.evaluate(
      (el, varName) => getComputedStyle(el).getPropertyValue(varName).trim(),
      name,
    );
  }
}
