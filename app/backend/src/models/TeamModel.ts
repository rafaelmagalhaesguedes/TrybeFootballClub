//
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll(); // Rethink the weight of this operation using cache
    const teams = dbData.map(({ id, teamName }) => ({ id, teamName }));
    return teams;
  }
}
