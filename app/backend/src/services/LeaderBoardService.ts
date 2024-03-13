import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import { ILeaderBoardModel } from '../interfaces/LeaderBoard/ILeaderBoardModel';
import { ILeaderBoard } from '../interfaces/LeaderBoard/ILeaderBoard';
import LeaderBoardModel from '../models/LeaderBoardModel';
import Sort from '../utils/SortMatches';

export default class LeaderBoardService {
  //
  private errorMessage = 'Failed to get leader board data. Please try again later.';

  constructor(
    private leaderModel: ILeaderBoardModel = new LeaderBoardModel(),
  ) {}

  public async getLeaderBoard(): Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    try {
      const teams = await this.leaderModel.getHomeAndAwayTeams();
      const teamStatsPromises = teams.map((team) => this.leaderModel.getTeamStats(team));
      const teamStats = await Promise.all(teamStatsPromises);
      const orderedTeams = Sort(teamStats);
      return { status: 'SUCCESSFUL', data: orderedTeams };
    } catch (error) {
      return this.handleError(error, 'getLeaderBoard');
    }
  }

  public async getHomeLeaderBoard(): Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    try {
      const teams = await this.leaderModel.getHomeAndAwayTeams();
      const homeTeamStatsPromises = teams.map((team) => this.leaderModel.getHomeTeamStats(team));
      const homeTeamStats = await Promise.all(homeTeamStatsPromises);
      const orderedHomeTeams = Sort(homeTeamStats);
      return { status: 'SUCCESSFUL', data: orderedHomeTeams };
    } catch (error) {
      return this.handleError(error, 'getHomeLeaderBoard');
    }
  }

  public async getAwayLeaderBoard(): Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    try {
      const teams = await this.leaderModel.getHomeAndAwayTeams();
      const awayTeamStatsPromises = teams.map((team) => this.leaderModel.getAwayTeamStats(team));
      const awayTeamStats = await Promise.all(awayTeamStatsPromises);
      const orderedAwayTeams = Sort(awayTeamStats);
      return { status: 'SUCCESSFUL', data: orderedAwayTeams };
    } catch (error) {
      return this.handleError(error, 'getAwayLeaderBoard');
    }
  }

  private handleError(error: unknown, methodName: string): ServiceResponse<ServiceMessage> {
    const _error = error as Error;
    console.log(`Error in ${methodName}: `, _error.message);
    return { status: 'INTERNAL_ERROR', data: { message: this.errorMessage } };
  }
}
