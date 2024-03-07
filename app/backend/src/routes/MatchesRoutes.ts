import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Authenticate from '../middlewares/authMiddleware';

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

    // Update match progress
    this.router.patch(
      '/:id/finish',
      Authenticate,
      (req: Request, res: Response) => this.matchesController.updateMatchProgress(req, res),
    );

    // Update match results
    this.router.patch(
      '/:id',
      Authenticate,
      (req: Request, res: Response) => this.matchesController.updateMatchResults(req, res),
    );
  }
}
