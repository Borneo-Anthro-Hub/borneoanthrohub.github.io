import type { Locator, Page } from "@playwright/test";
import { SITE_STATE_LABELS, type SiteState } from "@/lib/site-state/types";

/**
 * Component Object for the dev-only site state switcher widget
 * (components/client/DevSiteStateSwitcher.tsx). It is rendered on every
 * route while `NODE_ENV === "development"` (see app/layout.tsx), so any
 * Page Object can compose an instance of this alongside its own locators.
 *
 * `setState()` only updates client-side context — this app has no
 * cookie/API route wiring the state server-side (unlike the theme, there
 * is no `data-*` attribute on `<html>`), so state changes are asserted via
 * the badge text and feature-gated nav items instead.
 */
export class DevSiteStateSwitcher {
  /** The `<button aria-label="Switch site state">` element. */
  readonly button: Locator;
  /** The open dropdown container, scoped so page content isn't matched. */
  readonly menu: Locator;
  /** Reverse lookup: state label → state code. */
  private readonly labelToKey: Record<string, SiteState>;

  constructor(page: Page) {
    this.button = page.getByLabel("Switch site state");
    this.menu = page.getByTestId("site-state-switcher-menu");

    this.labelToKey = {} as Record<string, SiteState>;
    for (const [key, label] of Object.entries(SITE_STATE_LABELS)) {
      this.labelToKey[label] = key as SiteState;
    }
  }

  /** Open the dropdown and click the state option matching `state`. */
  async selectState(state: SiteState): Promise<void> {
    await this.button.click();
    await this.menu
      .getByText(SITE_STATE_LABELS[state], { exact: true })
      .click();
  }

  /**
   * Open the dropdown, read every state label visible there, close the
   * dropdown, and return the corresponding state codes in DOM order.
   */
  async optionValues(): Promise<string[]> {
    await this.button.click();

    // Build a regex matching every state label, e.g. /^(label1|label2|…)$/
    const pattern = new RegExp(
      `^(${Object.values(SITE_STATE_LABELS).join("|")})$`,
    );
    const optionLocator = this.menu.getByText(pattern);
    await optionLocator.first().waitFor();
    const texts = await optionLocator.allTextContents();

    // Close the dropdown by pressing Escape
    await this.button.page().keyboard.press("Escape");

    return texts.map((t) => String(this.labelToKey[t.trim()]));
  }

  /** Reads the current state code shown in the badge (e.g. "D"). */
  async currentState(): Promise<string> {
    return (await this.button.textContent())?.trim() ?? "";
  }
}
