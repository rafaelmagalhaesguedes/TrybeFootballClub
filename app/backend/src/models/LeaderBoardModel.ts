//
import { ILeaderBoardModel } from '../interfaces/LeaderBoard/ILeaderBoardModel';
import { ILeaderBoard } from '../interfaces/LeaderBoard/ILeaderBoard';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeam } from '../interfaces/Team/ITeam';
import TeamData from '../leaderBoard/TeamData';
import MatchesModel from './MatchesModel';

export default class LeaderBoardModel implements ILeaderBoardModel {
  //
  constructor(
    private teamModel = SequelizeTeam,
    private matchesModel = new MatchesModel(),
    private teamData = new TeamData(),
  ) {}

  public async getHomeAndAwayTeams(): Promise<ITeam[]> {
    //
    const matches = await this.teamModel.findAll({
      include: [
        { model: SequelizeMatches, as: 'homeMatches', where: { inProgress: false } },
        { model: SequelizeMatches, as: 'awayMatches', where: { inProgress: false } },
      ],
    });

    return matches;
  }

  public async getTeamStats(team: ITeam): Promise<ILeaderBoard> {
    //
    const { teamName, homeMatches, awayMatches } = team;
    if (!homeMatches || !awayMatches) { throw new Error('Failed to get team stats'); }

    const stats = this.teamData.getAllTeams(teamName, homeMatches, awayMatches);
    return { ...stats };
  }

  public async getHomeTeamStats(team: ITeam): Promise<ILeaderBoard> {
    //
    const homeMatches = await this.matchesModel.getHomeMatches(team.id);
    const stats = this.teamData.getTeam(team.teamName, homeMatches, true);
    return { ...stats };
  }

  public async getAwayTeamStats(team: ITeam): Promise<ILeaderBoard> {
    //
    const awayMatches = await this.matchesModel.getAwayMatches(team.id);
    const stats = this.teamData.getTeam(team.teamName, awayMatches, false);
    return { ...stats };
  }
}
