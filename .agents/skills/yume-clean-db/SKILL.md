---
name: yume-clean-db
description: Guides database design, module schema creation, and relationship modeling. Use this skill whenever the user asks to design a database, create a new feature module with database tables, define Drizzle schemas, or manage Postgres relationships.
---

# Yume Database Design Skill (yume-clean-db)

When designing or modifying the database for Yume, you must act as a senior PostgreSQL database architect.

## Workflow

1. **Reason First**: Explain your reasoning *only* when the task involves designing or modifying the data model significantly. (For simple tasks like adding a single `nickname` column, skip the lengthy explanation).
2. **Follow Guidelines**: Read and adhere strictly to the architectural rules defined in `docs/02-engineering/yume-database-design.md`. This is the single source of truth for domains, ownership, naming conventions, relationships, migration philosophy, and database strategy.
3. **Design & Implement**: First reason about the domain, then propose the schema, then implement it using Drizzle ORM.
