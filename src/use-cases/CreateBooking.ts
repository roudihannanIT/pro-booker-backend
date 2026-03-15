import {Booking, BookingStatus} from '../core/entities/Book';
import {IBookingRepository} from '../core/repositories/IBookingRepository';

export class CreateBooking {
    constructor(private bookingRepository: IBookingRepository) {}

    async execute(data: {roomId: string; userId: string; start: Date; end: Date}): Promise<Booking> {

        // The end time cannot be before the start time
        if (data.end <= data.start) {
            throw new Error('End time must be after start time');
        }

        // Checking for any scheduling conflicts
        const existingBooking = await this.bookingRepository.findOverlap(
            data.roomId,
            data.start,
            data.end
        );

        // Prepare the booking
        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9), // Simple ID generation
            roomId: data.roomId,
            userId: data.userId,
            startTime: data.start,
            endTime: data.end,
            status: BookingStatus.CONFIRMED,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Save in "Repository"
        await this.bookingRepository.create(newBooking);

        return newBooking;
    }
}