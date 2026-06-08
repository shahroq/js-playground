# Catalog API w/ Express.js

A sample Catalog API built as a playground for experimenting with API design patterns, abstractions, and architectural approaches.

### 🛠 Tech Stack

- TypeScript
- Express.js
- SQLite

### 📦 Overview

This project models a simple catalog domain with:

- Products
- Reviews
- Tags
- & related relationships

It provides standard CRUD operations along with filtering, includes, pagination, and structured responses.

### 🏗 Architecture

The project mostly follows Service-Oriented (SOA) & Hexagonal (Port and Adapters) Architecture with

- Thin controllers
- Dedicated service layer
- Repository pattern
- Centralized error handling
- Response formatting abstraction
- Query/filter abstraction

Some parts are intentionally over-engineered. This repository has been used as:

- A playground for testing API design ideas
- A benchmarking space for comparing libraries and patterns before using in production
- An experimentation ground for abstraction strategies

As a result, certain parts may be more complex than what most real-world applications require.

### 🎯 Purpose

This project is useful if you want to:

- Benchmark alternative implementations
- Study different API structuring approaches
- Compare architectural trade-offs

**The repo reflects exploration, iteration, and comparison — not a minimal production template.**

### 🚀 Installation

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start:dev
```
