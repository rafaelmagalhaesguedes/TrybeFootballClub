import { IMatches, IMatchesResults } from './IMatches';

export interface IMatchesModel {
  findMatches(query?: IMatches['inProgress'] | undefined): Promise<IMatches[] | null>;
  updateMatch(id: IMatches['id']): Promise<IMatches | null>;
  updateMatchResults(id: IMatches['id'], results: IMatchesResults): Promise<IMatches | null>;
}
