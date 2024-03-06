//
import MatchesModel from '../models/MatchesModel';
import { IMatchesModel } from '../Interfaces/Matches/IMatchesModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IMatches } from '../Interfaces/Matches/IMatches';

export default class MatchesService {
  //
  constructor(private matchesModel: IMatchesModel = new MatchesModel()) { }

  public async getMatches(): Promise<ServiceResponse<ServiceMessage | IMatches[]>> {
    //
    const matches = await this.matchesModel.findAllMatches();
    if (!matches) return { status: 'NOT_FOUND', data: { message: 'Matches not found' } };

    return { status: 'SUCCESSFUL', data: matches };
  }
}
