# JS/TS Playground

A TypeScript/JavaScript playground for exploring frameworks, API design patterns, architectural styles, and frontend/backend libraries.

This repository is organized as a **monorepo**, containing multiple frontend and backend applications that share a common domain model through a reusable **shared** package. The shared package provides common types, utilities, validation schemas, components, assets, and other cross-project code, enabling different applications to implement the same features while minimizing duplication.

This playground is intentionally experimental. It serves as an environment for comparing different frameworks, technology stacks, and architectural approaches while solving the same domain problems.

It also takes an educational, exploration-first approach, sometimes leading to over-engineered or exaggerated implementations in order to better understand trade-offs, scalability patterns, and framework-specific idioms.

## Tech Stack

- **Runtime**: Bun
- **Server**: Express.js, NestJS, Bun (native server)
- **Client**: React, Next.js, Angular, Astro

### 📦 Domain Overview

Most examples implement a simple **Catalog** or **Task** domain built around a small set of core entities:

- Products
- Reviews
- Tags
- Tasks
- Related relationships

The implementations typically cover common application concerns, including:

- CRUD operations
- Filtering and querying
- Pagination
- Relationship inclusion (e.g., nested/relational data)
- Structured API responses
