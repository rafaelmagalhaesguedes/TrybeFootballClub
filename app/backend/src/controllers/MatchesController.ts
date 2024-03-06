//
import { Request, Response } from 'express';
import statusCode from '../utils/MapStatusCode';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  //
  constructor(private matchesService = new MatchesService()) { }

  public async getAllMatches(_req: Request, res: Response): Promise<Response | void> {
    const { status, data } = await this.matchesService.getMatches();
    res.status(statusCode(status)).json(data);
  }
}
