import { expect, test } from "./fixtures";

/**
 * Covers components/client/DevSiteStateSwitcher.tsx +
 * components/client/SiteStateProvider.tsx via the `homePage` fixture
 * (e2e/fixtures.ts), which composes the `DevSiteStateSwitcher` Page Object
 * (e2e/pages/dev-site-state-switcher.ts). The switcher is dev-only
 * (rendered when NODE_ENV === "development" in app/layout.tsx), which is
 * why these tests run against `pnpm dev` via the `webServer` config in
 * playwright.config.ts rather than a production build.
 *
 * `setState()` only updates client context (no cookie/API route in this
 * static-export app), so state changes are asserted via the badge text and
 * feature-gated navigation rather than a server-rendered attribute.
 */
test.describe("Dev site state switcher", () => {
  test("is visible and defaults to the active state", async ({ homePage }) => {
    const { siteStateSwitcher } = homePage;

    await expect(siteStateSwitcher.button).toBeVisible();
    // WEBSITE_STATE in .env.local
    expect(await siteStateSwitcher.currentState()).toBe("D");
  });

  test("switching state updates the badge and feature-gated navigation", async ({
    homePage,
  }) => {
    const { siteStateSwitcher, page } = homePage;
    // "activities" feature (Event Info) is enabled from "A" onward, so it
    // is hidden in the default "D" (Dormant) state.
    const eventInfoTrigger = page.getByRole("button", { name: "Event Info" });
    await expect(eventInfoTrigger).toHaveCount(0);

    await siteStateSwitcher.selectState("A");

    expect(await siteStateSwitcher.currentState()).toBe("A");
    await expect(eventInfoTrigger).toBeVisible();
  });

  test("lists every configured state as an option", async ({ homePage }) => {
    const optionValues = await homePage.siteStateSwitcher.optionValues();

    expect(optionValues.sort()).toEqual(
      ["D", "T", "A", "TO", "RC", "FIR"].sort(),
    );
  });
});
