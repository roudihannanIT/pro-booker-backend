import {Booking} from '../entities/Book';

export interface IBookingRepository {
    create(booking: Booking): Promise<void>;
    findOverlap(roomId: string, start: Date, end: Date): Promise<Booking | null>;
}