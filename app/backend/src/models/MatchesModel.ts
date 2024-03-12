import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import SequelizeTeams from '../database/models/SequelizeTeam';
import { IMatches, IMatchesCreate, IMatchesResults } from '../Interfaces/Matches/IMatches';

export default class MatchesModel implements IMatchesModel {
  //
  constructor(
    private matchesModel = SequelizeMatches,
    private teamModel = SequelizeTeams,
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<IMatches[] | null> {
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

  public async getHomeMatches(teamId: number) {
    //
    return this.matchesModel.findAll({
      where: { homeTeamId: teamId, inProgress: false },
    });
  }

  public async getAwayMatches(teamId: number) {
    //
    return this.matchesModel.findAll({
      where: { awayTeamId: teamId, inProgress: false },
    });
  }

  public async createMatch(match: IMatchesCreate): Promise<IMatches | null> {
    //
    const homeTeamExists = await this.teamModel.findOne({ where: { id: match.homeTeamId } });
    if (!homeTeamExists) return null;

    const awayTeamExists = await this.teamModel.findOne({ where: { id: match.awayTeamId } });
    if (!awayTeamExists) return null;

    const newMatch = await this.matchesModel.create({ ...match, inProgress: true });

    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = newMatch;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  public async updateMatchProgress(id: number): Promise<IMatches | null> {
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
