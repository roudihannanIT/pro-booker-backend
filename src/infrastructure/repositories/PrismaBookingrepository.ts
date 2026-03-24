import { PrismaClient } from '@prisma/client';
import { Booking } from '../../core/entities/Booking';
import { IBookingRepository } from '../../core/repositories/IBookingRepository';

const prisma = new PrismaClient();

export class PrismaBookingRepository implements IBookingRepository {
    async create(booking: Booking): Promise<void> {
        await prisma.booking.create({
            data: {
                id: booking.id,
                userId: booking.userId,
                roomId: booking.roomId,
                startTime: booking.startTime,
                endTime: booking.endTime,
                status: booking.status,
            },
        });
    }

    async findOverlap(roomId: string, start: Date, end: Date): Promise<any[]> {
        return await prisma.booking.findMany({
            where: {
                roomId,
                OR: [
                    { startTime: { lt: end }, endTime: { gt: start } },
                ],
            },
        });
    }

    async findByUserId(userId: string): Promise<any[]> {
        return await prisma.booking.findMany({
            where: { userId },
            include: { user: { select: { name: true, email: true } } }
        });
    }

    async findById(id: string): Promise<any | null> {
        return await prisma.booking.findUnique({ where: { id } });
    }

    async delete(id: string): Promise<void> {
        await prisma.booking.delete({ where: { id } });
    }
}