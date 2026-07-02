# Technical Architecture

## Guiding Principles

The architecture should support millions of users, thousands of contributors, and continuous feature expansion.

Every component should be modular.

Every service should have a clearly defined responsibility.

---

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* React Three Fiber
* Progressive Web App support

---

## Backend

* NestJS
* PostgreSQL
* Prisma ORM
* Redis
* WebSockets
* Background job queue

---

## Authentication

Support:

* Google
* Discord
* GitHub
* Email and password

Future support:

* WCA account integration

---

## Storage

Store:

* Images
* Videos
* User uploads
* Documentation
* Repository assets

Use S3-compatible object storage.

---

## Infrastructure

* Docker
* Docker Compose
* CI/CD pipelines
* Automated testing
* Automated deployments

Future support:

* Kubernetes
* Multi-region deployments

---

## API Philosophy

Every feature should be accessible through a documented API.

CubeHub should become infrastructure for the cubing ecosystem.

Public APIs should eventually support:

* Algorithms
* Cases
* Users
* Repositories
* Practice
* Competitions
* Statistics
* Hardware
* AI

---

## Scalability

Design every major system with horizontal scaling in mind.

Avoid tightly coupled services.

Use caching aggressively where appropriate.

Keep business logic separate from presentation.

Build today with tomorrow's growth in mind.
