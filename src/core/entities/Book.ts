export enum BookingStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}

export interface Book {
    id: string;
    roomId: string;
    userId: string;
    startTime: Date;
    endTime: Date;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}