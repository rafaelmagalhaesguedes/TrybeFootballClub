//
import { ITeam } from '../Interfaces/Team/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  //
  constructor(private teamModel: ITeamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const allTeams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
