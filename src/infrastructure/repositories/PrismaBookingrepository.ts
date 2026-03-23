import {prisma} from "../database/prisma";
import { PrismaClient } from '@prisma/client';
import { Booking } from '../../core/entities/Book'; 
import { IBookingRepository } from '../../core/repositories/IBookingRepository';

export class PrismaBookingRepository implements IBookingRepository {
  
  // Save a new reservation in the database
  async create(booking: Booking): Promise<void> {
    await prisma.booking.create({
      data: {
        id: booking.id,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
        userId: booking.userId,
        roomId: booking.roomId,
      },
    });
  }

  // Search for any booking that conflicts with the required time
  async findOverlap(roomId: string, start: Date, end: Date): Promise<Booking | null> {
    const overlap = await prisma.booking.findFirst({
      where: {
        roomId: roomId,
        status: 'CONFIRMED',
        OR: [
          {
            // Case 1: The new booking starts within an existing booking
            startTime: { lte: start },
            endTime: { gt: start },
          },
          {
            // Case 2: The new booking expires within an existing booking
            startTime: { lt: end },
            endTime: { gte: end },
          },
          {
            // Case 3: The new booking contains an entire old booking.
            startTime: { gte: start },
            endTime: { lte: end },
          }
        ],
      },
    });

    // Converting the result from Prisma format to Entity format
    if (!overlap) return null;
    
    return overlap as unknown as Booking; 
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { startTime: 'asc' } 
    });
    return bookings as unknown as Booking[];
  }

  async delete(id: string): Promise<void> {
    await prisma.booking.delete({
      where: { id }
    });
  }

  async findById(id: string): Promise<Booking | null> {
    const booking = await prisma.booking.findUnique({
      where: { id }
    });
    return booking as unknown as Booking | null;
  }

}
