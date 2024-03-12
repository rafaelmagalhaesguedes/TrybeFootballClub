//
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import TeamData from '../LeaderBoard/TeamData';
import TeamModel from '../models/TeamModel';
import Sort from '../utils/SortMatches';

export default class LeaderBoardService {
  //
  constructor(
    private matchesModel = new MatchesModel(),
    private teamModel = new TeamModel(),
    private teamData = new TeamData(),
  ) { }

  public async getLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const getAllTeams = await this.teamModel.getHomeAndAwayTeams();
    const filterTeams = getAllTeams.map(async (team) => {
      const { teamName, homeMatches, awayMatches } = team;
      if (!homeMatches || !awayMatches) return { status: 'FAILED', message: 'No matches found!' };
      const updateStats = this.teamData.getAllTeams(teamName, homeMatches, awayMatches);
      return { ...updateStats };
    });

    const allTeams = await Promise.all(filterTeams);
    const orderedTeams = Sort(allTeams as ILeaderBoard[]);
    return { status: 'SUCCESSFUL', data: orderedTeams };
  }

  public async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const getAllTeams = await this.teamModel.getHomeAndAwayTeams();
    const filterHomeTeams = getAllTeams.map(async (team) => {
      const homeMatches = await this.matchesModel.getHomeMatches(team.id);
      const updateStats = this.teamData.getTeam(team.teamName, homeMatches, true);
      return { ...updateStats };
    });

    const homeTeams = await Promise.all(filterHomeTeams);
    const orderedHomeTeams = Sort(homeTeams);
    return { status: 'SUCCESSFUL', data: orderedHomeTeams };
  }

  public async getAwayLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const getAllTeams = await this.teamModel.getHomeAndAwayTeams();
    const filterAwayTeams = getAllTeams.map(async (team) => {
      const awayMatches = await this.matchesModel.getAwayMatches(team.id);
      const updateStats = this.teamData.getTeam(team.teamName, awayMatches, false);
      return { ...updateStats };
    });

    const awayTeams = await Promise.all(filterAwayTeams);
    const orderedAwayTeams = Sort(awayTeams);
    return { status: 'SUCCESSFUL', data: orderedAwayTeams };
  }
}
