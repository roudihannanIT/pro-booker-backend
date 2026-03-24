import { Booking } from '../entities/Booking';

export interface IBookingRepository {
    create(booking: Booking): Promise<void>;
    findOverlap(roomId: string, start: Date, end: Date): Promise<any[]>;
    findByUserId(userId: string): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    delete(id: string): Promise<void>;
}