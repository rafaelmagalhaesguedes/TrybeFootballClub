//
import { ITeam } from '../Interfaces/Team/ITeam';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  //
  constructor(private teamModel: ITeamModel = new TeamModel()) { }

  public async getAllTeams(): Promise<ServiceResponse<ServiceMessage | ITeam[]>> {
    //
    const allTeams = await this.teamModel.findAll();
    if (!allTeams) return { status: 'NOT_FOUND', data: { message: 'Teams not found' } };

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ServiceMessage | ITeam>> {
    //
    const team = await this.teamModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
