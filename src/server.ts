import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import bookingRoutes from './interfaces/routes';
import { errorMiddleware } from './interfaces/middlewares/errorMiddleware';
import authRoutes from '../src/interfaces/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); 

app.use('/api', bookingRoutes);
app.use('/api/auth', authRoutes);
app.use(errorMiddleware);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'ProBooker API is running gracefully 🚀' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});