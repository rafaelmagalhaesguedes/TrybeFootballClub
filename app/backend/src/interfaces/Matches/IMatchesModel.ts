//
import { IMatches, IMatchesCreate, IMatchesResults } from './IMatches';

export interface IMatchesModel {
  getAllMatches(query?: IMatches['inProgress'] | undefined): Promise<IMatches[] | null>;
  getHomeMatches(id: IMatches['homeTeamId']): Promise<IMatches[] | null>;
  getAwayMatches(id: IMatches['awayTeamId']): Promise<IMatches[] | null>;
  createMatch(match: IMatchesCreate): Promise<IMatches | null>;
  updateMatchProgress(id: IMatches['id']): Promise<IMatches | null>;
  updateMatchResults(id: IMatches['id'], results: IMatchesResults): Promise<IMatches | null>;
}
