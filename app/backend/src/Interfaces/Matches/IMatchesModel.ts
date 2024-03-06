import { IMatches } from './IMatches';

export interface IMatchesModel {
  getMatches(): Promise<IMatches[] | null>;
}
