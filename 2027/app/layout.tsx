import type { Metadata } from "next";
import { ThemeProvider } from "@/components/client/ThemeProvider";
import { SiteStateProvider } from "@/components/client/SiteStateProvider";
import { getActiveTheme, getActiveThemeKey } from "@/lib/theme/active-theme";
import { getSiteState } from "@/lib/site-state/get-site-state";
import { themeToCssVars } from "@/lib/theme/themes";
import "./globals.css";
import Header from "@/components/client/layout/Header";
import Footer from "@/components/client/layout/Footer";

export const metadata: Metadata = {
  title: "Borneo Anthro Hub 2027",
  description:
    "Borneo Anthro Hub 2027 — the anthro & furry fandom gathering in the heart of Borneo. Join the community for panels, art, dances, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeKey = getActiveThemeKey();
  const theme = getActiveTheme();
  const cssVars = themeToCssVars(theme);
  const siteState = getSiteState();

  return (
    <html
      lang="en"
      data-theme={themeKey}
      style={cssVars as React.CSSProperties}
      className="h-full font-sans antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {theme.fontUrl && (
          <>
            <link
              id="theme-font-link"
              rel="stylesheet"
              href={theme.fontUrl}
              media="print"
            />
            <noscript>
              <link rel="stylesheet" href={theme.fontUrl} />
            </noscript>
          </>
        )}
      </head>
      <body className="flex min-h-full flex-col">
        {/* Skip-to-content link for keyboard accessibility */}
        <a
          href="#main-content"
          className="focus:bg-background focus:text-foreground sr-only fixed left-4 z-50 rounded px-4 py-2 text-sm focus:not-sr-only focus:top-4 focus:block focus:ring-2 focus:ring-current"
        >
          Skip to content
        </a>
        <ThemeProvider themeKey={themeKey}>
          <SiteStateProvider siteState={siteState}>
            <div className="site-background border-border text-foreground bg-background flex min-h-screen w-full flex-col font-sans">
              <Header />
              <main id="main-content" className="flex w-full flex-1 flex-col">
                {children}
              </main>
              <Footer />
            </div>
          </SiteStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
