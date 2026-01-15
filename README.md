# Bookmark Manager API

A RESTful API for managing bookmarks with tags, built with Express.js and TypeScript. This API provides a robust backend for organizing, storing, and retrieving bookmarks with support for tagging, search, and import/export functionality.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)

## Overview

The Bookmark Manager API is a TypeScript-based Express application designed to provide a simple yet powerful backend for managing bookmarks. It uses SQLite for data persistence through Prisma ORM, ensuring type-safe database operations and easy schema management.

### Key Features

- **CRUD Operations**: Full create, read, update, and delete functionality for bookmarks
- **Tag System**: Organize bookmarks with flexible tagging
- **Search Capabilities**: Filter bookmarks by title, URL, or tags
- **Import/Export**: Backup and restore bookmarks in JSON format
- **Type Safety**: Full TypeScript implementation with strict mode enabled
- **Database Migrations**: Managed through Prisma for easy schema evolution

## Tech Stack

### Core Technologies

- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.3.3) - Strict mode enabled for maximum type safety
- **Runtime**: [Node.js](https://nodejs.org/) (v20+)
- **Framework**: [Express.js](https://expressjs.com/) (v4.18.2) - Fast, unopinionated web framework
- **Database**: [SQLite](https://www.sqlite.org/) - Lightweight, file-based database
- **ORM**: [Prisma](https://www.prisma.io/) (v6.19.2) - Modern database toolkit with type-safe client

### Development Tools

- **ts-node-dev**: Hot-reload development server for TypeScript
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

## Architecture

The application follows a clean, modular architecture:

```
bookmark-api/
├── src/
│   ├── config/          # Configuration management (environment variables)
│   ├── middleware/      # Express middleware (error handling, validation)
│   ├── models/          # Data models and types
│   ├── routes/          # API route handlers
│   ├── utils/           # Utility functions and helpers
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema definition
├── dist/                # Compiled JavaScript output
└── .env                 # Environment variables (not in version control)
```

### Design Principles

- **Separation of Concerns**: Clear boundaries between routes, business logic, and data access
- **Type Safety**: Comprehensive TypeScript types throughout the application
- **Environment-Based Configuration**: Flexible configuration through environment variables
- **Error Handling**: Centralized error handling middleware
- **Fail-Fast**: Configuration validation on startup to catch issues early

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

## Getting Started

Follow these steps to get the API running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/amenconi/bookmark-api.git
cd bookmark-api
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Express, Prisma, TypeScript, and development tools.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

The default values should work for local development. See [Environment Variables](#environment-variables) section for details.

### 4. Initialize the Database

Generate the Prisma client and create the database:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

This will:
- Generate the type-safe Prisma client
- Create the SQLite database file (`dev.db`)
- Apply the initial migration to set up the schema

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` with hot-reload enabled. Any changes to your TypeScript files will automatically restart the server.

### 6. Verify Installation

Check that the server is running by visiting the health endpoint:

```bash
curl http://localhost:3001/health
```

You should receive:
```json
{"status":"ok"}
```

## Environment Variables

The application uses environment variables for configuration. Create a `.env` file in the root directory with the following variables:

### Required Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `DATABASE_URL` | Database connection string | - | `file:./dev.db` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PORT` | Server port number | `3001` | `3001` |
| `NODE_ENV` | Application environment | `development` | `development`, `production`, `test` |

### Example `.env` File

```env
# Server Configuration
PORT=3001

# Database Configuration
# For SQLite (default):
DATABASE_URL="file:./dev.db"

# Node Environment (development, production, test)
NODE_ENV=development
```

### Notes

- The application will fail to start if `DATABASE_URL` is not set
- Configuration is validated on startup - any missing required variables will cause an immediate error
- Environment variables are loaded and validated in `src/config/env.ts`

## Available Scripts

The following npm scripts are available for development and production:

### `npm run dev`

Starts the development server with hot-reload enabled.

```bash
npm run dev
```

- Uses `ts-node-dev` for fast TypeScript compilation
- Automatically restarts on file changes
- Transpiles only (no type checking) for faster startup
- Ideal for active development

### `npm run build`

Compiles TypeScript to JavaScript for production.

```bash
npm run build
```

- Outputs compiled files to the `dist/` directory
- Performs full type checking
- Generates source maps for debugging
- Creates declaration files (`.d.ts`)
- Must be run before deploying to production

### `npm start`

Runs the compiled production server.

```bash
npm start
```

- Executes the compiled JavaScript from `dist/index.js`
- Requires `npm run build` to be run first
- No hot-reload - optimized for production
- Use this in production environments

### `npm test`

Runs the test suite (currently a placeholder).

```bash
npm test
```

Note: Testing framework not yet implemented.

## API Endpoints

The API provides RESTful endpoints for managing bookmarks. All endpoints return JSON responses.

### Health Check

#### `GET /health`

Check if the API is running and healthy.

**Request:**
```bash
curl http://localhost:3001/health
```

**Response:**
```json
{
  "status": "ok"
}
```

**Status Codes:**
- `200 OK` - Server is healthy and running

---

### Bookmarks (Planned)

The following endpoints are planned for bookmark management:

#### `GET /api/bookmarks`
List all bookmarks with optional filtering.

#### `GET /api/bookmarks/:id`
Get a specific bookmark by ID.

#### `POST /api/bookmarks`
Create a new bookmark.

#### `PUT /api/bookmarks/:id`
Update an existing bookmark.

#### `DELETE /api/bookmarks/:id`
Delete a bookmark.

### Tags (Planned)

#### `GET /api/tags`
List all available tags.

#### `GET /api/bookmarks?tag=:tag`
Filter bookmarks by tag.

### Import/Export (Planned)

#### `GET /api/export`
Export all bookmarks as JSON.

#### `POST /api/import`
Import bookmarks from JSON file.

## Development Workflow

### Day-to-Day Development

1. **Start the Development Server**
   ```bash
   npm run dev
   ```

2. **Make Your Changes**
   - Edit files in the `src/` directory
   - The server will automatically restart on save

3. **Test Your Changes**
   - Use curl, Postman, or your preferred API client
   - Check the health endpoint first: `curl http://localhost:3001/health`

### Database Changes

When you need to modify the database schema:

1. **Update the Schema**
   - Edit `prisma/schema.prisma`
   - Add or modify models as needed

2. **Create a Migration**
   ```bash
   npx prisma migrate dev --name descriptive_migration_name
   ```

3. **The Migration Tool Will:**
   - Generate SQL migration files
   - Apply changes to your database
   - Regenerate the Prisma client with updated types

4. **Reset Database (if needed)**
   ```bash
   npx prisma migrate reset
   ```
   This will drop the database, recreate it, and run all migrations.

### Adding New Features

1. **Plan Your Changes**
   - Identify which files need to be modified or created
   - Consider the impact on existing functionality

2. **Implement the Feature**
   - Create routes in `src/routes/`
   - Add business logic in appropriate modules
   - Update or create models in `src/models/`
   - Add middleware if needed in `src/middleware/`

3. **Test Thoroughly**
   - Test all new endpoints
   - Verify error handling
   - Check edge cases

4. **Update Documentation**
   - Add new endpoints to this README
   - Update environment variables if needed
   - Document any new configuration

### Building for Production

1. **Set Production Environment Variables**
   ```env
   NODE_ENV=production
   DATABASE_URL="file:./prod.db"
   PORT=3001
   ```

2. **Build the Application**
   ```bash
   npm run build
   ```

3. **Start the Production Server**
   ```bash
   npm start
   ```

### Debugging Tips

- **Check Environment Configuration**: The app logs configuration on startup
- **Enable Verbose Logging**: Check the console output when running `npm run dev`
- **Inspect Database**: Use `npx prisma studio` to browse your database in a web UI
- **Check Prisma Client**: Ensure it's generated with `npx prisma generate`

## Project Structure

```
bookmark-api/
│
├── prisma/
│   ├── schema.prisma              # Database schema and models
│   └── migrations/                # Database migration history
│
├── src/
│   ├── config/
│   │   └── env.ts                 # Environment variable configuration
│   │
│   ├── middleware/
│   │   ├── errorHandler.ts        # Global error handling middleware
│   │   └── .gitkeep
│   │
│   ├── models/
│   │   └── .gitkeep               # Data models and types (to be added)
│   │
│   ├── routes/
│   │   └── .gitkeep               # API route handlers (to be added)
│   │
│   ├── utils/
│   │   └── .gitkeep               # Utility functions (to be added)
│   │
│   └── index.ts                   # Application entry point
│
├── dist/                          # Compiled JavaScript (generated)
├── node_modules/                  # Dependencies (generated)
│
├── .env                           # Environment variables (not in git)
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # This file
```

### Key Files

- **`src/index.ts`**: Application entry point, sets up Express server and middleware
- **`src/config/env.ts`**: Loads and validates environment variables
- **`prisma/schema.prisma`**: Defines database schema and models
- **`tsconfig.json`**: TypeScript compiler configuration with strict mode
- **`package.json`**: Project metadata, dependencies, and npm scripts

## Contributing

Contributions are welcome! Please ensure your code:

- Follows the existing code style
- Passes TypeScript compilation with no errors
- Includes appropriate error handling
- Updates this README if adding new features or endpoints

## License

ISC

## Links

- **Repository**: [https://github.com/amenconi/bookmark-api](https://github.com/amenconi/bookmark-api)
- **Issues**: [https://github.com/amenconi/bookmark-api/issues](https://github.com/amenconi/bookmark-api/issues)
