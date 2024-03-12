import { ITeam } from './ITeam';

export interface ITeamModel {
  getAll(): Promise<ITeam[]>;
  getById(id: ITeam['id']): Promise<ITeam | null>;
  getHomeAndAwayTeams(): Promise<ITeam[]>;
}
