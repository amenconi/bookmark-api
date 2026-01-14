import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from '../middleware/errorHandler';
import { config } from './env';

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

  // ===== Health Check Endpoint =====

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // ===== API Routes =====
  // TODO: Add your API routes here
  // Example: app.use('/api/bookmarks', bookmarkRoutes);

  // ===== Error Handling =====

  // 404 handler for unmatched routes (must be after all routes)
  app.use(notFoundHandler);

  // Global error handler (must be last)
  app.use(errorHandler);

  return app;
};

// Export configured app instance
export default configureExpress();
