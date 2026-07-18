# Yume

Yume is a modern, modular social discovery platform designed to help people connect, build communities, and share real-world experiences. 

Our core vision is to build a safe, engaging ecosystem encompassing:
- **Communities & Companionship**: Interest graphs to find tribes and like-minded people.
- **Experiences**: Organizing and joining real-world events.
- **Journey**: A beautiful timeline of your life's memories and bucket lists.
- **Trust (Aura)**: A reputation system prioritizing safety and meaningful connections.

## Tech Stack

Yume is built on a high-performance, fully type-safe TypeScript monorepo using **Turborepo** and **Bun**.

### 🎨 Frontend (`apps/web`)
- **Framework**: React 19 + Vite
- **Routing & State**: TanStack Router & TanStack Query
- **Styling**: Tailwind CSS v4 + daisyUI (Sunset Theme)
- **Architecture**: PWA-ready with deep RPC integration

### ⚙️ Backend (`apps/api`)
- **Runtime & Server**: Bun + Hono
- **API Strategy**: Hono RPC (End-to-end type safety)
- **Database & ORM**: PostgreSQL (Neon) + Drizzle ORM
- **Authentication**: Better Auth

---

## Getting Started

Want to contribute? Awesome! Follow these steps to get your local development environment running.

### 1. Prerequisites
- **[Bun](https://bun.sh/)** (`curl -fsSL https://bun.sh/install | bash`)
- **PostgreSQL** (or a local Docker container)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/your-org/yume.git
cd yume
```

### 3. Install Dependencies
We use Bun as our package manager to ensure lightning-fast installs across the monorepo.
```bash
bun install
```

### 4. Environment Variables
Copy the local environment template to create your `.env` file at the root of the project.
```bash
cp .env.example .env
```
Ensure your `.env` has a valid `DATABASE_URL` pointing to your local Postgres instance:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/yume
BETTER_AUTH_SECRET=your_random_secret_here
BETTER_AUTH_URL=http://localhost:3000
```

### 5. Database Setup
Initialize the database and run the Drizzle migrations:
```bash
bun run db:push
```
*Note: You can view your local database visually at any time using `bun run db:studio`.*

### 6. Start the Development Servers
We use Turborepo to orchestrate our development servers. You can run everything at once, or spin them up individually.

**Run the full stack (Frontend & API):**
```bash
bun run dev
```

**Run them individually:**
```bash
bun run dev:api   # Starts the Hono backend on port 3000
bun run dev:web   # Starts the Vite frontend on port 5173
```

---

## Contributing Guidelines

We follow a **Feature-Driven Modular Architecture**. 
- Every new feature should be encapsulated within its own module (e.g., `apps/api/src/modules/communities`).
- Keep code clean, type-safe, and strictly follow the established Drizzle relationships.
- Before committing, ensure you run our formatting and linting tools:
  ```bash
  bun run lint:fix
  bun run format
  ```
- **Definition of Done:** A feature is only complete when its database schema, validation schemas, backend endpoints, and frontend React Query hooks are implemented, tested, and styled using daisyUI.

Please check the `ROADMAP.md` for current project phases and active milestones before picking up a task.

---

### License
*Add license information here.*
