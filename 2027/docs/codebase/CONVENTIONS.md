# Coding Conventions — Frontend (2027)

## Core Sections (Required)

### 1) Naming Rules

| Item                     | Rule                                                                                                                            | Example                                                                                                              | Evidence                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Files (React components) | PascalCase — each component gets its own file                                                                                   | `ThemeProvider.tsx`, `PageHero.tsx`, `WireframeFrame.tsx`, `DevThemeSwitcher.tsx`                                    | `web_client/2027/components/`                                                                   |
| Files (pages)            | `page.tsx` — Next.js App Router convention; organised into route groups `(public)`, `(auth)`, `(attendee)`                      | `app/page.tsx`, `app/(public)/about/page.tsx`, `app/(auth)/login/page.tsx`                                           | `web_client/2027/app/`                                                                          |
| Files (config/lib)       | kebab-case for config files, camelCase for lib files                                                                            | `site-config.ts`, `postcss.config.mjs` (config); `themes.ts` (lib)                                                   | `web_client/2027/lib/`, `web_client/2027/`                                                      |
| Functions/methods        | camelCase — React components are PascalCase (component functions)                                                               | `getActiveTheme()`, `themeToCssVars()`, `scrollTo()`, `handleLogoClick()`, `closeMobile()`                           | `web_client/2027/lib/theme/themes.ts`, `web_client/2027/components/layout/Header.tsx`           |
| Types/interfaces         | PascalCase — prefixed consistently (`Theme`, `BrandTokens`, `SemanticTokens`, `ThemeKey`)                                       | `interface Theme`, `interface BrandTokens`, `export type ThemeKey`                                                   | `web_client/2027/lib/theme/themes.ts`                                                           |
| Props interfaces         | PascalCase — component name + `Props` suffix                                                                                    | `SectionProps`, `PageHeroProps`, `WireframeFrameProps`, `ComingSoonProps`, `ThemeContextValue`, `ThemeProviderProps` | `web_client/2027/components/layout/Section.tsx`, `web_client/2027/components/ThemeProvider.tsx` |
| Constants/env vars       | UPPER_SNAKE_CASE for exported constants                                                                                         | `ACTIVE_THEME`, `FONT_LINK_ID`                                                                                       | `web_client/2027/lib/theme/site-config.ts`, `web_client/2027/components/ThemeProvider.tsx`      |
| CSS custom properties    | `--kebab-case` — brand-prefixed (`--brand-*`), semantic (`--background`, `--primary`, etc.), and typography tokens (`--type-*`) | `--brand-bg`, `--brand-accent`, `--font-theme`, `--type-hero-h1-font-size`, `--type-body-s-font-weight`              | `web_client/2027/app/globals.css`, `web_client/2027/lib/theme/themes.ts`                        |

### 2) Formatting and Linting

- **Formatter:** Prettier 3.x — config at `web_client/2027/.prettierrc.json`. Settings: `semi: true`, `singleQuote: false`, `trailingComma: "all"`, `printWidth: 80`, `tabWidth: 2`. Uses `prettier-plugin-tailwindcss` for automatic Tailwind class sorting.
- **Linter:** ESLint 9.x (flat config) — config at `web_client/2027/eslint.config.mjs`. Extends `eslint-config-next` core-web-vitals + TypeScript rules, `eslint-plugin-react-hooks` v7 recommended preset (compiler-powered Rules of React diagnostics), plus `eslint-config-prettier` to disable formatting rules that conflict with Prettier.
- **Most relevant enforced rules:** Next.js core-web-vitals rules, TypeScript strict checks, compiler-powered React hooks rules (`set-state-in-render`, `set-state-in-effect`, `refs`, etc.), Prettier formatting compatibility.
- **Run commands:**
  ```bash
  pnpm lint              # ESLint check
  pnpm format            # Prettier write
  pnpm format:check      # Prettier check-only
  ```

### 3) Import and Module Conventions

- **Import grouping/order:** No explicit grouping rules configured (ESLint import plugin is not installed). Imports in practice follow: external deps → internal `@/` aliases → CSS.
- **Alias vs relative import policy:** All internal imports use the `@/*` path alias (maps to project root per `tsconfig.json` `paths`). No relative imports (`../../`) are used. Examples: `import Header from "@/components/layout/Header"`, `import { getActiveTheme } from "@/lib/theme/themes"`.
- **Public exports/barrel policy:** No barrel (`index.ts`) files found. Components and lib modules are imported directly from their defining files.

