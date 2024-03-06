//
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  public async findAll(): Promise<ITeam[]> {
    //
    const dbData = await this.model.findAll();

    const teams = dbData.map(({ id, teamName }) => ({ id, teamName }));

    return teams;
  }

  public async findById(id: ITeam['id']): Promise<ITeam | null> {
    //
    const team = await this.model.findByPk(id);
    if (!team) return null;

    const { teamName } = team;

    return { id, teamName };
  }
}
