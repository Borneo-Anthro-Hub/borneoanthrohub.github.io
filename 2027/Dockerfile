FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ---- deps: install dependencies with pnpm ----
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate \
 && pnpm install --frozen-lockfile

# ---- dev: used by docker-compose.dev.yml for hot reload ----
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# ---- builder: static export build (next.config.ts sets output: "export",
# the same static output GitHub Pages deploys — see .github/workflows) ----
FROM deps AS builder
ENV NODE_ENV=production
COPY . .
RUN corepack enable && corepack prepare pnpm@11.15.1 --activate \
 && pnpm build

# ---- runner: serve the static export with nginx (no Node server exists —
# output: "export" produces static files only, not a `.next/standalone`) ----
FROM nginxinc/nginx-unprivileged:alpine AS runner
COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
