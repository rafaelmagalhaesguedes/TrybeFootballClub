import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IMatches, IMatchesCreate, IMatchesResults } from '../Interfaces/Matches/IMatches';

export default class MatchesService {
  // Error messages
  private conflict = 'It is not possible to create a match with two equal teams';
  private teamNotFound = 'There is no team with such id!';
  private matchNotFound = 'Match not found';
  private success = 'The match result has been changed';

  constructor(private matchesModel: IMatchesModel = new MatchesModel()) { }

  public async getMatches(query?: string | undefined): Promise<ServiceResponse<IMatches[]>> {
    //
    const isProgressDefined = query !== undefined;
    const inProgress = query === 'true';

    const matches = isProgressDefined
      ? await this.matchesModel.getAllMatches(inProgress) // inProgress is a boolean
      : await this.matchesModel.getAllMatches(); // inProgress is undefined

    if (matches === null) {
      return { status: 'NOT_FOUND', data: { message: this.matchNotFound } };
    }

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async createMatch(match: IMatchesCreate): Promise<ServiceResponse<IMatches>> {
    //
    if (match.homeTeamId === match.awayTeamId) {
      return { status: 'UNPROCESSABLE_ENTITY', data: { message: this.conflict } };
    }

    const newMatch = await this.matchesModel.createMatch(match);
    if (newMatch === null) { // Team not found
      return { status: 'NOT_FOUND', data: { message: this.teamNotFound } };
    }

    return { status: 'CREATED', data: newMatch };
  }

  public async updateMatchProgress(id: number):
  Promise<ServiceResponse<ServiceMessage | IMatches>> {
    //
    const match = await this.matchesModel.updateMatchProgress(id);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: this.matchNotFound } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchResults(id: number, results: IMatchesResults):
  Promise<ServiceResponse<ServiceMessage | IMatches>> {
    //
    const match = await this.matchesModel.updateMatchResults(id, results);
    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: this.matchNotFound } };
    }

    return { status: 'SUCCESSFUL', data: { message: this.success } };
  }
}
