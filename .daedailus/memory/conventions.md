# Coding Conventions

## Naming Conventions
- **Files**: kebab-case (e.g., `error-handler.ts`, `express.ts`)
- **Functions**: camelCase following TypeScript standards
- **Variables**: camelCase with descriptive names
- **Types/Interfaces**: PascalCase (TypeScript convention)
- **Constants**: UPPER_SNAKE_CASE for environment variables

## Code Style
- **Indentation**: 2 spaces (inferred from TypeScript config)
- **Quotes**: Double quotes preferred (CommonJS style)
- **Semicolons**: Required (TypeScript strict mode)
- **Line length**: No explicit limit set

## Patterns to Follow
- Use TypeScript strict mode with all strict checking enabled
- Implement proper error handling middleware
- Follow Express.js middleware patterns
- Use Prisma client for all database operations
- Maintain clear separation between config, middleware, routes
- Use path aliases (@/*) for clean imports

## Patterns to Avoid
- Direct database queries without Prisma
- Implicit any types (noImplicitAny: true)
- Unused variables or parameters (strict checking enabled)
- Fallthrough cases in switch statements

## Import Organization
- Node.js built-ins first
- Third-party dependencies
- Internal modules using path aliases (@/*)
- Relative imports last

## Error Handling
- Centralized error handling through middleware
- Type-safe error responses
- Proper HTTP status codes

## Testing Conventions
- Test files: *.test.ts or *.spec.ts (excluded from build)
- Currently no testing framework configured