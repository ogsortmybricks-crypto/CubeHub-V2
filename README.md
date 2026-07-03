# CubeHub

> The operating system of speedcubing.

CubeHub is being built in carefully planned stages (see [`MDs/07_ROADMAP.md`](MDs/07_ROADMAP.md)).
This repository is **Version 1 · Learn** — the best place to learn speedcubing
algorithms, with an interactive 3D cube, execution variants, and recognition
guidance for every case.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** — dark-mode-first design system
- **React Three Fiber** + **three.js** — the animated 3D cube viewer
- **Framer Motion** — interface motion
- **Prisma** — future-ready data model (`prisma/schema.prisma`)

## Architecture

Per [`MDs/05_Architecture.md`](MDs/05_Architecture.md), business logic is kept
separate from presentation. V1 serves curated content from `src/lib/data`
through a single data-access seam in [`src/server/catalog.ts`](src/server/catalog.ts).
That seam is where a Postgres/Prisma backend — and later a dedicated NestJS
service — plugs in without touching page components.

```
src/
  app/                  App Router pages (home, algorithms, methods, …)
  components/
    cube/               React Three Fiber cube + player controls
    shell/              Dark-mode app shell, nav, icons
    algorithms/         Browse + detail experiences
    ui/                 Shared presentational components
  lib/
    cube/               Notation parser, color scheme (domain logic)
    data/               Curated seed catalog + types
  server/               Data-access layer (the persistence seam)
prisma/schema.prisma    Future-ready database model
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Roadmap

V1 Learn → V2 Improve (practice) → V3 Collaborate (repositories) →
V4 Community → V5 Ecosystem. Placeholder routes (`/practice`, `/hardware`) are
intentional, designed previews of what's coming — never dead ends.
