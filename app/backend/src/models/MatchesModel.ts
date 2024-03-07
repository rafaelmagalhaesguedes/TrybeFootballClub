import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeam';
import { IMatches, IMatchesResults } from '../Interfaces/Matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  private matchesModel = SequelizeMatches;
  private teamModel = SequelizeTeams;

  public async findMatches(inProgress?: boolean): Promise<IMatches[] | null> {
    //
    const whereCondition = inProgress !== undefined ? { inProgress } : {};

    const matches = await this.matchesModel.findAll({
      where: whereCondition,
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  public async updateMatch(id: number): Promise<IMatches | null> {
    //
    const match = await this.matchesModel.findByPk(id);
    if (!match) return null;

    const updatedMatch = await match.update({ inProgress: !match.inProgress });
    return updatedMatch;
  }

  public async updateMatchResults(id: number, results: IMatchesResults): Promise<IMatches | null> {
    //
    const match = await this.matchesModel.findByPk(id);
    if (!match) return null;

    const { homeTeamGoals, awayTeamGoals } = results;

    const updatedMatchResults = await match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    return updatedMatchResults;
  }
}
