# Yume Database Design

This document covers everything related to database architecture, design, and management for Yume.

## Database Principles

Every table should answer these six questions:
1. Which business domain owns me?
2. What real-world concept do I represent?
3. Which aggregate is my parent?
4. Who is allowed to modify me?
5. Which foreign keys define my relationships?
6. Can this table exist independently?

## Domain-First Design

**Identify the business domain first, then identify entities.**
Yume is Domain Driven. The domain owns the tables, not the other way around.

Example:
```text
Journey Domain
↓
Journey Entry
Journey Collection
Shared Memory
```

## Ownership Rules

Every table belongs to exactly one bounded context (business domain).
For example, `Journey` owns `journey_entries`. `Experience` should never modify `journey_entries` directly.

**Module Ownership**: 
In `packages/database/schema/journey.ts`, only `Journey` owns those tables. No other schema file should define Journey tables.

## Naming Conventions

- **Tables**: `snake_case`, pluralized (e.g., `users`, `communities`, `journey_entries`).
- **Columns**: `snake_case`.
- **Foreign Keys**: `[singular_table_name]_id` (e.g., `user_id`, `community_id`, `experience_id`).
- **Junction Tables**: Alphabetical combination of the two tables (e.g., `community_members`, `experience_participants`).

## Identifiers (UUID Strategy)

Yume uses **UUID v7** everywhere. No exceptions.
Do not use sequential integers (serial) or UUID v4 for primary keys.

## Relationships

### One-to-One / One-to-Many
Use explicit foreign keys. Never rely on application-level enforcement for relational integrity.

### Many-to-Many (Junction Tables)
Always use explicit junction tables.
Example: `users` → `community_members` → `communities`.
Never use JSONB arrays (e.g., `users.community_ids`) to map many-to-many relationships.

## ON DELETE Strategy

Not every foreign key should cascade. Define the strategy deliberately:
- **CASCADE**: When the parent record is deleted, delete the child (e.g., delete a community, delete its posts).
- **RESTRICT**: Prevent deletion of the parent if children exist (e.g., cannot delete a category if items still reference it).
- **SET NULL**: Clear the reference without deleting the child (e.g., deleting a user but keeping their public journey, just setting `user_id` to null).

## No Duplicate Data

Normalize your data. Business logic should not require duplicate data stored in multiple places.
Bad: Storing `user_name` inside `messages`.
Good: Storing `user_id` and fetching the name via join.

## Data Integrity & Constraints

### Check Constraints
Push invariants into the database where appropriate using `CHECK` constraints.
Examples:
```sql
CHECK (aura >= 0)
CHECK (rating BETWEEN 1 AND 5)
```

### PostgreSQL ENUMs
Don't use free-form strings for controlled values. Use proper Postgres ENUMs for fields like `role`, `status`, `visibility`, and `companion_mode`.

## JSONB Usage

Use `JSONB` only for unstructured data or highly flexible metadata. Do not use `JSONB` to avoid normalizing relational data.

## Timestamp Strategy

Every table must include standard audit columns:
- `created_at` (timestamp, default now)
- `updated_at` (timestamp, updated on every mutation)

Optional (if soft deletes are needed):
- `deleted_at`

## Indexes Are Not Free

Create indexes deliberately based on query patterns. Indexes improve reads but slow down writes and consume storage.
Measure before adding specialized indexes. You do not need to index everything used in a `WHERE` clause immediately. However, **every foreign key must be indexed**.

## Migrations & Seeding

- **Migrations**: Never edit an existing migration. Always create a new migration for schema changes.
- **Seeding**: The flow is `schema/` → `migration/` → `seed/`. Seeds never go inside migrations.

## Future Scaling

**Design for today's workload, not tomorrow's speculation.**
Do not abstract or optimize for a scale you do not currently have. Wait until metrics prove a bottleneck exists.
