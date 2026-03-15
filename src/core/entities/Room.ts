export interface Room {
    id: string;
    name: string;
    capacity: number;
    features: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}