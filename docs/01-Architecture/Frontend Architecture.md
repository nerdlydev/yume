# Frontend Architecture

## Folder Structure
```text
apps/web
  src/
    features/
      companion/
      communities/
      discover/
      journey/
    shared/
    design-system/
    hooks/
    services/
    routes/
```

## State Ownership
- **TanStack Query** -> Server State
- **Zustand** -> UI State
- **TanStack Form** -> Forms
- **Zod** -> Validation

## Routing
- **TanStack Router**: Protected Routes, Public Routes, Role Based Routes, Layout Routes