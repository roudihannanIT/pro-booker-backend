import { CreateBooking } from './CreateBooking';
import { IBookingRepository } from '../../core/repositories/IBookingRepository';
import { Booking, BookingStatus } from '../../core/entities/Booking';

describe('CreateBooking UseCase Unit Tests', () => {
    let mockBookingRepository: jest.Mocked<IBookingRepository>;
    let createBookingUseCase: CreateBooking;

    beforeEach(() => {
        mockBookingRepository = {
            create: jest.fn(),
            findByUserId: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            findOverlap: jest.fn(),
        };

        createBookingUseCase = new CreateBooking(mockBookingRepository);
    });

    test('Should successfully create a booking when there are no time overlaps', async () => {
        const bookingData = {
            roomId: 'room-101',
            userId: 'user-123',
            start: new Date('2026-10-01T10:00:00.000Z'),
            end: new Date('2026-10-01T12:00:00.000Z')
        };

        mockBookingRepository.findOverlap.mockResolvedValue([]);
        
        const createdBooking: Booking = {
            id: 'booking-id-1',
            roomId: bookingData.roomId,
            userId: bookingData.userId,
            startTime: bookingData.start,
            endTime: bookingData.end,
            status: BookingStatus.CONFIRMED, 
            createdAt: new Date(),
            updatedAt: new Date()
        };
        mockBookingRepository.create.mockResolvedValue(undefined);

        const result = await createBookingUseCase.execute(bookingData);

        expect(typeof result.id).toBe('string');
        expect(result.id).toEqual(expect.any(String));
        expect(mockBookingRepository.findOverlap).toHaveBeenCalledWith(
            bookingData.roomId,
            bookingData.start,
            bookingData.end
        );
        expect(mockBookingRepository.create).toHaveBeenCalledTimes(1);
    });

    test('Should throw an error if a room is already booked in the selected timeframe', async () => {
        const bookingData = {
            roomId: 'room-101',
            userId: 'user-456',
            start: new Date('2026-10-01T11:00:00.000Z'),
            end: new Date('2026-10-01T13:00:00.000Z')
        };

        const existingBooking: Booking = {
            id: 'existing-booking',
            roomId: bookingData.roomId,
            userId: 'user-123',
            startTime: new Date('2026-10-01T10:00:00.000Z'),
            endTime: new Date('2026-10-01T12:00:00.000Z'),
            status: BookingStatus.CONFIRMED, 
            createdAt: new Date(),
            updatedAt: new Date()
        };
        mockBookingRepository.findOverlap.mockResolvedValue([existingBooking]);

        await expect(createBookingUseCase.execute(bookingData)).rejects.toThrow(
            'This room is already booked for the selected time'
        );

        expect(mockBookingRepository.create).not.toHaveBeenCalled();
    });
});