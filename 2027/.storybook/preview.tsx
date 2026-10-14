import type { Preview } from "@storybook/nextjs-vite";
import React from "react";
import { ThemeProvider } from "../components/client/ThemeProvider";
import { themes, type ThemeKey } from "../lib/theme/themes";
import "../app/globals.css";

const themeKeys = Object.keys(themes) as ThemeKey[];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Most components use next/navigation (e.g. usePathname) - stub the
    // App Router context globally so those hooks don't throw.
    nextjs: {
      appDirectory: true,
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Site theme (see lib/theme/themes.ts)",
      toolbar: {
        icon: "paintbrush",
        items: themeKeys.map((key) => ({
          value: key,
          title: themes[key].label,
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "2026" satisfies ThemeKey,
  },
  decorators: [
    (Story, context) => {
      const themeKey = context.globals.theme as ThemeKey;
      return (
        // `key` forces a remount when the toolbar selection changes, so
        // ThemeProvider's effect re-applies CSS vars + font link.
        <ThemeProvider themeKey={themeKey} key={themeKey}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
