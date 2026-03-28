import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Welcome to your private profile!', user: (req as any).user });
});

export default router;