import { Request, Response } from "express";
import { CreateBooking } from "../../use-cases/CreateBooking";
import { PrismaBookingRepository } from "../../infrastructure/repositories/PrismaBookingrepository";

export class BookingController {
    async create(req: Request, res: Response) {
        try {
            const {roomId, userId, startTime, endTime} = req.body;

            if (!startTime || !endTime) {
                return res.status(400).json({ status: "error", message: "startTime and endTime are required" });
            }

            // 1. Converting incoming text into dates (Date Objects)
            const start = new Date(startTime);
            const end = new Date(endTime);

            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                return res.status(400).json({ 
                    status: "error", 
                    message: "Invalid date format. Please use ISO 8601 (e.g., 2026-03-22T10:00:00Z)" 
                });
            }

            // 2. Preparing the Repository and Use Case
            const bookingRepository = new PrismaBookingRepository();
            const createBookingUseCase = new CreateBooking(bookingRepository);

            // 3. Implementation
            const booking = await createBookingUseCase.execute({
                roomId,
                userId,
                start: start,
                end: end
            });

            // 4. Reply with success
            return res.status(201).json({
                status: 'success',
                data: booking
            });
            
        } catch (error: any) {
            // 5. Handling errors (such as scheduling conflicts)
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }
}