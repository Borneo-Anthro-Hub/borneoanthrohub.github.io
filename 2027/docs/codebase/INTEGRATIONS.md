# External Integrations — Frontend (2027)

## Core Sections (Required)

### 1) Integration Inventory

| System                     | Type                   | Purpose                                                                                                                             | Auth model                      | Criticality     | Evidence                                                    |
| -------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | --------------- | ----------------------------------------------------------- |
| nginx reverse-proxy        | Proxy                  | Routes external traffic on port 82 to `b_nextjs:3000`; handles WebSocket upgrades, headers                                          | Network-level (Docker internal) | High            | `config/nginx/default.conf`                                 |
| Google Fonts               | External API           | Loads `Orbitron` font for the "cyberpunk" theme — not used with current active theme ("greyscale" uses system font)                 | None (public CDN)               | Low             | `web_client/2027/lib/theme/themes.ts` (`fontUrl` per theme) |
| Backend PHP API (Group B)  | API (planned)          | Future data endpoints for registration, schedule, dealers, accounts — `@tanstack/react-query` declared but not yet wired            | Not yet determined              | Low (not built) | `web_client/2027/package.json` (`@tanstack/react-query`)    |
| PostgreSQL (via PgBouncer) | Database               | Data persistence — `b_postgres` + `b_pgbouncer` exist in docker-compose but the frontend currently has no server-side data fetching | Docker secrets                  | Low (not built) | `docker-compose.yml` (Group B services)                     |
| Telegram OTP Bot           | External API (planned) | OTP-based authentication — `telegram_otp/` service exists but no frontend integration yet                                           | Bot token                       | Low (not built) | `telegram_otp/` directory                                   |

### 2) Data Stores

| Store                   | Role                                                                     | Access layer                                                          | Key risk                                                            | Evidence                                                    |
| ----------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| PostgreSQL (b_postgres) | Primary data store for client-facing data (registration, users, content) | Via b_php PHP backend → PgBouncer; frontend does not connect directly | No frontend API layer exists yet; data flow is entirely unspecified | `docker-compose.yml` (`b_postgres`, `b_pgbouncer`, `b_php`) |
| Redis (b_redis)         | Session cache / rate limiting                                            | Via b_php; frontend has no direct Redis access                        | [TODO] — no usage determined                                        | `docker-compose.yml` (`b_redis`)                            |

### 3) Secrets and Credentials Handling

- **Credential sources:** The frontend Docker container (`b_nextjs`) does not mount any Docker secrets. All credentials are managed server-side by the PHP backend containers and Docker Compose secrets.
- **Hardcoding checks:** No hardcoded credentials found in frontend source code.
- **Rotation or lifecycle notes:** No credentials are managed at the frontend level.

### 4) Reliability and Failure Behavior

- **Retry/backoff behavior:** `@tanstack/react-query` (declared in `package.json`) provides automatic retry + backoff — but no queries are configured yet.
- **Timeout policy:** `@tanstack/react-query` defaults apply (not configured).
- **Circuit-breaker or fallback behavior:** None implemented. The email sign-up form on the homepage currently shows a client-side toast (`Toast.useToastManager`) instead of calling any API — this is a placeholder, not a fallback strategy.

### 5) Observability for Integrations

- **Logging around external calls:** No external calls are made from the frontend yet. No logging or instrumentation exists.
- **Metrics/tracing coverage:** None.
- **Missing visibility gaps:** Complete gap — no APM, no logging, no error tracking. Error monitoring (e.g., Sentry) is not planned.

### 6) Evidence

- `config/nginx/default.conf` (reverse-proxy to b_nextjs)
- `docker-compose.yml` (services `b_nextjs`, `b_php`, `b_postgres`, `b_pgbouncer`, `b_redis`)
- `web_client/2027/package.json` (declared but unused API/state libraries)
- `web_client/2027/app/page.tsx` (local toast instead of API call)
- `web_client/2027/lib/theme/themes.ts` (Google Fonts URL)
