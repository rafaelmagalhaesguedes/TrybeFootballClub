//
import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import statusCode from '../utils/MapStatusCode';

export default class TeamController {
  //
  constructor(private teamService = new TeamService()) { }

  public async getAllTeams(_req: Request, res: Response): Promise<Response | void> {
    const { status, data } = await this.teamService.getAllTeams();
    res.status(statusCode(status)).json(data);
  }

  public async getTeamById(req: Request, res: Response): Promise<Response | void> {
    const { id } = req.params;
    const { status, data } = await this.teamService.getTeamById(Number(id));
    res.status(statusCode(status)).json(data);
  }
}
