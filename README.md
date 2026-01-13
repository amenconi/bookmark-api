# Bookmark Manager API

A RESTful API for managing bookmarks with tags, built with Express and TypeScript.

## Planned Features

- CRUD operations for bookmarks (URL, title, description)
- Tag system for organizing bookmarks
- Search by title, URL, or tags
- Import/export bookmarks (JSON format)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Validation**: Zod

## API Endpoints (Planned)

### Bookmarks
- `GET /api/bookmarks` - List all bookmarks
- `GET /api/bookmarks/:id` - Get bookmark by ID
- `POST /api/bookmarks` - Create bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark

### Tags
- `GET /api/tags` - List all tags
- `GET /api/bookmarks?tag=:tag` - Filter by tag

### Import/Export
- `GET /api/export` - Export all bookmarks as JSON
- `POST /api/import` - Import bookmarks from JSON
