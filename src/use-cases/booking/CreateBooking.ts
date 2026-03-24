import { Booking, BookingStatus } from '../../core/entities/Booking';
import { IBookingRepository } from '../../core/repositories/IBookingRepository';

export class CreateBooking {
    // Dependency Injection via constructor
    constructor(private bookingRepository: IBookingRepository) {}

    async execute(data: { roomId: string; userId: string; start: Date; end: Date }): Promise<Booking> {
        // 1. Check appointments
        if (data.end <= data.start) {
            throw new Error('End time must be after start time');
        }

        // 2. Check for overlap (using the repository)
        const existingBookings = await this.bookingRepository.findOverlap(
            data.roomId,
            data.start,
            data.end
        );

        if (existingBookings.length > 0) {
            throw new Error('This room is already booked for the selected time');
        }

        // 3. Prepare the reservation object
        const newBooking = new Booking(
            Math.random().toString(36).substr(2, 9),
            data.userId,
            data.roomId,
            data.start,
            data.end
        );

        // 4. Saving to the database via the interface
        await this.bookingRepository.create(newBooking);

        return newBooking;
    }
}