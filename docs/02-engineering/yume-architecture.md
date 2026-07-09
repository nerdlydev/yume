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

Yume utilizes **Hono RPC** for end-to-end type safety instead of manual types or shared type packages.

```text
Frontend
↓
Hono RPC Client
↓
Hono Server
↓
Zod
↓
Service
↓
Repository
↓
Database
```

**Why Hono RPC?**
* **No handwritten API clients**: Eliminates drift between the server implementation and the client wrapper.
* **No duplicated request types**: Types flow natively from the backend route definitions.
* **Single source of truth**: End-to-end type safety out of the box with zero code generation steps compared to OpenAPI generation or tRPC.

## Shared Packages

Only reusable, cross-feature code belongs in shared packages (`packages/ui`, `packages/database`, `packages/validation`).
**Rule:** Never move code into packages because it "might" be shared. Extract only after genuine duplication exists.

### Architecture Decisions (ADR)

* **ADR-001**: Feature-first architecture
* **ADR-002**: Single PostgreSQL Database
* **ADR-003**: Modular Monolith
* **ADR-004**: Repository Pattern
* **ADR-005**: Hono RPC
* **ADR-006**: Shared Validation
* **ADR-007**: No Shared Types Package
