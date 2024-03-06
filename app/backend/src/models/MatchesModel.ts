//
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { IMatches } from '../Interfaces/Matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  public async getMatches(): Promise<IMatches[] | null> {
    const result = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'] },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (result.length === 0) return null;

    return result;
  }
}
