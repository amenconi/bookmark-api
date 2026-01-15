import { Application } from 'express';
import healthRouter from './health';

export const registerRoutes = (app: Application): void => {
  app.use('/health', healthRouter);
};
