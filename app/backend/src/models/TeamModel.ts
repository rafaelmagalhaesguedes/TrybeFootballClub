//
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../interfaces/Team/ITeam';
import { ITeamModel } from '../interfaces/Team/ITeamModel';

export default class TeamModel implements ITeamModel {
  //
  constructor(private model = SequelizeTeam) {}

  public async getAll(): Promise<ITeam[]> {
    //
    const allTeams = await this.model.findAll();
    const teams = allTeams.map(({ id, teamName }) => ({ id, teamName }));
    return teams;
  }

  public async getById(id: ITeam['id']): Promise<ITeam | null> {
    //
    const team = await this.model.findByPk(id);
    if (!team) return null;

    const { teamName } = team;
    return { id, teamName };
  }
}
