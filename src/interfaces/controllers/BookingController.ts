import { Request, Response } from 'express';
import { CreateBooking } from '../../use-cases/booking/CreateBooking';
import { GetUserBookings } from '../../use-cases/booking/GetUserBookings';
import { CancelBooking } from '../../use-cases/booking/CancelBooking';
import { PrismaBookingRepository } from '../../infrastructure/repositories/PrismaBookingrepository';

export class BookingController {
    // 1. create booking
    create = async (req: Request, res: Response) => {
        const repository = new PrismaBookingRepository();
        const useCase = new CreateBooking(repository);

        const booking = await useCase.execute({
            roomId: req.body.roomId,
            userId: req.body.userId,
            start: new Date(req.body.startTime),
            end: new Date(req.body.endTime)
        });

        res.status(201).json({ status: 'success', data: booking });
    };

    // 2. get user bookings 
    getUserBookings = async (req: Request, res: Response) => {
        const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
        const repository = new PrismaBookingRepository();
        const useCase = new GetUserBookings(repository);

        const bookings = await useCase.execute(userId);
        res.status(200).json({ status: 'success', data: bookings });
    };

    // 3. Cancel booking
    cancel = async (req: Request, res: Response) => {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const repository = new PrismaBookingRepository();
        const useCase = new CancelBooking(repository);

        await useCase.execute(id);
        res.status(200).json({ status: 'success', message: 'Booking deleted successfully' });
    };
}