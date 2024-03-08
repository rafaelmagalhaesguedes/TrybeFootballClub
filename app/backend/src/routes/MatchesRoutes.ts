import { Request, Router, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import Authenticate from '../middlewares/authMiddleware';

export default class MatchesRoutes {
  public router: Router;
  private matches: MatchesController;

  constructor() {
    this.router = Router();
    this.matches = new MatchesController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all matches
    this.router.get('/', (req: Request, res: Response) => this.matches.getAllMatches(req, res));

    // Create match
    this.router.post(
      '/',
      Authenticate,
      (req: Request, res: Response) => this.matches.createMatch(req, res),
    );

    // Update match progress
    this.router.patch(
      '/:id/finish',
      Authenticate,
      (req: Request, res: Response) => this.matches.updateMatchProgress(req, res),
    );

    // Update match results
    this.router.patch(
      '/:id',
      Authenticate,
      (req: Request, res: Response) => this.matches.updateMatchResults(req, res),
    );
  }
}
