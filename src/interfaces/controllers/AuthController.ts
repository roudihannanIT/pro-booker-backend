import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';

const userRepository = new PrismaUserRepository();
const registerUser = new RegisterUser(userRepository);

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      // Implementing the Use Case
      const user = await registerUser.execute(name, email, password);

      // Responding to the customer (without returning the passwordHash for security)
      res.status(201).json({
        status: 'success',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      next(error);
    }
  }
}