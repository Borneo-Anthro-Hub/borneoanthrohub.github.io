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
