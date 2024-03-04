//
import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/loginMiddleware';

const userController = new LoginController();

const router = Router();

// Sign up
router.post(
  '/',
  LoginMiddleware.validateLogin,
  (req: Request, res: Response) => userController.signUp(req, res),
);

export default router;
