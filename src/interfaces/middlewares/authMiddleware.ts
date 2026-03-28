import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Extracting the token from the header (usually: Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    // 2. Verify the token using the secret key
    const secret = process.env.JWT_SECRET || 'super-secret-key';
    const decoded = jwt.verify(token, secret);

    // 3. Store user data within the Request for later use.
    (req as any).user = decoded;

    next(); // Allow passage to the next lane
  } catch (error) {
    res.status(403).json({ message: 'Invalid or Expired Token' });
  }
};