import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { GetUserBookings } from './GetUserBookings';
import { IBookingRepository } from '../../core/repositories/IBookingRepository';
import { Booking, BookingStatus } from '../../core/entities/Booking';

describe('GetUserBookings UseCase Unit Tests', () => {
    let mockBookingRepository: jest.Mocked<IBookingRepository>;
    let getUserBookingsUseCase: GetUserBookings;

    beforeEach(() => {
        mockBookingRepository = {
            create: jest.fn(),
            findByUserId: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            findOverlap: jest.fn(), 
        } as unknown as jest.Mocked<IBookingRepository>;

        getUserBookingsUseCase = new GetUserBookings(mockBookingRepository);
    });

    test('Should return all bookings for a given userId', async () => {
        const userId = 'user-123';
        const mockBookings: Booking[] = [
            {
                id: 'b-1',
                roomId: 'room-101',
                userId,
                startTime: new Date(),
                endTime: new Date(),
                status: BookingStatus.CONFIRMED,
                createdAt: new Date(), 
                updatedAt: new Date()  
            },
            {
                id: 'b-2',
                roomId: 'room-102',
                userId,
                startTime: new Date(),
                endTime: new Date(),
                status: BookingStatus.CONFIRMED,
                createdAt: new Date(), 
                updatedAt: new Date() 
            },
        ];

        mockBookingRepository.findByUserId.mockResolvedValue(mockBookings);

        const result = await getUserBookingsUseCase.execute(userId);

        expect(result).toHaveLength(2);
        expect(result).toEqual(mockBookings);
        expect(mockBookingRepository.findByUserId).toHaveBeenCalledWith(userId);
    });

    test('Should return an empty array if user has no bookings', async () => {
        const userId = 'user-with-no-bookings';

        mockBookingRepository.findByUserId.mockResolvedValue([]);

        const result = await getUserBookingsUseCase.execute(userId);

        expect(result).toEqual([]);
        expect(mockBookingRepository.findByUserId).toHaveBeenCalledWith(userId);
    });
});