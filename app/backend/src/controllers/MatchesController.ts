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

  public async createMatch(req: Request, res: Response): Promise<Response | void> {
    //
    const match = req.body;
    const { status, data } = await this.matchesService.createMatch(match);
    res.status(statusCode(status)).json(data);
  }

  public async updateMatchProgress(req: Request, res: Response): Promise<Response | void> {
    //
    const { id } = req.params;
    const matchId = Number(id); // Transform id to a number

    const { status, data } = await this.matchesService.updateMatchProgress(matchId);
    res.status(statusCode(status)).json(data);
  }

  public async updateMatchResults(req: Request, res: Response): Promise<Response | void> {
    //
    const { id } = req.params;
    const { body } = req;
    const { status, data } = await this.matchesService.updateMatchResults(Number(id), body);
    res.status(statusCode(status)).json(data);
  }
}
