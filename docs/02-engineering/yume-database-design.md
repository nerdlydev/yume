# Yume Database Design

## Philosophy

Yume is designed for its first **100–10,000 active users**.

The goal is **developer velocity**, **clarity**, and **maintainability**—not premature optimization.

The database should model the **business domains** of Yume, not technical layers.

> **Optimize for product iteration first. Scale only when the product requires it.**
> 

---

# Core Principles

## Domain-Driven Design

The database is organized around **business domains**, not tables.

Each domain owns its entities, relationships, and business rules.

Examples:

- Identity
- Communities
- Companion
- Experiences
- Journey
- Places
- Discover
- Communication
- Trust
- Moderation

---

## Modular Monolith

Yume is a **Modular Monolith**.

One API.

One PostgreSQL database.

One schema.

Many independent feature modules.

```
                React / Admin

                      │

                Hono API

                      │

──────────────────────────────────

Identity

Communities

Companion

Experiences

Journey

Places

Discover

Communication

Trust

Moderation

──────────────────────────────────

                      │

               PostgreSQL

                 public
```

---

## Shared PostgreSQL Database

| Decision | Choice |
| --- | --- |
| Database | PostgreSQL |
| Provider | Docker (local), Neon (production) |
| ORM | Drizzle ORM |
| Database Count | 1 |
| Schema Count | 1 (`public`) |
| Architecture | Modular Monolith |

---

# Why One Database?

A single PostgreSQL database provides:

- ACID transactions
- Referential integrity
- Simple backups
- Simple deployments
- Lower cost
- Faster development
- Easier debugging

Multiple databases are unnecessary for an MVP.

---

# Why One Schema?

Everything lives inside:

```
public
```

Schemas such as:

```
identity

community

journey
```

introduce complexity without providing meaningful value at this stage.

Logical separation happens in the codebase—not in PostgreSQL schemas.

---

# Design Process (Aggregates First)

Before writing any Drizzle tables, every module must follow this process:

```text
Business Vision
      ↓
Bounded Contexts
      ↓
Aggregates
      ↓
Entities
      ↓
Relationships
      ↓
ER Diagram
      ↓
Drizzle Schema
```

By defining the **Aggregate Root** first, we ensure that boundaries, transactions, and ownership are explicitly defined, preventing "table-first" sprawl.

---

# Bounded Contexts

These are the core domains of Yume.

---

# 1. Identity

Owns user identity and authentication.

**Aggregate:** User

Owns:

```
users

profiles

accounts

sessions

verification_tokens

user_settings
```

Every table in the system ultimately references

```
users.id
```

---

# 2. Communities

Interest-based communities.

**Aggregate:** Community

Owns:

```
communities

community_members

community_roles

community_posts

community_tags
```

---

# 3. Companion

The heart of Yume.

**Aggregate:** Companion Request

Owns:

```
companion_requests

companion_matches

companion_preferences

relationship_unlocks
```

Relationship Mode becomes available only after sufficient Aura has been earned.

---

# 4. Experiences

Represents real-world activities.

**Aggregate:** Experience

Owns:

```
experiences

experience_participants

experience_feedback

experience_categories
```

Examples:

- Coffee Meetup
- Book Fair
- Anime Event
- Museum Visit

---

# 5. Journey

Journey is the user's life timeline.

**Aggregate:** Journey Entry

Owns:

```
journey_entries

journey_collections

journey_bucket_lists

shared_memories

visited_places
```

Journey includes:

- Memories
- Timeline
- Collections
- Bucket Lists
- Annual Recap
- Explorer Statistics

The map is only one visualization of Journey.

---

# 6. Places

Canonical location database.

**Aggregate:** Place

Owns:

```
places

place_categories

place_images

place_tags
```

Examples:

- Cafés
- Restaurants
- Parks
- Bookstores
- Museums

Places are reusable across the platform.

Experiences reference Places.

Journey references Places.

Discover recommends Places.

---

# 7. Discover

Recommendation layer.

Discover owns recommendation logic—not data.

Owns:

```
saved_places

saved_events

recommendation_preferences
```

Discover combines data from:

- Places
- Communities
- Experiences
- Journey
- Aura

to generate personalized recommendations.

---

# 8. Communication

Messaging system.

**Aggregate:** Conversation

Owns:

```
conversations

conversation_members

messages

attachments

notifications
```

---

# 9. Trust (Aura)

Platform reputation system.

**Aggregate:** Aura Score

Owns:

```
aura_scores

endorsements

reputation_events

verification_history
```

Aura influences:

- Companion visibility
- Relationship unlock
- Recommendations
- Trust level

---

# 10. Moderation

Platform operations.

**Aggregate:** Report

Owns:

```
reports

moderation_actions

user_bans

appeals

audit_logs
```

Supports:

- Admin
- Moderator

---

# Domain Dependency Diagram

