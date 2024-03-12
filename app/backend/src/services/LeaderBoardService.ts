import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import Sort from '../utils/SortMatches';
import TeamData from '../LeaderBoard/TeamData';
/* import SequelizeMatches from '../database/models/SequelizeMatches'; */
/* import SequelizeTeam from '../database/models/SequelizeTeam'; */
import TeamModel from '../models/TeamModel';
import MatchesModel from '../models/MatchesModel';

export default class LeaderBoardService {
  //
  constructor(
    private matchesModel = new MatchesModel(),
    private teamModel = new TeamModel(),
    private teamData = new TeamData(),
  ) { }

  public async getLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const allTeams = await this.teamModel.getHomeAndAwayTeams();

    const teams = allTeams.map(async (team) => {
      const { teamName, homeMatches, awayMatches } = team;
      const teamsStats = this.teamData
        .getAllTeamsData(teamName, homeMatches || [], awayMatches || []);
      return { ...teamsStats };
    });

    const results = await Promise.all(teams);
    const orderedResults = Sort(results);
    return { status: 'SUCCESSFUL', data: orderedResults };
  }

  public async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const allTeams = await this.teamModel.getHomeAndAwayTeams();

    const homeTeams = allTeams.map(async (team) => {
      const homeMatches = await this.matchesModel.getHomeMatches(team.id);
      const homeStats = homeMatches.map((match) =>
        this.teamData.getTeamData(team.teamName, [match], true));
      const teamsStats = homeStats[homeMatches.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(homeTeams);
    const orderdResults = Sort(results);
    return { status: 'SUCCESSFUL', data: orderdResults };
  }

  public async getAwayLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const allTeams = await this.teamModel.getHomeAndAwayTeams();

    const awayTeams = allTeams.map(async (team) => {
      const awayMatches = await this.matchesModel.getAwayMatches(team.id);
      const awayStats = awayMatches.map((match) =>
        this.teamData.getTeamData(team.teamName, [match], false));
      const teamsStats = awayStats[awayMatches.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(awayTeams);
    const orderdResults = Sort(results);
    return { status: 'SUCCESSFUL', data: orderdResults };
  }
}
