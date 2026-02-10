
# [React](https://react.dev/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/react.svg?style=flat)](https://www.npmjs.com/package/react) [![(Runtime) Build and Test](https://github.com/facebook/react/actions/workflows/runtime_build_and_test.yml/badge.svg)](https://github.com/facebook/react/actions/workflows/runtime_build_and_test.yml) [![(Compiler) TypeScript](https://github.com/facebook/react/actions/workflows/compiler_typescript.yml/badge.svg?branch=main)](https://github.com/facebook/react/actions/workflows/compiler_typescript.yml) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://legacy.reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

[React](https://react.dev/learn) is a JavaScript library for building user interfaces.



## Installation

---

### Package Manager

This project uses **pnpm** as the package manager. All commands should use `pnpm` instead of `npm` or `yarn`.

---

### Project Setup

```bash
$ pnpm install
```

### Compile and Run the Project

```bash
# development
$ pnpm run dev
```



## Development Conventions

### Project Structure

```
src/
├── app/                           
│   ├── layout/
│   ├── router/
│   ├── i18n/
│   ├── store/
│   └── constants/
│
├── lib/                            
│   ├── axios/              
│   ├── tanstack-query/
│   ├── api/                        
│   │   └── Auth/
│   │       └── auth.api.ts          
│   └── service/                   
│       └── Auth/
│           └── auth.service.ts      
│
├── modules/                        
│   └── auth/
│       ├── sign-in/
│       │   ├── sign-in.tsx          
│       │   ├── sign-in.ui.tsx       
│       │   └── types.ts            
│       ├── components/
│       ├── schema/
│       │   └── auth-schema.ts       
│       ├── store/
│       │   └── auth.store.ts        
│       └── types.ts                 
│
└── shared/                          
    ├── components/
    │   ├── ui/                      
    ├── hooks/
    ├── types/
    ├── constants/
    └── utils/               
```

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `app/` | Application config & infrastructure  | Layout, private routes, i18n config |
| `lib/` | External integrations & api layer & service layer  | (axios, TanStack Query, API calls)|
| `modules/` | Business modules organized by domain | auth (sign-in, sign-up, etc.) |
| `shared/` | Reusable components, hooks, types, utilities | UI components, custom hooks, shared types |

---

### Architecture Guidelines

#### Layer Rules

| Layer | File | Responsability 
|-------|------|------|
| **Component (UI)** | `*.ui.tsx` | Pure JSX, styling, props destructuring 
| **Logic** | `*.tsx` | Hooks, forms, mutations, state management 
| **Service** | `*.service.ts` | API abstraction, data transformation 
| **API** | `*.api.ts` | Direct HTTP calls via axios 
| **Store** | `*.store.ts` | Global state management (Zustand) 

---

#### Modules vs Shared

**`modules/`** - Domain-specific business features:
- Contains features organized by business domain
- Each module is self-contained with its own types, components, schemas
- Example: auth module with sign-in, sign-up, etc.

**`shared/`** - Technical reusable building blocks:
- UI primitives, form components, custom hooks
- Shared types, constants, utilities
- Used by multiple modules across the application

---

### Code Flow

```
User Action → Component (.ui.tsx) → Logic (.tsx) → Service → API → Backend
                                         ↓             ↓
                                      Schema        Store
```

**Explanation**:
- **Component** receives user action and calls logic layer
- **Logic** contains hooks, forms, mutations (TanStack Query)
- **Schema** validates data (Zod)
- **Service** transforms and abstracts API calls
- **API** performs HTTP calls (axios)
- **Store** manages global state (Zustand)
- **Backend** processes the request (NestJS)

---

### Naming Conventions

#### File Naming

```
sign-in.tsx              # Component (kebab-case)
sign-in.ui.tsx           # UI component (kebab-case + .ui)
types.ts                 # Module/feature types
auth.store.ts            # Store (exception: kebab.case.ts)
auth-schema.ts           # Schema (exception: kebab.case.ts)
auth.service.ts          # Service (exception: kebab.case.ts)
auth.api.ts              # API (exception: kebab.case.ts)
```

**Rules**:
- **Default**: Use `kebab-case.tsx` for components
- **Exceptions**: Use `kebab.case.ts` for: stores, schemas, services, APIs
- **UI Suffix**: Add `.ui.tsx` for pure presentation components

#### Folder Naming

- **Features**: kebab-case (`sign-in/`, `confirm-account/`)
- **Utility folders**: kebab-case (`layout/`, `router/`)
- **Modules**: kebab-case (`auth/`)

---

### Component Pattern (.tsx vs .ui.tsx)

This project follows a strict separation between business logic and presentation:

#### Business Logic (.tsx)

Contains all logic, hooks, state management, and data fetching:

```typescript
// component.tsx
export const Component = () => {
  // your logic business
  };

  return (
    <ComponentUi />
  );
};
```

#### UI Component (.ui.tsx)

Pure presentation - receives props and renders JSX only:

```typescript
// component.ui.tsx


export const ComponentUi = () => {
  return (
    //your ui and component
  );
};
```

---

### Typing Conventions

**Required prefixes:**
- `I` for interfaces: `ICreateUser`, `IApiResponse<T>`, `ISignInData`
- `T` for types: `TSortItem`, `TFilterOptions`

**File organization:**

| Location | Purpose | Examples |
|----------|---------|----------|
| `modules/*/types.ts` | Module-level types | `ISignInResponse`, `ISignUpParams` |
| `modules/*/feature/types.ts` | Feature-specific types | `ISignInData`, `IUseSignInReturn` |
| `shared/types/` | Cross-cutting shared types | `IApiResponse<T>`, `IUser` |

**Rules:**
- One `types.ts` file per module containing ALL module-level types
- One `types.ts` file per feature for feature-specific types
- Shared types go in `shared/types/` grouped by theme (`api.ts`, `entity.ts`, `form.ts`, `hook.ts`)
- No "Interface" or "Type" suffix in names (the I/T prefix is sufficient)

---

### Module Structure

A typical module follows this structure:

```
module/
├── types.ts                     # Module-level types (all module interfaces/types)
├── components/                  # Shared components for this module
│   ├── module-field.tsx
│   └── module-layout.tsx
├── schema/
│   └── module-schema.ts         # Zod validation schemas
├── store/
│   └── module.store.ts          # Zustand store for module state
│
├── feature-1/                   # Individual features
│   ├── feature.tsx              # Business logic (hooks, mutations, forms)
│   ├── feature.ui.tsx           # UI presentation (pure JSX)
│   └── types.ts                 # Feature-specific types
│
├── feature-2/
│   ├── feature.tsx
│   ├── feature.ui.tsx
│   └── types.ts
└── ...
```

**Example: auth Module**
```
auth/
├── types.ts                     # ISignInResponse, ISignUpParams, etc.
├── components/                  # auth-field.tsx, auth-layout.tsx, etc.
├── schema/
│   └── auth-schema.ts           # createSignInSchema(), createSignUpSchema()
├── store/
│   └── auth.store.ts            # authStore with setAuth(), resetAuth()
│
├── sign-in/
│   ├── sign-in.tsx
│   ├── sign-in.ui.tsx
│   └── types.ts
│
├── sign-up/
│   ├── sign-up.tsx
│   ├── sign-up.ui.tsx
│   └── types.ts
└── ...
```

---

### Commit Conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) specification.

**Format:** `<type>(<scope>): <description>`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```bash
feat: add JWT authentication
fix: resolve null pointer in sign-in component
docs: update README architecture section
refactor: separate UI and business logic in auth module
style: format code with prettier
chore: update dependencies
```

---

## Technology Stack

### Core
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### State Management
- **Zustand** - Global application state
- **TanStack React Query** - Server state management
- **React Hook Form** - Form state management

### Validation & Data
- **Zod** - Schema validation with i18n support

### HTTP & API
- **Axios** - HTTP client with interceptors
- Token refresh mechanism
- Automatic 401 error handling

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Radix UI components
- **Lucide React** - Icon library

### Internationalization
- **i18next** - i18n framework
- **react-i18next** - React integration
- Supports: French (fr), English (en)

### Routing
- **React Router v7** - Client-side routing

### Utilities
- **clsx** & **tailwind-merge** - Class name utilities
- **date-fns** - Date manipulation
- **React Toastify** - Toast notifications

---

## License

[Specify your license here]
