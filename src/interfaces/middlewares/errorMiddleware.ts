// src/interfaces/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const errorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(" [Error Log]:", error.message);

  // 1. Validation (Zod) errors
  if (error instanceof z.ZodError) {
    return res.status(400).json({
      status: 'error',
      errors: error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message
      }))
    });
  }

  // 2. Business logic errors (such as overlapping appointments or lack of booking)
  if (error instanceof Error && (error.message.includes('booked') || error.message.includes('not found'))) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }

  // 3. Any unexpected error (Database crash, etc.)
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};