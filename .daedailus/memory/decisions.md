# Architecture Decisions

## ADR-001: SQLite Database Choice
**Date**: 2024 (inferred from project setup)
**Status**: Accepted

### Context
Needed a database solution for bookmark storage that would be simple to set up and deploy, with minimal infrastructure requirements.

### Decision
Chose SQLite as the database engine with Prisma as the ORM layer.

### Consequences
- **Positive**: Zero-configuration database, easy development setup, file-based portability
- **Negative**: Limited to single-writer scenarios, no built-in replication

## ADR-002: TypeScript with Strict Mode
**Date**: 2024 (inferred from tsconfig.json)
**Status**: Accepted

### Context
Need for type safety and better developer experience in a Node.js API project.

### Decision
Implemented TypeScript with all strict checking options enabled (strict: true, noImplicitAny, etc.)

### Consequences
- **Positive**: Compile-time error detection, better IDE support, self-documenting code
- **Negative**: Longer initial development time, requires TypeScript knowledge

## ADR-003: CommonJS Module System
**Date**: 2024 (inferred from package.json and tsconfig.json)
**Status**: Accepted

### Context
Node.js project requiring compatibility with existing npm ecosystem and tooling.

### Decision
Used CommonJS module system instead of ES modules ("type": "commonjs").

### Consequences
- **Positive**: Better compatibility with Node.js tooling and existing libraries
- **Negative**: Cannot use top-level await, slightly more verbose import syntax

## ADR-004: Express.js Framework
**Date**: 2024 (inferred from dependencies)
**Status**: Accepted

### Context
Needed a mature, well-documented web framework for REST API development.

### Decision
Chose Express.js as the web framework for handling HTTP requests and middleware.

### Consequences
- **Positive**: Large ecosystem, extensive documentation, middleware support
- **Negative**: Callback-based patterns, requires additional setup for modern features