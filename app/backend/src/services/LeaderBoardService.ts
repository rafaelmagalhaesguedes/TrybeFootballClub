import SequelizeMatch from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import teamsClassified from '../utils/MatchesSort';
import LeaderBoard from '../utils/LeaderBoard';

export default class LeaderBoardService {
  //
  private matchesModel = SequelizeMatch;
  private teamModel = SequelizeTeam;

  constructor(private leaderBoard = new LeaderBoard()) { }

  public async getHomeLeaderBoard():
  Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    //
    const getTeams = await this.teamModel.findAll();

    const homeTeams = getTeams.map(async (team) => {
      const homeMatches = await this.matchesModel.findAll({
        where: { homeTeamId: team.id, inProgress: false },
      });

      const homeStats = homeMatches.map((match) =>
        this.leaderBoard.homeTeamsData(team.teamName, [match]));

      const teamsStats = homeStats[homeMatches.length - 1];
      return { ...teamsStats };
    });

    if (homeTeams.length === 0) return { status: 'NOT_FOUND', data: { message: 'No teams found' } };

    const results = await Promise.all(homeTeams);
    const orderdResults = teamsClassified.sortMatches(results);

    return { status: 'SUCCESSFUL', data: orderdResults };
  }

  public async getAwayLeaderBoard():
  Promise<ServiceResponse<ServiceMessage | ILeaderBoard[]>> {
    //
    const getTeams = await this.teamModel.findAll();

    const awayTeams = getTeams.map(async (team) => {
      const awayMatches = await this.matchesModel.findAll({
        where: { awayTeamId: team.id, inProgress: false },
      });

      const awayStats = awayMatches.map((match) =>
        this.leaderBoard.awayTeamsData(team.teamName, [match]));

      const teamsStats = awayStats[awayMatches.length - 1];
      return { ...teamsStats };
    });

    if (awayTeams.length === 0) return { status: 'NOT_FOUND', data: { message: 'No teams found' } };

    const results = await Promise.all(awayTeams);
    const orderdResults = teamsClassified.sortMatches(results);

    return { status: 'SUCCESSFUL', data: orderdResults };
  }
}
