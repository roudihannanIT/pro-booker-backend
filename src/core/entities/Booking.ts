export enum BookingStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    PENDING = 'pending'
}

export class Booking {
    constructor(
        public id: string,
        public userId: string,
        public roomId: string,
        public startTime: Date,
        public endTime: Date,
        public status: BookingStatus = BookingStatus.CONFIRMED,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}
}