import { NextFunction, Request, Response } from 'express';
import JwtService from '../utils/JwtService';

const errorMessage = 'Token must be a valid token';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  //
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  const token = JwtService.splitToken(authorization);
  if (!token) return res.status(401).json({ message: errorMessage });

  const payload = JwtService.verifyToken(token);
  if (!payload) return res.status(401).json({ message: errorMessage });

  res.locals.user = payload;

  next();
}
