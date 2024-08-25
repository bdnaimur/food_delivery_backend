import express from 'express';
import morgan from 'morgan';
import winston from 'winston';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/config.js';
import userRoutes from './routes/userRoutes.js'
import auditRoutes from './routes/auditRoutes.js'
import category from './routes/categoryRoutes.js'
import subCategories from './routes/subCategoryRoutes.js'
import errorHandler from './middlewares/errorHandler.js';
import menuItem from './routes/menuItemRoutes.js';
import restaurant from './routes/restaurantRoutes.js';

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(morgan('combined'));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
});
app.use(limiter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/category', category);
app.use('/api/subCategories', subCategories);
app.use('/api/menuItem', menuItem);
app.use('/api/restaurant', restaurant);


// Error Handling
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
