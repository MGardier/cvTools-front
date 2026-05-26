# cvTools Frontend
React interface for a job application management tool (applications, contacts, skills).

## Tech Stack
- React 19 + TypeScript, Vite + SWC, Tailwind CSS
- TanStack React Query (server state), Zustand (global state)
- React Hook Form + Zod (forms), Axios (HTTP)
- Radix UI (primitives), i18next (i18n fr/en, default fr)
- pnpm (package manager)

## Commands
- `pnpm run dev` - Dev server
- `pnpm run build` - `tsc -b && vite build`
- `pnpm run lint` - ESLint
- `pnpm run preview` - Preview prod build
- `pnpm run analyze` - Build with bundle visualizer (opens `dist/stats.html`)

## Important Files
- `src/lib/axios/axios.ts` - Axios instance with 401 interceptor (refresh token + redirect)
- `src/lib/tanstack-query/query-client.ts` - React Query config (retry 4xx=no, 5xx=3x)
- `src/shared/hooks/useMe.ts` - Current auth hook (query key `['me']`)
- `src/app/constants/routes.ts` - Centralized route definitions (`ROUTES` object)
- `src/app/constants/endpoints.ts` - Centralized API endpoints (`ENDPOINTS` object)
- `src/app/router/private-routes.tsx` - Protected routes wrapper
- `src/app/i18n/index.ts` - i18next config (namespaces: auth, common, application)
- `src/shared/types/` - Shared types (IApiResponse, IUser, IApplication, etc.)

## Architecture

**Mandatory component separation:**
- `*.tsx` — logic component (hooks, mutations, data fetching)
- `*.ui.tsx` — pure UI component (JSX only, zero hooks)

**API layers:**
```
component → service (*.service.ts) → api (*.api.ts) → axios
```

## Rules

**CRITICAL — UI/Logic separation:**
- **NEVER** put hooks (`useQuery`, `useMutation`, `useState`, etc.) inside a `*.ui.tsx`
- **ALWAYS** pass data/callbacks as props from the `*.tsx` to the `*.ui.tsx`

**Forms:**
- **NEVER** use `useState` or a native `<form>` for forms — **ALWAYS** React Hook Form + Zod
- Zod schemas are written as functions: `createXxxSchema(t: TFunction)` (for i18n)
- Apply via `zodResolver(createXxxSchema(t))`
- Use the `InputField`, `SelectField`, etc. components from `src/shared/components/form/`

**Routing:**
- **NEVER** hardcode route paths (`"/auth/sign-in"`) — **ALWAYS** use `ROUTES.xxx`
- **ALWAYS** use `ENDPOINTS.xxx` for API calls (never a raw string)

**HTTP & Data:**
- The Axios interceptor returns `response.data` automatically — do not access `.data` manually
- React Query for all server state — no `useEffect` + `fetch`
- The `['me']` query key is the auth identity — cleared on logout and on unrecoverable 401

**i18n:**
- Default language: `'fr'` — validation messages must use `t()`
- Namespaces: `auth`, `common`, `application`

**State:**
- Server state → React Query (`useQuery`, `useMutation`)
- Global UI state → Zustand
- Form state → React Hook Form
- Local UI state → `useState`

**Lazy loading:**
- **ALWAYS** lazy-load route components via `lazyNamed()` (`src/shared/utils/lazy.ts`) — except `HomePage`, which stays static to avoid the initial-load flash
- `RouteLoader` (`src/shared/components/route-loader.tsx`) is the global Suspense fallback, placed in `App.tsx`
- `ErrorBoundary` + `ChunkErrorFallback` wrap the root Suspense — they catch `ChunkLoadError` after a deployment and prompt for a reload
- Also lazy-load heavy components that are not visible upfront: `MinimalTiptapEditor`, `Calendar` (date pickers), modals (Url/Contact/Skill). Rendering stays unconditional (`<Suspense><Modal open={open} /></Suspense>`) — Radix handles the open/close lifecycle
- Run `pnpm analyze` after adding any heavy dependency to check the bundle
