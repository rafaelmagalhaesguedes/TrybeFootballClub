import { IMatches } from './IMatches';

export interface IMatchesModel {
  findMatches(query?: boolean | undefined): Promise<IMatches[] | null>;
}