```
                    Identity
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼

 Communities      Companion      Communication
        │               │               │
        └──────┬────────┘               │
               ▼                        │
          Experiences                   │
               │                        │
               ▼                        │
            Journey                     │
               │                        │
               ▼                        │
             Places                     │
               │                        │
               ▼                        │
            Discover                    │
               │                        │
               └──────────────┐         │
                              ▼         ▼
                           Trust (Aura)
                                │
                                ▼
                           Moderation
```

---

# Database Package Structure

```
packages/database/

src/

├── client.ts
├── drizzle.config.ts
│
├── schema/
│   ├── identity.ts
│   ├── communities.ts
│   ├── companion.ts
│   ├── experiences.ts
│   ├── journey.ts
│   ├── places.ts
│   ├── discover.ts
│   ├── communication.ts
│   ├── trust.ts
│   ├── moderation.ts
│   ├── relations.ts
│   └── index.ts
│
├── migrations/
│
└── seed/
```

Every schema file owns only its own domain.

---

# Table Ownership Rule

Every table must have exactly **one owner**.

Example:

```
Journey

owns

journey_entries

journey_collections

shared_memories
```

No other module modifies Journey tables directly.

---

# Foreign Keys

Every relationship uses explicit foreign keys.

Example:

```
users

↓

companion_requests

↓

experiences

↓

journey_entries
```

Never rely on application logic for relational integrity.

---

# Relationship Rules

Use explicit relationships.

### One-to-One

```
users

↓

profiles
```

---

### One-to-Many

```
communities

↓

community_members
```

---

### Many-to-Many

Always use junction tables.

```
users

↓

community_members

↓

communities
```

Never use arrays or JSON for relationships.

---

# UUID Strategy

Every primary key uses

```
UUID v7
```

Benefits:

- Sortable
- Globally unique
- Future-proof
- Distributed-friendly

---

# Naming Convention

Tables:

```
plural

users

communities

journey_entries
```

Columns:

```
snake_case
```

Foreign Keys:

```
user_id

community_id

experience_id
```

---

# Standard Columns

Every important table contains:

```
id

created_at

updated_at

deleted_at
```

Soft deletes are preferred over hard deletes.

---

# PostgreSQL Best Practices

### Foreign Keys

Always enabled.

---

### Indexes

Every foreign key is indexed.

Index columns used frequently in:

- WHERE
- ORDER BY
- JOIN

Avoid unnecessary indexes.

Indexes are not free.

---

### Check Constraints

Prefer database constraints.

Examples:

```sql
CHECK (rating BETWEEN 1 AND 5)

CHECK (aura_points >= 0)
```

---

### ENUMs

Use PostgreSQL enums for controlled values.

Examples:

```
user_role

user_status

companion_mode

visibility

report_status
```

Avoid free-form strings.

---

### JSONB

Use only for flexible metadata.

Good examples:

```
notification_preferences

personality_traits

social_links
```

Never use JSONB instead of proper relational modeling.

---

# Repository Architecture

Only repositories communicate with Drizzle.

```
Controller

↓

Service

↓

Repository

↓

Drizzle ORM

↓

PostgreSQL
```

No service or controller should directly execute database queries.

---

# Migration Rules

- Never edit an existing migration.
- Every schema change creates a new migration.
- Seeds are separate from migrations.

---

# Initial MVP Tables

Approximately **20–25 tables**.

```
users
profiles
accounts
sessions

communities
community_members

companion_requests
companion_matches

experiences
experience_participants

places
place_categories

journey_entries
journey_collections

saved_places

conversations
messages

aura_scores
endorsements

reports
audit_logs

notifications
verification_tokens
```

This is enough for the MVP.

---

# Deferred Features

Do **not** implement yet:

- AI recommendations
- Recommendation embeddings
- Premium subscriptions
- Payments
- Business partnerships
- Analytics warehouse
- Search indexing
- Event sourcing
- CQRS
- Redis caching
- Microservices

Implement them only when justified by real product growth.

---

# Scaling Strategy

### Stage 1

```
1 API

↓

1 PostgreSQL

↓

1 Server
```

---

### Stage 2

```
API

↓

Redis

↓

Primary DB

↓

Read Replica
```

---

### Stage 3

Extract services only when necessary.

Possible future services:

- Identity Service
- Companion Service
- Journey Service
- Communication Service

Each with its own database only when operational complexity demands it.

---

# Final Engineering Principle

> **Model the business, not the database.**
> 

Every table should represent a real concept in Yume's product, belong to exactly one bounded context, and expose its data only through its owning module's repository. By keeping ownership explicit, relationships normalized, and the architecture intentionally simple, Yume can evolve from a solo-developer MVP into a multi-engineer platform without requiring a fundamental redesign of its data model.

# Bounded Context Implementation Template

Every time a new bounded context is implemented, the developer must create an implementation plan matching this structure exactly. This ensures that the domain logic dictates the schema, not the other way around.

```md
# <Module Name>

## Business Vision
## Responsibilities
## Public Interface
## Aggregate Root
## Domain Entities
## Better Auth Integration (or External Integration)
## Invariants
## Ownership Rules
## Lifecycle
## Relationships
## ER Diagram
## Database Tables
## Repository Layer
## API Surface
## Deferred Features
## Verification Plan
```
