# Borneo Anthro Hub 2027

This Next.js app is exported as a static site and deployed to
`https://borneoanthrohub.com/2027/` by the repository-level GitHub Actions
workflow at `../.github/workflows/deploy.yml`. The workflow builds from this
directory with `NEXT_BASE_PATH=/2027` and combines the export with the existing
root and 2026 site before publishing to GitHub Pages.

## Local development

Install dependencies and start the development server from this directory:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). For a local static export
at the site root, run `pnpm build` without setting `NEXT_BASE_PATH`.

## GitHub Pages setup

In the repository's **Settings → Pages**, set the build and deployment source
to **GitHub Actions**. Push to `main` or run the workflow manually from the
Actions tab to publish the site. The workflow preserves the existing root and
2026 pages and deploys this app under `/2027/`.

The Docker image serves the static export from its web root; it is intended to
be used without a base path.

## Site configuration

Set these repository variables under **Settings → Secrets and variables →
Actions → Variables** before deploying:

- `SITE_THEME`: for example, `2027`.
- `WEBSITE_STATE`: for example, `A`.
- `NEXT_PUBLIC_TICKET_START`: the opening datetime with a timezone, for example
  `2026-11-22T23:00:00+08:00`.

The workflow requires all three values. They are baked into the static export,
so changing them requires a new deployment. For local development, set these
same variables in `.env.local` and restart the development server after editing
it. These configuration values are public; do not use them to store secrets.

## Ticket availability

The registration page listens to the existing `bah_ticket/status` Firestore
document in the `bah-ticket-status` project. Its `standard_soldout`,
`sponsor_soldout`, and `s_sponsor_soldout` boolean fields control the Wanderer,
Gardener, and Caretaker tiers respectively. The document must be readable by
site visitors. The `bah_ticket/reg_link` document supplies HTTPS URL strings
`std`, `s`, and `ss` for those same tiers. Both documents must be readable by
site visitors. The registration links remain unavailable until the countdown
has ended and the status and links have loaded.

Set `NEXT_PUBLIC_TICKET_START` to the opening date and time with a timezone;
replace the test date before launch. To test a one-minute countdown on each
page load, set `NEXT_PUBLIC_TICKET_TEST_SECONDS=60` in `.env.local`. Remove or
comment out that setting to use the opening date instead. The optional GitHub
Actions variable of the same name also enables this override in deployed builds;
leave it unset for the real launch.

The countdown uses the 2026 site's internet time service. If the time, status,
or links cannot be loaded, the page displays a warning. A browser countdown is
not an access control: Firestore rules and the forms themselves must enforce
any registration restrictions.
