# acaibloom-landing-xmkm8pqyb6d4okscq9tle

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/edelfinon-gif/bruna-faustino)

A production-ready full-stack template built with React, TypeScript, and Cloudflare Workers. This project demonstrates a complete application scaffold featuring serverless state management with Durable Objects, a modern React frontend, and a clean API layer.

## Features

- **Cloudflare Workers + Durable Objects**: Stateful entities with automatic indexing and CRUD support
- **React + TypeScript Frontend**: Type-safe UI with Tailwind CSS, shadcn/ui components, and React Router
- **Entity-Based Data Model**: Reusable `IndexedEntity` base class for users, chats, and custom data
- **RESTful API**: Hono-powered endpoints with consistent `ApiResponse` format
- **Development Experience**: Hot reload, type generation, and error boundaries
- **Deployment Ready**: One-click Cloudflare Workers deployment with wrangler

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Query, React Router
- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite)
- **Tooling**: Bun, ESLint, PostCSS, Wrangler
- **Shared**: Type-safe contracts in `shared/types.ts`

## Getting Started

### Prerequisites

- Bun (v1.2+)
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

### Development

Start the local development server:

```bash
bun dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

Run the linter:

```bash
bun lint
```

### Build

Create a production build:

```bash
bun run build
```

Preview the production build locally:

```bash
bun run preview
```

## Project Structure

- `src/` — React frontend (pages, components, hooks, lib)
- `worker/` — Cloudflare Worker code (`index.ts`, `user-routes.ts`, `entities.ts`)
- `shared/` — Shared TypeScript types and mock data
- `tailwind.config.js`, `tsconfig.*.json` — Configuration files

## API Overview

The worker exposes the following endpoints (extend in `worker/user-routes.ts`):

- `GET /api/health` — Health check
- `GET /api/users` — List users (paginated)
- `POST /api/users` — Create user
- `GET /api/chats` — List chats
- `POST /api/chats` — Create chat
- `GET /api/chats/:chatId/messages` — List messages
- `POST /api/chats/:chatId/messages` — Send message
- Delete endpoints for users and chats

All endpoints return `{ success: boolean, data?: T, error?: string }`.

## Entities

Extend `IndexedEntity` in `worker/entities.ts` to add new domain objects. Example entities included:

- `UserEntity`
- `ChatBoardEntity`

Each entity automatically gets CRUD operations, indexing, and concurrency-safe mutations via CAS.

## Deployment

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/edelfinon-gif/bruna-faustino)

Deploy to Cloudflare Workers:

```bash
bun run deploy
```

Or use Wrangler directly:

```bash
bunx wrangler deploy
```

The `wrangler.jsonc` file is pre-configured with Durable Object bindings and migrations.

## Customization

1. Replace `src/pages/HomePage.tsx` with your application UI
2. Add new routes in `worker/user-routes.ts`
3. Define additional entities in `worker/entities.ts`
4. Update shared types in `shared/types.ts`

## License

This project is provided as a template for building applications on Cloudflare Workers.