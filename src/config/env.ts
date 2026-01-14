import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env file
dotenv.config({ path: resolve(__dirname, '../../.env') });

/**
 * Validates that a required environment variable is set
 * @param key - The environment variable name
 * @param value - The environment variable value
 * @returns The validated value
 * @throws Error if the value is undefined or empty
 */
function requireEnv(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      `Please ensure ${key} is set in your .env file.`
    );
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value
 * @param value - The environment variable value
 * @param defaultValue - The default value to use if not set
 * @returns The environment variable value or default
 */
function getEnvWithDefault(value: string | undefined, defaultValue: string): string {
  return value && value.trim() !== '' ? value : defaultValue;
}

/**
 * Validates the NODE_ENV value
 * @param value - The NODE_ENV value
 * @returns The validated NODE_ENV
 */
function validateNodeEnv(value: string): 'development' | 'production' | 'test' {
  const validEnvs = ['development', 'production', 'test'] as const;
  if (validEnvs.includes(value as any)) {
    return value as 'development' | 'production' | 'test';
  }
  console.warn(
    `Warning: Invalid NODE_ENV value "${value}". Defaulting to "development".`
  );
  return 'development';
}

/**
 * Application configuration object
 * All environment variables are validated and typed here
 */
export const config = {
  /**
   * Server port - defaults to 3001
   */
  port: parseInt(getEnvWithDefault(process.env.PORT, '3001'), 10),

  /**
   * Database connection URL (required)
   */
  databaseUrl: requireEnv('DATABASE_URL', process.env.DATABASE_URL),

  /**
   * Node environment (development, production, or test)
   */
  nodeEnv: validateNodeEnv(getEnvWithDefault(process.env.NODE_ENV, 'development')),

  /**
   * Helper to check if running in production
   */
  isProduction(): boolean {
    return this.nodeEnv === 'production';
  },

  /**
   * Helper to check if running in development
   */
  isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  },

  /**
   * Helper to check if running in test
   */
  isTest(): boolean {
    return this.nodeEnv === 'test';
  },
} as const;

// Validate configuration on module load
// This ensures we fail fast if required variables are missing
try {
  // Trigger validation by accessing required properties
  config.databaseUrl;

  console.log('✓ Environment configuration loaded successfully');
  console.log(`  - Environment: ${config.nodeEnv}`);
  console.log(`  - Port: ${config.port}`);
  console.log(`  - Database: ${config.databaseUrl.substring(0, 20)}...`);
} catch (error) {
  console.error('✗ Environment configuration failed:');
  console.error(error instanceof Error ? error.message : String(error));
  console.error('\nThe application cannot start without proper configuration.');
  process.exit(1);
}

export default config;
