# Yume Architecture

This document defines the architectural decisions, structure, and boundaries for Yume.

## High-Level Architecture

```text
Monorepo
↓
Applications (Frontend, Backend)
↓
Feature Modules
↓
Services & Repositories
↓
Database
```

Yume follows a **Feature-Driven Modular Architecture**.
Every folder should answer one question: **"Who owns this?"** Ownership eliminates confusion.

## Feature Module Architecture

A feature owns everything related to that business capability. Shared code should only be extracted when it is genuinely reused across multiple features.

### Backend Feature Module
Modules start simple (flat files). Only split into folders when complexity demands it.
```text
modules/
  companion/
    controller.ts
    service.ts
    repository.ts
    validators.ts
    dto.ts
    types.ts
    constants.ts
    utils.ts
    routes.ts
    index.ts
```

### Frontend Feature Module
```text
features/
  companion/
    components/   (Only React UI)
    hooks/        (Only React Hooks)
    api/          (Only Hono Client)
    schemas/      (Only Zod)
    types/        (Feature Types Only)
    utils/
    index.ts
```

### Module Boundaries & Dependency Graph

Features should not directly depend on the internals of one another.
If `Journey` needs functionality from `Identity`, it cannot import `Identity Repository`. Instead, `Journey Service` must import from `Identity Public API` (`@/modules/identity/index.ts`).
The dependency graph should always flow inward toward the domain.

## Request Lifecycle (Backend)

```text
Request → Route → Controller → Service → Repository → Database
```

* **Controllers coordinate**: They only validate requests, call services, and return responses.
* **Services orchestrate business logic**: Services contain domain rules and orchestrate domain services or repositories.
* **Repositories own persistence**: Repositories are responsible for queries, transactions, and persistence. Services call `Repository.beginTransaction()`. A controller or service should never call `db.transaction()` directly.

## Type-Safe Communication Strategy

Yume utilizes **Hono RPC** for end-to-end type safety instead of manual types, Swagger generation, or shared type packages. We treat Hono RPC as an **application communication strategy**, not just a library.

```text
Component
    ↓
React Query Hook
    ↓
Feature API Layer (index.ts)
    ↓
Shared Hono RPC Client (app/api/client.ts)
    ↓
Hono Server
    ↓
Zod Validation
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Strict API Boundaries
- **Backend Export:** The backend (`@yume/api`) must cleanly separate the application definition from server execution. It exports `export type AppType = typeof app` from a dedicated `types.ts` file.
- **Frontend Import:** The frontend **never** imports `server.ts`, `app.ts`, Controllers, Services, Repositories, Database context, or Schemas directly from the API. The frontend **only** imports `AppType` from `@yume/api`.
- **Validation Package:** Shared Zod schemas live in `packages/validation/`, organized by feature domain (e.g. `packages/validation/communities/create.ts`). Both the frontend (for forms) and backend (for `zValidator`) consume this package.

### Why Hono RPC?
* **No OpenAPI generation step**: Removes the overhead of running codegen scripts on every change.
* **No manual DTOs**: Zod schemas act as the single source of truth.
* **No duplicated request types**: Types flow natively from the backend route definitions.
* **No generated clients**: The client is a thin generic wrapper inferred via TypeScript.
* **Native TypeScript inference**: Zero runtime cost and instant compiler feedback.

### Hono RPC Limitations & The Future
Hono RPC only works **inside the monorepo** because both applications share TypeScript types. External clients (mobile apps, third-party integrations) cannot consume TypeScript types directly.

**Future Strategy:**
Today, we rely exclusively on Hono RPC for internal monorepo communication. Tomorrow, when we need to expose endpoints publicly, we will generate the OpenAPI spec from our Zod schemas -> Serve Swagger UI -> Generate a Public Mobile/Third-Party SDK. Hono RPC will remain the internal contract for Yume Web and Admin applications.

## Monorepo & Shared Packages

**A package exists to share a capability, not to organize code.**

Ask one question before creating a package: **Will this package be used by at least two applications?** (e.g., `web` and `api` and `admin`). If only one application uses something, it should not be a package.

### Approved Packages (Today)
- `packages/ui`: Shared presentation components (Button, Card, Dialog).
- `packages/database`: Owns the entire persistence layer (client, schema, relations, migrations).
- `packages/validation`: The single source of truth for Zod schemas shared by both frontend and backend.

### Forbidden Packages
- ❌ `packages/types`: Do not create a generic types package. Types should live with the thing that owns them (e.g., Database types in `packages/database`, validation types in `packages/validation`, local UI types in `features/`).
- ❌ `packages/utils`: Do not create a dumping ground for random helpers. Feature-specific utilities stay within their owning feature (`features/journey/utils/`).
- ❌ `packages/constants`: Constants belong to their respective features.
- ❌ `packages/auth`: Auth lives in the API. The frontend consumes it. No dedicated package needed today.
- ❌ `packages/logger`: Keep logging utilities inside the application (e.g., API).

### Public APIs
Packages must expose clean public APIs.
**Good**: `import { db } from "@yume/database"`
**Bad**: `import "../../packages/database/src/client"`

### Future Packages
Only create new packages (like `packages/config`, `packages/sdk`, `packages/email`) when the cross-application capability genuinely emerges.

### Architecture Decisions (ADR)

* **ADR-001**: Feature-first architecture
* **ADR-002**: Single PostgreSQL Database
* **ADR-003**: Modular Monolith
* **ADR-004**: Repository Pattern
* **ADR-005**: Hono RPC
* **ADR-006**: Shared Validation
* **ADR-007**: No Shared Types Package
