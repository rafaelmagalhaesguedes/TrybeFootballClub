//
import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/loginMiddleware';
import Authenticate from '../middlewares/authMiddleware';

const userController = new LoginController();

const router = Router();

// Sign up
router.post(
  '/',
  LoginMiddleware.validateLogin,
  (req: Request, res: Response) => userController.signUp(req, res),
);

// Get role
router.get(
  '/role',
  Authenticate,
  (req: Request, res: Response) => userController.getUserRole(req, res),
);

export default router;
