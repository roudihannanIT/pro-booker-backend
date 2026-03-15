export enum BookingStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export interface Booking {
    id: string;
    roomId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}