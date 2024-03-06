//
import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeam';
import { IMatches } from '../Interfaces/Matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  private matchesModel = SequelizeMatches;
  private teamModel = SequelizeTeams;

  public async findAllMatches(): Promise<IMatches[] | null> {
    const matches = await this.matchesModel.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (matches.length === 0) return null;

    return matches;
  }
}
