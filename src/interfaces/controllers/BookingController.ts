import { Request, Response } from 'express';
import { CreateBooking } from '../../use-cases/CreateBooking';
import { PrismaBookingRepository } from '../../infrastructure/repositories/PrismaBookingrepository';
import { CreateBookingSchema } from '../dtos/CreateBookDTO';
import z from 'zod';

export class BookingController {

  getUserBookings = async (req: Request, res: Response) => {
    const { userId } = req.params;
    
    if (typeof userId !== 'string') throw new Error('Invalid user ID');
    
    const repository = new PrismaBookingRepository();
    const bookings = await repository.findByUserId(userId);
    
    res.status(200).json({ status: 'success', data: bookings });
  };

  create = async (req: Request, res: Response) => {
    const validatedData = CreateBookingSchema.parse(req.body);
    const repository = new PrismaBookingRepository();
    const createBookingUseCase = new CreateBooking(repository);

    const booking = await createBookingUseCase.execute({
      roomId: validatedData.roomId,
      userId: validatedData.userId,
      start: new Date(validatedData.startTime),
      end: new Date(validatedData.endTime)
    });

    res.status(201).json({ status: 'success', data: booking });
  };

  cancel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const repository = new PrismaBookingRepository();
    
    if (typeof id !== 'string') throw new Error('Invalid booking ID');
    
    const existingBooking = await repository.findById(id);
    if (!existingBooking) throw new Error('Booking not found');

    await repository.delete(id);
    res.status(200).json({ status: 'success', message: 'Booking cancelled' });
  };
}