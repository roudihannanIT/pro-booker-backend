import {Book} from '../entities/Book';

export interface IBookingRepository {
    create(booking: Book): Promise<void>;
    findOverlap(roomId: string, start: Date, end: Date): Promise<Book | null>;
}