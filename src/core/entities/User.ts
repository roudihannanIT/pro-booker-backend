export enum UserRole {
    ADMIN = 'admin',
    EMPLOYEE = 'employee',
}

export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}