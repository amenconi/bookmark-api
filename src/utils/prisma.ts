import { PrismaClient } from '@prisma/client';
import { config } from '../config/env';

/**
 * PrismaClient singleton instance
 * This ensures only one instance of PrismaClient is created throughout the application lifecycle
 */
let prismaInstance: PrismaClient | undefined;

/**
 * Gets or creates the PrismaClient singleton instance
 * @returns PrismaClient instance with appropriate configuration
 */
function getPrismaClient(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: config.isDevelopment()
        ? ['query', 'info', 'warn', 'error']
        : ['error'],

      errorFormat: config.isDevelopment() ? 'pretty' : 'minimal',

      datasources: {
        db: {
          url: config.databaseUrl,
        },
      },
    });

    // Log successful connection in development
    if (config.isDevelopment()) {
      console.log('✓ Prisma Client initialized');
    }
  }

  return prismaInstance;
}

/**
 * Singleton PrismaClient instance
 * Import and use this throughout your application
 *
 * @example
 * import { prisma } from './utils/prisma';
 *
 * const bookmarks = await prisma.bookmark.findMany();
 */
export const prisma = getPrismaClient();

/**
 * Gracefully disconnects the Prisma Client
 * Should be called when shutting down the application
 *
 * @example
 * process.on('SIGINT', async () => {
 *   await disconnectPrisma();
 *   process.exit(0);
 * });
 */
export async function disconnectPrisma(): Promise<void> {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    console.log('✓ Prisma Client disconnected');
  }
}

/**
 * Connects to the database and verifies the connection
 * Useful for health checks and initialization
 *
 * @returns Promise that resolves when connected
 * @throws Error if connection fails
 */
export async function connectPrisma(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✓ Database connection established');
  } catch (error) {
    console.error('✗ Failed to connect to database:', error);
    throw error;
  }
}

/**
 * Tests the database connection
 * Useful for health checks
 *
 * @returns Promise that resolves to true if connected, false otherwise
 */
export async function isDatabaseConnected(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
}

// Graceful shutdown handlers
// Ensure Prisma disconnects when the application terminates
process.on('beforeExit', async () => {
  await disconnectPrisma();
});

process.on('SIGINT', async () => {
  await disconnectPrisma();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectPrisma();
  process.exit(0);
});

export default prisma;
