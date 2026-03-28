import { PrismaClient } from '@prisma/client';
import { IUserRepository } from '../../core/repositories/IUserRepository';
import { User, UserRole } from '../../core/entities/User';

export class PrismaUserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(user: User): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        role: user.role,
      },
    });
    return { ...result, role: result.role as UserRole };
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } }) as User | null;
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } }) as User | null;
  }
}