//
import { Request, Response } from 'express';
import statusCode from '../utils/MapStatusCode';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  //
  constructor(private matchesService = new MatchesService()) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response | void> {
    //
    const { inProgress } = req.query;
    const query = inProgress as string | undefined; // inProgress is a string or undefined, trust me

    const { status, data } = await this.matchesService.getMatches(query);
    res.status(statusCode(status)).json(data);
  }
}
