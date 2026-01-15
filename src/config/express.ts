import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler';
import { config } from './env';
import { registerRoutes } from '../routes';

/**
 * Configure and return Express application with all middleware
 */
export const configureExpress = (): Application => {
  const app: Application = express();

  // ===== Basic Middleware =====

  // CORS configuration - allow requests from any origin in development
  // In production, you should restrict this to your frontend domain
  const corsOptions = {
    origin: config.isDevelopment() ? '*' : (process.env.CORS_ORIGIN || '*'),
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24 hours
  };
  app.use(cors(corsOptions));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ===== Request Logging Middleware =====

  // Simple custom request logger
  // For production, consider using morgan or a proper logging library
  app.use((req: Request, _res: Response, next: NextFunction) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
  });

  // ===== API Routes =====
  registerRoutes(app);

  // ===== Error Handling =====

  // 404 handler for unmatched routes (must be after all routes)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

// Export configured app instance
export default configureExpress();
