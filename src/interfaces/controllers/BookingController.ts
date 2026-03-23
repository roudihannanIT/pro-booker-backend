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

  async getUserBookings(req: Request, res: Response) {
    try {
      const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
      const repository = new PrismaBookingRepository();
      const bookings = await repository.findByUserId(userId);
      
      return res.status(200).json({ status: 'success', data: bookings });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const repository = new PrismaBookingRepository();

      // 1. Verify that there is a reservation
      const existingBooking = await repository.findById(id);
      if (!existingBooking) {
        return res.status(404).json({ status: 'error', message: 'Booking not found' });
      }

      // 2. Perform deletion
      await repository.delete(id);

      return res.status(200).json({ status: 'success', message: 'Booking cancelled successfully' });
    } catch (error: any) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

}