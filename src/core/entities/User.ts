export enum UserRole {
    ADMIN = 'ADMIN',  
    EMPLOYEE = 'EMPLOYEE',
}

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public passwordHash: string,
        public role: UserRole = UserRole.EMPLOYEE,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {}
}