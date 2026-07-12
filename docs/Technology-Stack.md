# Technology Stack & Infrastructure

> **Philosophy:** Build a production-grade, scalable platform while keeping infrastructure costs as close to ₹0 as possible during the MVP phase.

## Engineering Principles
Every technology used in Yume must satisfy these principles:
- Developer Experience (DX)
- Type Safety
- Performance
- Scalability
- Maintainability
- Open Source First
- Low Infrastructure Cost
- Easy Deployment
- Production Ready

---

## Final Technology Stack Summary

### Frontend
- **React 19:** Industry standard, huge ecosystem.
- **TypeScript:** End-to-end type safety.
- **Vite:** Lightning-fast dev server and builds.
- **TanStack Router:** Type-safe routing.
- **TanStack Query:** Server state management.
- **Hono RPC Client:** Type-safe API fetching without code generation.
- **TanStack Form:** Type-safe forms.
- **TanStack Table:** Powerful data tables.
- **Tailwind CSS & shadcn/ui:** Rapid, accessible UI development.
- **Better Auth:** Self-hosted authentication.
- **Zod:** Shared validation schemas.

### Backend
- **Bun:** Extremely fast JavaScript runtime.
- **Hono:** Minimal, composable API framework.
- **Hono RPC:** End-to-end type safety natively inferred from routes.
- **Drizzle ORM:** SQL-first ORM.
- **PostgreSQL & PostGIS:** Reliable relational DB + geospatial queries.
- **Redis (Upstash):** Caching, rate limiting, real-time sync.
- **BullMQ:** Background job processing.
- **Pino:** Fast structured logging.

### Infrastructure & Operations
- **Monorepo:** pnpm Workspaces & Turborepo.
- **Hosting:** Vercel (Frontend), Railway / Render (Backend).
- **Storage:** Cloudflare R2 (low-cost object storage).
- **CDN:** Cloudflare.
- **Email:** Resend.
- **Monitoring & Analytics:** Sentry (Errors) & PostHog (Product Insights).
- **CI/CD:** GitHub Actions.
- **Maps:** OpenStreetMap + MapLibre.

---

## Infrastructure Services Cost Breakdown (MVP)

| Resource | Provider | Estimated Cost |
| --- | --- | --- |
| **Frontend Hosting** | Vercel | ₹0 |
| **Backend Hosting** | Railway / Render | ₹0–₹400 |
| **Database** | Neon (PostgreSQL) | ₹0 |
| **Cache** | Upstash (Redis) | ₹0 |
| **Storage** | Cloudflare R2 | ₹0 |
| **CDN** | Cloudflare | ₹0 |
| **Email** | Resend | ₹0 |
| **Monitoring** | Sentry | ₹0 |
| **Analytics** | PostHog | ₹0 |
| **CI/CD** | GitHub Actions | ₹0 |
| **Maps** | OpenStreetMap + MapLibre | ₹0 |

### Estimated Total Infrastructure Cost
- **Development Phase:** ₹0/month
- **Private Beta (100–500 users):** ₹0–₹400/month
- **Public Beta (1,000–5,000 users):** ₹500–₹2,000/month

---

## Technologies Deferred Until Needed
To keep the MVP lean, these technologies are intentionally postponed and will only be introduced when there is a demonstrated product or scaling need:
- Kubernetes & Docker Swarm
- Microservices
- Kafka & RabbitMQ
- Elasticsearch
- GraphQL & gRPC
- AI/LLM Infrastructure & Vector Databases
- Image Processing Pipelines
- Terraform
