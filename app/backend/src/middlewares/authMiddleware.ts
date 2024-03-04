import { Request, Response, NextFunction } from 'express';
import JwtService from '../utils/JwtService';

export default class AuthMiddleware {
  static authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: { message: 'Token not found' } });
    }

    try {
      const user = JwtService.verify(token);
      req.body.user = { user };
      next();
    } catch (error) {
      return res.status(401).json({ error: { message: 'Expired or invalid token' } });
    }
  }
}
