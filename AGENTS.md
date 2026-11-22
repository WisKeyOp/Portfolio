# Portfolio — Agent Operating Guidelines & Security Boundaries

## Auth & Railway Operational Rules (Strict)

### 1. Auth & Architecture Invariants
- Portfolio is a high-performance static client application (React 19 + TypeScript + Vite + Tailwind CSS).
- Zero Auth Footprint: No server-side session management or client credentials required.
- Do not introduce client-side secrets or third-party auth SDKs unless explicitly mandated by an authenticated admin CMS requirement. If admin CMS is added, use Clerk or Better Auth BFF with `HttpOnly` cookies.
- Maintain a clean `.env.example` documenting any client-side build flags (`VITE_APP_*`). Never commit production analytics or service tokens.

### 2. Railway CLI Boundaries
- **NEVER** run `railway variables`, `env`, `printenv`, or `cat .env` to inspect secret values. Verify variable names strictly against `.env.example`.
- **NEVER** push or deploy directly to the `production` Railway environment without explicit human confirmation. Target `staging` or `dev` by default.
- Allowed Railway CLI commands: `railway status`, `railway logs`, `railway up --detach` (staging only).
- If deployment fails, inspect static build output and Nginx/Caddy container logs via `railway logs`.

### 3. Secret Injection Standard
- Inject build-time environment variables exclusively via Railway Dashboard variables or Project Tokens scoped to `dev`/`staging`.
