# Project Brief

## Overview
A RESTful API for managing bookmarks with tagging functionality, built with Express.js and TypeScript. The system allows users to organize, search, and import/export their bookmarks through a clean API interface.

## Goals
- Provide CRUD operations for bookmark management (URL, title, description)
- Implement a flexible tagging system for bookmark organization
- Enable search capabilities across titles, URLs, and tags
- Support import/export functionality for bookmark data portability
- Deliver a type-safe, maintainable API using TypeScript

## Constraints
- Uses SQLite database for simplicity and portability
- RESTful API design patterns must be followed
- TypeScript strict mode enforcement
- CommonJS module system

## Target Users
Developers and end-users who need to programmatically manage bookmark collections through API endpoints, likely integrated into bookmark management applications or browser extensions.

## Key Metrics
- API response times for bookmark operations
- Search query performance across large bookmark collections
- Data integrity during import/export operations