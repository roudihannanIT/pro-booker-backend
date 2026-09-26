import { CancelBooking } from './CancelBooking';
import { IBookingRepository } from '../../core/repositories/IBookingRepository';
import { Booking, BookingStatus } from '../../core/entities/Booking';

describe('CancelBooking UseCase Unit Tests', () => {
    let mockBookingRepository: jest.Mocked<IBookingRepository>;
    let cancelBookingUseCase: CancelBooking;

    beforeEach(() => {
        mockBookingRepository = {
            create: jest.fn(),
            findByUserId: jest.fn(),
            findById: jest.fn(),
            delete: jest.fn(),
            findOverlap: jest.fn(),
        };

        cancelBookingUseCase = new CancelBooking(mockBookingRepository);
    });

    test('Should successfully cancel an existing booking', async () => {
        const bookingId = 'booking-123';
        const existingBooking: Booking = {
            id: bookingId,
            roomId: 'room-101',
            userId: 'user-123',
            startTime: new Date(),
            endTime: new Date(),
            status: BookingStatus.CONFIRMED,
            createdAt: new Date(),
            updatedAt: new Date()
        };


        mockBookingRepository.findById.mockResolvedValue(existingBooking);
        mockBookingRepository.delete.mockResolvedValue();

        await cancelBookingUseCase.execute(bookingId);

        expect(mockBookingRepository.findById).toHaveBeenCalledWith(bookingId);
        expect(mockBookingRepository.delete).toHaveBeenCalledWith(bookingId);
    });

    test('Should throw an error if booking to cancel is not found', async () => {
        const bookingId = 'non-existing-id';

        mockBookingRepository.findById.mockResolvedValue(null);

        await expect(cancelBookingUseCase.execute(bookingId)).rejects.toThrow(
            'Booking not found'
        );

        expect(mockBookingRepository.delete).not.toHaveBeenCalled();
    });
});