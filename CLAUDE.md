# cvTools Frontend
Interface React pour un outil de gestion de candidatures (applications, contacts, skills).

## Tech Stack
- React 19 + TypeScript, Vite + SWC, Tailwind CSS
- TanStack React Query (server state), Zustand (global state)
- React Hook Form + Zod (formulaires), Axios (HTTP)
- Radix UI (primitives), i18next (i18n fr/en par défaut)
- pnpm (package manager)

## Commands
- `pnpm run dev` - Dev server
- `pnpm run build` - `tsc -b && vite build`
- `pnpm run lint` - ESLint
- `pnpm run preview` - Preview prod build

## Important Files
- `src/lib/axios/axios.ts` - Instance Axios avec intercepteur 401 (refresh token + redirect)
- `src/lib/tanstack-query/query-client.ts` - Config React Query (retry 4xx=non, 5xx=3x)
- `src/shared/hooks/useMe.ts` - Hook auth courant (query key `['me']`)
- `src/app/constants/routes.ts` - Définitions de routes centralisées (objet `ROUTES`)
- `src/app/constants/endpoints.ts` - Endpoints API centralisés (objet `ENDPOINTS`)
- `src/app/router/private-routes.tsx` - Wrapper routes protégées
- `src/app/i18n/index.ts` - Config i18next (namespaces: auth, common, application)
- `src/shared/types/` - Types partagés (IApiResponse, IUser, IApplication, etc.)

## Architecture

**Séparation obligatoire des composants :**
- `*.tsx` — composant logique (hooks, mutations, data fetching)
- `*.ui.tsx` — composant UI pur (JSX seulement, zéro hook)

**Couches API :**
```
composant → service (*.service.ts) → api (*.api.ts) → axios
```

## Rules

**CRITICAL — Séparation UI/Logic :**
- **NEVER** mettre des hooks (`useQuery`, `useMutation`, `useState`, etc.) dans un `*.ui.tsx`
- **ALWAYS** passer les données/callbacks en props depuis le `*.tsx` vers le `*.ui.tsx`

**Formulaires :**
- **NEVER** utiliser `useState` ou `<form>` natif pour les formulaires — **ALWAYS** React Hook Form + Zod
- Les schémas Zod s'écrivent comme fonction : `createXxxSchema(t: TFunction)` (pour l'i18n)
- Appliquer via `zodResolver(createXxxSchema(t))`
- Utiliser les composants `InputField`, `SelectField`, etc. de `src/shared/components/form/`

**Routing :**
- **NEVER** hardcoder des chemins de route (`"/auth/sign-in"`) — **ALWAYS** utiliser `ROUTES.xxx`
- **ALWAYS** utiliser `ENDPOINTS.xxx` pour les appels API (jamais de string en dur)

**HTTP & Data :**
- L'intercepteur Axios retourne `response.data` automatiquement — ne pas accéder à `.data` manuellement
- React Query pour tout le server state — pas de `useEffect` + `fetch`
- Le query key `['me']` est l'identité auth — effacé au logout et sur 401 non-récupérable

**i18n :**
- Langue par défaut : `'fr'` — les messages de validation doivent utiliser `t()`
- Namespaces : `auth`, `common`, `application`

**State :**
- Server state → React Query (`useQuery`, `useMutation`)
- Global UI state → Zustand
- Form state → React Hook Form
- Local UI state → `useState`