### 4) Typography System

- **Source of truth:** `web_client/2027/lib/theme/typography.json` — font families (+ loaded weights + Google Fonts stylesheet URL), the shared `lineHeight` (120%), the default `color` (BAH `neutral-950`) and every semantic variant. `lib/theme/themes.ts` builds the typed `TypographyTokens` and the theme's font stacks from it, and `app/globals.css` mirrors the same values as `:root` fallbacks for pre-hydration rendering.
- **Families:** Oleo Script 400/700 (hero), Margarine 400 (headings), Cause 400/600 (body), Poppins 500/700 (caption). Never substitute a similar-looking family — add the real face to `typography.json` instead.
- **Variants** (`--type-<variant>-{font-family,font-size,font-weight,line-height}`):

  | Variant        | Class                    | Family    | Size | Weight |
  | -------------- | ------------------------ | --------- | ---- | ------ |
  | Hero H1        | `.type-hero-h1`          | Oleo      | 56px | 700    |
  | Hero H3        | `.type-hero-h3`          | Oleo      | 40px | 700    |
  | Hero H4        | `.type-hero-h4`          | Oleo      | 32px | 400    |
  | Heading H3     | `.type-heading-h3`       | Margarine | 40px | 400    |
  | Heading H4     | `.type-heading-h4`       | Margarine | 32px | 400    |
  | Body L Semi    | `.type-body-l-semibold`  | Cause     | 18px | 600    |
  | Body L         | `.type-body-l`           | Cause     | 18px | 400    |
  | Body S Semi    | `.type-body-s-semibold`  | Cause     | 14px | 600    |
  | Body S         | `.type-body-s`           | Cause     | 14px | 400    |
  | Caption S Med  | `.type-caption-s-medium` | Poppins   | 12px | 500    |
  | Caption S Bold | `.type-caption-s-bold`   | Poppins   | 12px | 700    |

- **Usage:** apply `.type-*` (or the `font-display` / `font-heading` / `font-body` / `font-caption` Tailwind utilities for family only) instead of writing `font-family`, `font-size` or `font-weight` in components. Variants are visual only — pick the semantic element (`h1`–`h6`, `p`, `figcaption`, …) independently of the variant. Bare `h1`–`h4` already map to the hero/heading tokens.
- **Titles:** the design uses the hero face for headings — `h1` (page title) → Hero H1, `h2` (section banner/heading) → Hero H3 (Oleo 700), `h3`/`h4` (card or step title) → Hero H4 (Oleo 400). Margarine (Heading H3/H4) is used for sub-headers: the home tagline, the registration invitation board headings ("You have been invited!", "Hops to see you there!") and the Registration FAQ accordion questions (Margarine, 16–18px) — not for section or card titles. Keep each area's responsive `clamp()`/`text-*` size so layouts do not shift; the token supplies family, weight, line height and color.
- **Buttons:** every interactive label (pill CTAs, mini/card links, accordion triggers, action links, form and error buttons) uses the hero face as well — `font-display` on Tailwind components, or `var(--type-hero-h3-font-family)` / `var(--type-hero-h3-font-weight)` in plain CSS. Keep the control's own size, casing and padding.
- **Color:** tokens default to `--type-color` (BAH `neutral-950`, `#1E1A17`, for the 2027 theme). Override per element with a Tailwind `text-*` utility on inverted surfaces (footer, artwork banners) — utilities win over the `.type-*` components layer.

### 5) Color Palettes and Buttons

