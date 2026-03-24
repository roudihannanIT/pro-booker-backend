import { IBookingRepository } from '../../core/repositories/IBookingRepository';

export class GetUserBookings {
    constructor(private bookingRepository: IBookingRepository) {}

    async execute(userId: string) {
        return await this.bookingRepository.findByUserId(userId);
    }
}