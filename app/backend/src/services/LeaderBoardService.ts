import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import teamsClassified from '../LeaderBoard/SortMatches';
import HomeTeam from '../LeaderBoard/HomeTeam';
import AwayTeam from '../LeaderBoard/AwayTeam';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class LeaderBoardService {
  //
  private matchesModel = SequelizeMatches;
  private teamModel = SequelizeTeam;
  private homeTeam = new HomeTeam();
  private awayTeam = new AwayTeam();

  public async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const getTeams = await this.teamModel.findAll();

    const homeTeams = getTeams.map(async (team) => {
      const homeMatches = await this.matchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });

      const homeStats = homeMatches.map((match) =>
        this.homeTeam.getHomeTeamData(team.teamName, [match]));

      const teamsStats = homeStats[homeMatches.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(homeTeams);
    const orderdResults = teamsClassified.sortMatches(results);

    return { status: 'SUCCESSFUL', data: orderdResults };
  }

  public async getAwayLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    //
    const getTeams = await this.teamModel.findAll();

    const awayTeams = getTeams.map(async (team) => {
      const awayMatches = await this.matchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });

      const awayStats = awayMatches.map((match) =>
        this.awayTeam.getAwayTeamData(team.teamName, [match]));

      const teamsStats = awayStats[awayMatches.length - 1];
      return { ...teamsStats };
    });

    const results = await Promise.all(awayTeams);
    const orderdResults = teamsClassified.sortMatches(results);

    return { status: 'SUCCESSFUL', data: orderdResults };
  }
}