- **Palette source of truth:** `web_client/2027/lib/theme/palettes.ts` defines the BAH 2027 `50`–`950` scales (`natureGreen`, `sunshineYellow`, `floralPink`, `floralCoral`, `skyBlue`, `woodyEarth`, `neutral`) plus the two off-scale disabled colors. `paletteToCssVars()` injects them on `<html>`; `app/globals.css` aliases them to Tailwind tokens (`--color-floral-coral-500`), so components use `bg-floral-coral-500` / `text-woody-earth-700` / `ring-sunshine-yellow-500` and never raw hex.
- **Theme integration:** the `2027` theme in `lib/theme/themes.ts` reads palette values for its brand/semantic tokens. Add a new yearly theme by adding an entry there — do not duplicate palette hex in pages.
- **Button tokens:** `web_client/2027/lib/theme/button-tokens.ts` owns the `default` / `hover` / `focused` / `disabled` state map for every variant (`primary`, `secondary`, `links`, `accent`, `bahPrimary`, `bahSecondary`) and the `sm` / `md` sizes. Change button colors or states there, not in components.
- **Button components:** use `<BahButton>` (`components/ui/bah-button.tsx`) for native buttons; it supports `leadingIcon`, `trailingCaret`, and the Base UI `render` prop for links. For a Next.js `<Link>` styled as a button, use `themedButtonClasses(variant, { size, className })`. Both APIs share the same token map, so they cannot drift.
- **Subpage CTAs:** `components/server/themed/ThemedActionLink.tsx` (used by travel, venue, BAHjet guide, and other content pages) renders `bahPrimary` for the default tone and `bahSecondary` for `tone="inverse"` panels. Change those mappings there rather than restyling individual pages.
- **Accessibility:** every variant defines a `:focus-visible` ring and a disabled treatment; link-rendered buttons must also set `aria-disabled="true"` so the shared `aria-disabled:` styles apply.
- **Card surfaces:** `ThemedCard` (`.themed-card`), the home festival card (`.themed-paper-card`), the quick-link cards (`.themed-quick-card`) and the registration board share one inset "stitched" frame defined in `app/globals.css`. A plain CSS `dashed` border cannot control dash spacing, so the frame is a masked pseudo-element — tune it per surface with `--stitch-inset`, `--stitch-width`, `--stitch-dash`, `--stitch-gap`, `--stitch-radius` and `--stitch-color` instead of declaring another dashed border. Thickness, dash and gap are deliberately shared by every surface (one `clamp()` each) so frames never look mismatched across pages or viewports; a surface should only override the geometry knobs (`--stitch-inset`, `--stitch-radius`) to fit its own size.

### 6) Error and Logging Conventions

- **Error strategy by layer:** Client components use `throw new Error("message")` for invariant violations (e.g., `useTheme` throws if used outside `ThemeProvider`). The email capture currently has only lightweight local validation and no backend submission yet. Error boundaries are in place: `app/error.tsx` (segment-level), `app/global-error.tsx` (root layout), `app/not-found.tsx` (custom 404), plus route-group-level `error.tsx` files in `(public)/`, `(auth)/`, and `(attendee)/`.
- **Logging style and required context fields:** No logging library is configured. `console` is not used in production code. Dev-only component (`DevThemeSwitcher`) is gated by `process.env.NODE_ENV === "development"`.
- **Sensitive-data redaction rules:** No sensitive data handling exists yet — no API calls, no auth tokens, no forms submitting to a backend.

### 7) Testing Conventions

- **Test file naming/location rule:** No automated test suite is maintained right now.
- **Mocking strategy norm:** Not applicable until automated tests are reintroduced.
- **Coverage expectation:** No coverage collection is configured.

### 8) Memoization and Performance

- **Policy:** Do **not** use `useCallback`, `useMemo`, or `React.memo`. The React Compiler (`babel-plugin-react-compiler` 1.0.0, enabled via `next.config.ts` `reactCompiler: true`) automatically memoizes components and hooks at build time with greater precision than manual memoization.
- **Escape hatch:** If you genuinely need precise control over memoization (e.g., stabilizing a dependency for `useEffect`), `useMemo`/`useCallback` may still be used — but this should be the exception, not the rule.
- **Existing code:** Manual memoization was removed from `RegisterForm.tsx`, `Header.tsx`, and `SiteStateProvider.tsx`. If you encounter pre-compiler code in other files, remove it.

### 9) Evidence

- `web_client/2027/.prettierrc.json`
- `web_client/2027/eslint.config.mjs`
- `web_client/2027/tsconfig.json` (strict mode, path aliases)
- `web_client/2027/components/ThemeProvider.tsx` (error pattern)
- `web_client/2027/components/layout/Header.tsx` (naming conventions)
- `web_client/2027/lib/theme/themes.ts` (type/function naming)
- `web_client/2027/lib/theme/typography.json` (typography source of truth)
- `web_client/2027/lib/theme/palettes.ts` (BAH 2027 color scales)
- `web_client/2027/lib/theme/button-tokens.ts` (button variant/state tokens)
- `web_client/2027/app/globals.css` (CSS custom property naming)
