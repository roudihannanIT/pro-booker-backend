import bcrypt from 'bcrypt';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { User } from '../../core/entities/User';
import { UserRole } from '../../core/entities/User';

export class RegisterUser {
  constructor(private userRepository: IUserRepository) {}

  async execute(name: string, email: string, password: string) {
    // 1. Ensure the user does not already exist.
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // 2. Password encryption (Hashing)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3. Creating an Entity
    const newUser = new User(
      crypto.randomUUID(),
      name,
      email,
      passwordHash,
      UserRole.EMPLOYEE
    );

    // 4. Save to database
    return await this.userRepository.create(newUser);
  }
}