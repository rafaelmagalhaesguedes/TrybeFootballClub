//
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import LeaderBoardModel from '../models/LeaderBoardModel';
import Sort from '../utils/SortMatches';

export default class LeaderBoardService extends LeaderBoardModel {
  //
  public async getLeaderBoard(): Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    try {
      const teams = await this.getHomeAndAwayTeams();
      const teamStatsPromises = teams.map((team) => this.getTeamStats(team));
      const teamStats = await Promise.all(teamStatsPromises);
      const orderedTeams = Sort(teamStats);
      return { status: 'SUCCESSFUL', data: orderedTeams };
    } catch (error) {
      const _error = error as Error;
      return { status: 'NOT_FOUND', data: { message: `LeaderBoard not found: ${_error.message}` } };
    }
  }

  public async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    try {
      const teams = await this.getHomeAndAwayTeams();
      const homeTeamStatsPromises = teams.map((team) => this.getHomeTeamStats(team));
      const homeTeamStats = await Promise.all(homeTeamStatsPromises);
      const orderedHomeTeams = Sort(homeTeamStats);
      return { status: 'SUCCESSFUL', data: orderedHomeTeams };
    } catch (error) {
      const _error = error as Error;
      return { status: 'NOT_FOUND', data: { message: `LeaderBoard not found: ${_error.message}` } };
    }
  }

  public async getAwayLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    try {
      const teams = await this.getHomeAndAwayTeams();
      const awayTeamStatsPromises = teams.map((team) => this.getAwayTeamStats(team));
      const awayTeamStats = await Promise.all(awayTeamStatsPromises);
      const orderedAwayTeams = Sort(awayTeamStats);
      return { status: 'SUCCESSFUL', data: orderedAwayTeams };
    } catch (error) {
      const _error = error as Error;
      return { status: 'NOT_FOUND', data: { message: `LeaderBoard not found: ${_error.message}` } };
    }
  }
}
