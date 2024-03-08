import { Request, Router, Response } from 'express';
import LeaderController from '../controllers/LeaderBoardController';

export default class LeaderBoarderRoutes {
  public router: Router;
  private leaderController: LeaderController;

  constructor() {
    this.router = Router();
    this.leaderController = new LeaderController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      '/home',
      (req: Request, res: Response) => this.leaderController.leaderBoardHome(req, res),
    );

    this.router.get(
      '/away',
      (req: Request, res: Response) => this.leaderController.leaderBoardAway(req, res),
    );
  }
}
