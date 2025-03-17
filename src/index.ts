import express from 'express';
import healthRoutes from './routes/health';
import connectDB from './config/db';
import cors from 'cors';
import beansRouter from './routes/beans';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

// Connect to MongoDB
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  })
);
app.use(express.json());
app.use('/api', healthRoutes);
app.use('/api', beansRouter);

// Basic error handling for routes
// Define error handler with proper Express types
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Add a default route for the root path
app.get('/', (req, res) => {
  res.send('BrewNotes API is running');
});

app
  .listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  })
  .on('error', (err) => {
    console.error('Failed to start server:', err);
  });
