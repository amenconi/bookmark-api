import { config } from './config/env';
import app from './config/express';
import { connectDatabase, disconnectDatabase } from './utils/prisma';

/**
 * Start the Express server
 */
const startServer = async (): Promise<void> => {
  try {
    // Initialize and verify database connection
    console.log('Initializing database connection...');
    await connectDatabase();

    // Start the server
    const server = app.listen(config.port, () => {
      console.log(`✓ Server is running on port ${config.port}`);
      console.log(`  - Environment: ${config.nodeEnv}`);
      console.log(`  - Health check: http://localhost:${config.port}/health`);
    });

    // Graceful shutdown handler
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);

      // Stop accepting new connections
      server.close(async () => {
        console.log('✓ HTTP server closed');

        try {
          // Disconnect from database
          await disconnectDatabase();
          console.log('✓ Graceful shutdown completed');
          process.exit(0);
        } catch (error) {
          console.error('✗ Error during shutdown:', error);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('✗ Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('✗ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
