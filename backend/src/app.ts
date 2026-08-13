import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.config';
import { sendResponse } from './utils/response';
import { errorMiddleware } from './middlewares/error.middleware';

const app: Application = express();

// Security Middlewares
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.config';

// Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', routes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  sendResponse(res, 200, true, 'API is running');
});

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  sendResponse(res, 404, false, 'Route not found');
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
