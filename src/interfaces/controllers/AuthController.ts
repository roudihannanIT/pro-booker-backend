import { Request, Response, NextFunction } from 'express';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { PrismaUserRepository } from '../../infrastructure/repositories/PrismaUserRepository';
import { LoginUser } from '../../use-cases/auth/LoginUser';

const userRepository = new PrismaUserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);

export class AuthController {

  // Register
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

  // Login
  async login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await loginUser.execute(email, password);

    res.status(200).json({
      status: 'success',
      ...result
    });
  } catch (error: any) {
    next(error);
  }
}
}