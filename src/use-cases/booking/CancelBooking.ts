import { IBookingRepository } from '../../core/repositories/IBookingRepository';

export class CancelBooking {
    constructor(private bookingRepository: IBookingRepository) {}

    async execute(id: string) {
        const booking = await this.bookingRepository.findById(id);
        
        if (!booking) {
            throw new Error('Booking not found');
        }

        await this.bookingRepository.delete(id);
        return true;
    }
}