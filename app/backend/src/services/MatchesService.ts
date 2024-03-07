import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IMatches, IMatchesResults } from '../Interfaces/Matches/IMatches';

export default class MatchesService {
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) { }

  public async getMatches(query?: string | undefined):
  Promise<ServiceResponse<ServiceMessage | IMatches[]>> {
    //
    const isProgressDefined = query !== undefined;
    const inProgress = query === 'true';

    const matches = isProgressDefined
      ? await this.matchesModel.findMatches(inProgress) // inProgress is a boolean
      : await this.matchesModel.findMatches(); // inProgress is undefined

    if (matches === null) {
      return { status: 'NOT_FOUND', data: { message: 'No matches found' } };
    }

    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateMatch(id: number): Promise<ServiceResponse<ServiceMessage | IMatches>> {
    //
    const match = await this.matchesModel.updateMatch(id);

    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchResults(id: number, results: IMatchesResults):
  Promise<ServiceResponse<ServiceMessage | IMatches>> {
    //
    const match = await this.matchesModel.updateMatchResults(id, results);

    if (match === null) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'The match result has been changed' } };
  }
}
