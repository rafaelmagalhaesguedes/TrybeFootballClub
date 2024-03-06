import { Router } from 'express';
import TeamRoutes from './TeamRoutes';
import LoginRoutes from './LoginRoutes';
import MatchesRoutes from './MatchesRoutes';

export default class MainRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/teams', new TeamRoutes().router);
    this.router.use('/login', new LoginRoutes().router);
    this.router.use('/matches', new MatchesRoutes().router);
  }
}
