import { Request, Router, Response } from 'express';
import LoginController from '../controllers/LoginController';
import LoginMiddleware from '../middlewares/loginMiddleware';
import Authenticate from '../middlewares/authMiddleware';

export default class LoginRoutes {
  public router: Router;
  private userController: LoginController;

  constructor() {
    this.router = Router();
    this.userController = new LoginController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Sign up
    this.router.post(
      '/',
      LoginMiddleware,
      (req: Request, res: Response) => this.userController.signUp(req, res),
    );

    // Get role
    this.router.get(
      '/role',
      Authenticate,
      (req: Request, res: Response) => this.userController.getUserRole(req, res),
    );
  }
}
