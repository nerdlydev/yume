# Yume API Standards

This document outlines the strict standards for backend-to-frontend communication in Yume using **Hono RPC**.

## The Dependency Chain

The request lifecycle from a frontend component to the backend database strictly follows this chain:

```text
Component
    ↓
React Query Hook
    ↓
Feature API Layer
    ↓
Shared Hono RPC Client
    ↓
Hono Server (API)
    ↓
Zod Validation
    ↓
Service
    ↓
Repository
    ↓
Database
```

## Backend API Standards

### 1. File Structure & Boundaries
The backend (`@yume/api`) must separate routing definitions from server execution.

```text
apps/api/src/
├── app.ts          # Initializes Hono, defines global middleware and base routes.
├── server.ts       # Starts the Bun server via `serve(app.fetch)`.
├── types.ts        # Exports `export type AppType = typeof app`.
└── index.ts        # The PUBLIC API of the backend package.
```

**Rule:** `index.ts` must **ONLY** export `AppType`.
```typescript
// apps/api/src/index.ts
export type { AppType } from './types';
```

### 2. Feature-Driven Routing
Do not write monolithic route files. Mount feature routes in the `app.ts`.

```typescript
// apps/api/src/modules/communities/routes.ts
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { createCommunitySchema } from '@yume/validation/communities/create';

export const communitiesRoutes = new Hono()
  .post(
    '/',
    zValidator('json', createCommunitySchema),
    async (c) => {
      // ... controller logic ...
      return c.json({ id: 1, name: 'Anime Lovers' });
    }
  );
```

```typescript
// apps/api/src/app.ts
import { Hono } from 'hono';
import { communitiesRoutes } from './modules/communities/routes';

export const app = new Hono().route('/communities', communitiesRoutes);
```

## Validation Standards

All input validation schemas belong in the shared `packages/validation` workspace.

### Feature-Based Organization
Do not create bloated, monolithic validation files. Organize them by feature:

```text
packages/validation/src/
├── communities/
│   ├── create.ts
│   └── update.ts
└── index.ts
```

Both the backend (using `zValidator`) and the frontend (using form validation or pre-flight checks) consume these exact same Zod schemas.

## Frontend API Standards

### 1. The Hono Client Singleton
The Hono RPC client is core frontend infrastructure and must be instantiated once.

```typescript
// apps/web/src/app/api/client.ts
import { hc } from 'hono/client';
import type { AppType } from '@yume/api';

export const apiClient = hc<AppType>(import.meta.env.VITE_API_URL);
```

**Rule:** Always use environment variables for the base URL. Never hardcode `/` or `http://localhost:3000`.

### 2. Feature API Isolation
Components and Hooks **must not** import `apiClient` directly. All network requests must be wrapped in a Feature API layer. This ensures that if the transport layer ever changes (or requires auth tokens/interceptors), it is centralized.

```typescript
// apps/web/src/features/communities/api/index.ts
import { apiClient } from '@/app/api/client';
import type { InferRequestType } from 'hono/client';

export const communityApi = {
  create: async (data: InferRequestType<typeof apiClient.communities.$post>['json']) => {
    const res = await apiClient.communities.$post({ json: data });
    
    if (!res.ok) {
        throw new Error("Failed to create community");
    }
    
    return res.json();
  }
};
```

### 3. TanStack Query Orchestration
Hooks handle the orchestration (caching, invalidation, retries) and call the Feature API layer.

```typescript
// apps/web/src/features/communities/hooks/useCreateCommunity.ts
import { useMutation } from '@tanstack/react-query';
import { communityApi } from '../api';

export function useCreateCommunity() {
  return useMutation({
    mutationFn: communityApi.create,
    onSuccess: () => {
      // toast, invalidate queries, etc.
    }
  });
}
```

## Anti-Patterns to Avoid

- ❌ **Direct Backend Imports:** The frontend should never import from `@yume/api/src/modules/...` or any server-specific logic.
- ❌ **Inline React Query in Components:** Do not use `useQuery({ queryFn: ... })` directly in `.tsx` components. Always extract it to a custom hook.
- ❌ **Manual DTOs/Interfaces:** Never write `interface CreateCommunityResponse {}` in the frontend. If inference fails, fix the backend route return type.
- ❌ **OpenAPI for Internal Usage:** We do not use OpenAPI or Swagger to generate internal frontend clients. OpenAPI will only be used when building external/public SDKs in the future.

## REST Conventions

While Hono RPC abstracts the raw HTTP requests, the backend routes must still adhere to proper RESTful design principles.

- **Endpoint naming**: Plural nouns, `kebab-case`.
- **HTTP Status Codes**:
  - `200 OK`: Successful read or update.
  - `201 Created`: Successful resource creation.
  - `204 No Content`: Successful deletion.
  - `400 Bad Request`: Validation failure.
  - `401 Unauthorized`: Missing or invalid authentication.
  - `403 Forbidden`: Authenticated, but lacking permissions.
  - `404 Not Found`: Resource does not exist.
  - `500 Internal Server Error`: Unhandled exception.
