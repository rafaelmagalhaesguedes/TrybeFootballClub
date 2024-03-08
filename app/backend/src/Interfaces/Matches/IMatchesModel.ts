import { IMatches, IMatchesCreate, IMatchesResults } from './IMatches';

export interface IMatchesModel {
  findMatches(query?: IMatches['inProgress'] | undefined): Promise<IMatches[] | null>;
  createMatch(match: IMatchesCreate): Promise<IMatches | null>;
  updateMatchProgress(id: IMatches['id']): Promise<IMatches | null>;
  updateMatchResults(id: IMatches['id'], results: IMatchesResults): Promise<IMatches | null>;
}
