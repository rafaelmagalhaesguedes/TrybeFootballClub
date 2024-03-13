//
import { ITeam } from '../Team/ITeam';
import { ILeaderBoard } from './ILeaderBoard';

export interface ILeaderBoardModel {
  getHomeAndAwayTeams(): Promise<ITeam[]>;
  getTeamStats(team: ITeam): Promise<ILeaderBoard>;
  getHomeTeamStats(team: ITeam): Promise<ILeaderBoard>;
  getAwayTeamStats(team: ITeam): Promise<ILeaderBoard>;
}
