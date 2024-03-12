//
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../Interfaces/Team/ITeam';
import { ITeamModel } from '../Interfaces/Team/ITeamModel';

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

  public async getHomeAndAwayTeams(): Promise<ITeam[]> {
    //
    const matches = await this.model.findAll({
      include: [
        { model: SequelizeMatches, as: 'homeMatches', where: { inProgress: false } },
        { model: SequelizeMatches, as: 'awayMatches', where: { inProgress: false } },
      ],
    });

    return matches;
  }
}
