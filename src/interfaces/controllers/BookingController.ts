import { Request, Response } from 'express';
import { CreateBooking } from '../../use-cases/CreateBooking';
import { PrismaBookingRepository } from '../../infrastructure/repositories/PrismaBookingrepository';
import { CreateBookingSchema } from '../dtos/CreateBookDTO';
import z from 'zod';

export class BookingController {
  async create(req: Request, res: Response) {
    try {
      // 1. Data validation
      const validatedData = CreateBookingSchema.parse(req.body);

      // 2. The conversion (since Zod assured us that the data was correct)
      const { roomId, userId, startTime, endTime } = validatedData;
      
      const bookingRepository = new PrismaBookingRepository();
      const createBookingUseCase = new CreateBooking(bookingRepository);

      const booking = await createBookingUseCase.execute({
        roomId,
        userId,
        start: new Date(startTime),
        end: new Date(endTime)
      });

      return res.status(201).json({ status: 'success', data: booking });

    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'error',
          errors: error.issues.map((issue: { path: any; message: any; }) => ({
            path: issue.path,
            message: issue.message
          }))
        });
      }

      // Any other error (such as scheduling conflicts or database errors)
      return res.status(400).json({
        status: 'error',
        message: error.message || 'An unexpected error occurred'
      });
    }
  }
}