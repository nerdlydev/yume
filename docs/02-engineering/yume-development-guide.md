# Yume Development Guide

Welcome to Yume! This guide will help you set up your local development environment.

## Prerequisites

Ensure you have the following installed on your machine:
- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/) & Docker Compose
- Git

## 1. Clone the Project

```bash
git clone https://github.com/yume-project/yume.git
cd yume
```

## 2. Environment Variables

Copy the example environment files to configure your local setup.

```bash
cp .env.example .env
```
Ensure that all required keys (e.g., `DATABASE_URL`) are correctly set for your local environment.

## 3. Install Dependencies

We use Bun for dependency management.

```bash
bun install
```

## 4. Start Infrastructure (Docker)

Start the local PostgreSQL database using Docker Compose.

```bash
docker compose up -d
```

## 5. Run Database Migrations & Seeding

Once the database is running, apply the latest migrations and seed the database with initial data.

```bash
bun run db:push
bun run db:seed
```

## 6. Start the Applications

Run the development servers for both the API (backend) and the Web App (frontend) concurrently.

```bash
bun run dev
```

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001

## Common Scripts

- `bun run dev`: Starts all development servers.
- `bun run build`: Builds all packages and applications for production.
- `bun run lint`: Runs Biome linter across the workspace.
- `bun run format`: Runs Biome formatter across the workspace.
- `bun run test`: Runs unit tests.
- `bun run db:generate`: Generates Drizzle migrations based on schema changes.
- `bun run db:push`: Applies schema changes directly to the database.
- `bun run db:studio`: Opens Drizzle Studio to explore the database.

## Project Conventions

- **Branching**: Create feature branches off `main` (e.g., `feat/add-user-profile`).
- **Commits**: Follow conventional commits (`feat:`, `fix:`, `chore:`).
- **Formatting**: Biome will automatically format your code on pre-commit hooks, but it's recommended to install the Biome extension in your IDE.
