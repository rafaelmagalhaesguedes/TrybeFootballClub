import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

export default class TeamRoutes {
  public router: Router;
  private teamController: TeamController;

  constructor() {
    this.router = Router();
    this.teamController = new TeamController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Get all teams
    this.router.get(
      '/',
      (req: Request, res: Response) => this.teamController.getAllTeams(req, res),
    );

    // Get team by id
    this.router.get(
      '/:id',
      (req: Request, res: Response) => this.teamController.getTeamById(req, res),
    );
  }
}
