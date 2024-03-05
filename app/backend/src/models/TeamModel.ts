//
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    const teams = dbData.map(({ id, teamName }) => ({ id, teamName }));
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const team = { id: dbData.id, teamName: dbData.teamName };
    return team;
  }
}
