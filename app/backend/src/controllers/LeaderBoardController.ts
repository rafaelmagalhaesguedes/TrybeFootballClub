//
import { Request, Response } from 'express';
import LeaderService from '../services/LeaderBoardService';
import statusCode from '../utils/MapStatusCode';

export default class LeaderController {
  //
  constructor(private leaderService = new LeaderService()) { }

  public async leaderBoardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderService.getHomeLeaderBoard();
    res.status(statusCode(status)).json(data);
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderService.getAwayLeaderBoard();
    res.status(statusCode(status)).json(data);
  }

  public async leaderBoard(_req: Request, res: Response) {
    const { status, data } = await this.leaderService.getLeaderBoard();
    res.status(statusCode(status)).json(data);
  }
}
