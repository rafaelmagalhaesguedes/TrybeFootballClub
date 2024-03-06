import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

export default class MatchesRoutes {
  public router: Router;
  private matchesController: MatchesController;

  constructor() {
    this.router = Router();
    this.matchesController = new MatchesController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all matches
    this.router.get(
      '/',
      (req: Request, res: Response) => this.matchesController.getAllMatches(req, res),
    );
  }
}
