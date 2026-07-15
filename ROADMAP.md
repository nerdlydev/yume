# Yume Product Roadmap

This document is the **single source of truth** for execution. It defines the product milestones, development phases, sprint goals, and current status for Yume. 

Every development session starts here.

## Development Methodology
We use a hybrid of **Shape Up** and **Agile**. Every cycle lasts **2 weeks** and must produce a usable increment.

```text
Plan → Build → Ship → Feedback → Improve
```

## The High-Level Roadmap

```text
Phase 0: Project Foundation (Current)
Phase 1: Identity Platform
Phase 2: Communities
Phase 3: Companion
Phase 4: Communication
Phase 5: Experiences
Phase 6: Journey
Phase 7: Trust
Phase 8: Discover
Phase 9: Moderation
Phase 10: Production Launch
```

---

## Phases & Milestones

### 🚧 Phase 0 — Foundation (2–3 weeks)
**Status:** In Progress

**Goal:** Create a production-ready engineering foundation.
- [x] Monorepo configuration (Turborepo, pnpm)
- [x] Backend scaffolding (Bun, Hono)
- [x] Database strategy (Drizzle, Neon, PostgreSQL)
- [x] API Strategy (Hono RPC)
- [x] Frontend architecture (React 19, Vite)
- [x] Database Schema & Migrations setup
- [x] Authentication scaffolding (Better Auth)
- [x] Deployable web shell

**Deliverable:** The project builds successfully with CI, shared packages, database migrations, authentication scaffolding, and a deployable web shell.

---

### ⏳ Phase 1 — Identity (2 weeks)
**Status:** Not Started

**Goal:** People can create an account and manage their profile.
- [ ] Register / Login / Logout
- [ ] Better Auth integration
- [ ] Session management
- [ ] User Profiles
- [ ] User Settings
- [ ] Avatar upload
- [ ] Onboarding flow (Interests)

**Deliverable:** A complete user account system.

---

### ⏳ Phase 2 — Communities (2–3 weeks)
**Status:** Not Started

**Goal:** People can discover and join communities.
- [ ] Create Community
- [ ] Join / Leave Community
- [ ] Community Search
- [ ] Tags & Categories
- *Note: No posts yet.*

**Deliverable:** The Interest Graph.

---

### ⏳ Phase 3 — Companion (3–4 weeks)
**Status:** Not Started

**Goal:** Users can find and connect with companions. (This is Yume's heart).
- [ ] Companion Request
- [ ] Companion Feed
- [ ] Companion Modes
- [ ] Matching Algorithm
- [ ] Companion Cards
- [ ] Availability Settings
- *Note: Relationship mode locked behind Aura.*

**Deliverable:** Users can meet.

---

### ⏳ Phase 4 — Communication (2–3 weeks)
**Status:** Not Started

**Goal:** Users can talk to each other.
- [ ] Conversations
- [ ] Real-time Messages
- [ ] Notifications
- [ ] Read Receipts
- *Note: No voice/video.*

**Deliverable:** Real conversations.

---

### ⏳ Phase 5 — Experiences (2 weeks)
**Status:** Not Started

**Goal:** Represents real-world activities.
- [ ] Create Experience (Coffee Meetup, Anime Event, etc.)
- [ ] Join Experience
- [ ] Experience Participants
- [ ] Experience Feedback

**Deliverable:** Experiences become real.

---

### ⏳ Phase 6 — Journey (3 weeks)
**Status:** Not Started

**Goal:** The user's life timeline (replaces Atlas).
- [ ] Timeline
- [ ] Memories
- [ ] Collections
- [ ] Bucket Lists
- [ ] Map View
- [ ] Explorer Statistics

**Deliverable:** Users build their story.

---

### ⏳ Phase 7 — Trust (2 weeks)
**Status:** Not Started

**Goal:** Platform reputation system.
- [ ] Aura Scores
- [ ] Endorsements
- [ ] Verification
- [ ] Reputation system
- [ ] Relationship Mode Unlock

**Deliverable:** A safe community.

---

### ⏳ Phase 8 — Discover (2 weeks)
**Status:** Not Started

**Goal:** Recommendation layer.
- [ ] Nearby Cafés, Bookstores, Parks, Events
- [ ] Personalized Feed (combining Places, Communities, Experiences, Journey, Aura)

**Deliverable:** Users always find something.

---

### ⏳ Phase 9 — Moderation (1–2 weeks)
**Status:** Not Started

**Goal:** Platform operations.
- [ ] Admin / Moderator Roles
- [ ] Reports system
- [ ] Appeals
- [ ] Audit logs

**Deliverable:** The platform can scale safely.

---

### ⏳ Phase 10 — Launch (3 weeks)
**Status:** Not Started

**Goal:** Production deployment and public beta.
- [ ] Polish & Bug Fixes
- [ ] SEO
- [ ] Analytics integration
- [ ] Final Production Deployment

---

## Definition of Done (DoD)
A feature is complete **only** when:
1. Database schema is implemented.
2. Migrations are created.
3. Validation schemas are added.
4. Backend endpoints are implemented.
5. Hono RPC types work end-to-end.
6. React Query hooks are added.
7. UI is responsive.
8. PWA behavior is verified.
9. Tests pass.
10. Documentation is updated.
11. Feature is deployed to the development environment.
