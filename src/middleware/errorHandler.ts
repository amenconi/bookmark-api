import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';

/**
 * Custom error class with status code
 */
export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global error handling middleware
 * Catches all errors and returns consistent error responses
 */
export const errorHandler = (
  err: Error | HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Default to 500 Internal Server Error
  const statusCode = (err as HttpError).statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log error for debugging (in production, use a proper logger)
  console.error('Error:', {
    statusCode,
    message,
    stack: config.isDevelopment() ? err.stack : undefined,
  });

  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(config.isDevelopment() && { stack: err.stack }),
    },
  });
};

/**
 * 404 Not Found handler
 * Catches all unmatched routes
 */
export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = new HttpError(404, `Route ${req.method} ${req.path} not found`);
  next(error);
};
