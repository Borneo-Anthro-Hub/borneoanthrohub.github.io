# CI/CD Pipeline — Frontend (2027)

## GitHub Pages deployment

The repository-level workflow at `../../../.github/workflows/deploy.yml` builds and
deploys the 2027 Next.js app to `https://borneoanthrohub.com/2027/`.

| Setting           | Value                                                         |
| ----------------- | ------------------------------------------------------------- |
| Trigger           | Push to `main` or manual `workflow_dispatch`                  |
| Runner            | `ubuntu-latest`                                               |
| Node.js           | 22                                                            |
| Package manager   | pnpm 11.15.1                                                  |
| Build directory   | `2027/`                                                       |
| Static export     | `2027/out/`                                                   |
| Next.js base path | `/2027`                                                       |
| Pages artifact    | Existing root and `2026/` site, plus the export under `2027/` |

The workflow installs dependencies using the checked-in lockfile, builds with
`NEXT_BASE_PATH=/2027`, assembles the Pages artifact while preserving the
existing root site, and deploys it with the GitHub Pages actions.

## Repository setup

In the repository's **Settings → Pages**, select **GitHub Actions** as the
build and deployment source. The workflow carries the root `CNAME` file into
the artifact so the existing custom domain remains configured.

## Local checks

Run these from the `2027/` directory:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm build
```

To verify the GitHub Pages export locally, set `NEXT_BASE_PATH=/2027` before
running `pnpm build`. The Docker image intentionally builds without a base path
because nginx serves that export from its web root.
