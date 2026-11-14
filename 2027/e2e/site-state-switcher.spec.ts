import fs from "node:fs";
import { expect, test } from "./fixtures";
import type { SiteState } from "@/lib/site-state/types";

/**
 * The state this deployment starts in. `next dev` resolves `WEBSITE_STATE`
 * from the environment or `.env.local`; the Playwright process does not, so
 * mirror that resolution here.
 */
function resolveActiveState(): SiteState {
  const fromEnv = process.env.WEBSITE_STATE?.trim().toUpperCase();
  if (fromEnv) return fromEnv as SiteState;

  try {
    const envFile = fs.readFileSync(".env.local", "utf8");
    const value = envFile.match(/^WEBSITE_STATE=(\w+)/m)?.[1]?.toUpperCase();
    if (value) return value as SiteState;
  } catch {
    // No .env.local — fall back to the app default.
  }

  return "D";
}

const ACTIVE_STATE = resolveActiveState();

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
    // WEBSITE_STATE from the environment or .env.local
    expect(await siteStateSwitcher.currentState()).toBe(ACTIVE_STATE);
  });

  test("switching state updates the badge and feature-gated navigation", async ({
    homePage,
  }) => {
    const { siteStateSwitcher, page } = homePage;
    const eventInfoTrigger = page.getByRole("button", { name: "Event Info" });

    // "activities" feature (Event Info) is enabled from "A" onward, so it
    // is hidden while the site is "D" (Dormant).
    await siteStateSwitcher.selectState("D");
    expect(await siteStateSwitcher.currentState()).toBe("D");
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
