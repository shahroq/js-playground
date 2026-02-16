# Catalog API w/ Express

A sample Catalog API built as a playground for experimenting with API design patterns, abstractions, and architectural approaches.

### 📦 Overview

This project models a simple catalog domain with:

- Products
- Reviews
- Tags
- and related relationships between them

It provides standard CRUD operations along with filtering, includes, pagination, and structured responses.

### 🏗 Architecture

The project mostly follows a Service-Oriented Architecture (SOA) & Hexagonal Architecture (Port and Adapters):

- thin controllers
- Dedicated service layer
- Query/filter abstractions
- Centralized error handling

Some parts are intentionally over-engineered. This repository has been used as:

- A playground for testing API design ideas
- A benchmarking space for comparing libraries and patterns
- An experimentation ground for abstraction strategies

As a result, certain patterns may be more complex than what most real-world applications require.

### 🎯 Purpose

This project is useful if you want to:

- Study different API structuring approaches
- Compare architectural trade-offs
- Explore service-oriented layering in a small domain
- Benchmark alternative implementations

**The repo reflects exploration, iteration, and comparison — not a minimal production template.**

### 🛠 Tech Stack

- TypeScript
- Express
- SQLite
