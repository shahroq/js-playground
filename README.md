# JS/TS Playground

A TypeScript/JavaScript playground for exploring frameworks, API design patterns, architectural styles, and frontend/backend libraries.

This repo is intentionally experimental and is used to compare different stacks and approaches in a controlled, domain-driven setup.

It also takes an educational, exploration-first approach, sometimes leading to over-engineered or exaggerated implementations in order to better understand trade-offs, scalability patterns, and framework-specific idioms.

- **Runtime**: Bun
- **Server**: Express.js, NestJS, Bun (native server), etc.
- **Client**: React, Next.js, Angular, Astro

### 📦 Domain Overview

This project mostly implements a simple `Catalog` domain with a few core entities:

- Products
- Reviews
- Tags
- & related relationships

The system supports common application concerns such as:

- CRUD operations
- Filtering and querying
- Pagination
- Relationship inclusion (e.g., nested/relational data)
- Structured API responses
