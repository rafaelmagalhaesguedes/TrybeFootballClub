//
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import { ITeam } from '../Interfaces/Team/ITeam';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  //
  constructor(private teamModel: ITeamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ServiceMessage | ITeam[]>> {
    //
    const allTeams = await this.teamModel.getAll();
    if (!allTeams) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ServiceMessage | ITeam>> {
    //
    const team = await this.teamModel.getById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
