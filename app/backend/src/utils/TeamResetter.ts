import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';

export default class TeamResetter {
  private teamData: ILeaderBoard;

  constructor(teamData: ILeaderBoard) {
    this.teamData = teamData;
  }

  public reset() {
    this.teamData.totalPoints = 0;
    this.teamData.totalGames = 0;
    this.teamData.totalVictories = 0;
    this.teamData.totalDraws = 0;
    this.teamData.totalLosses = 0;
    this.teamData.goalsFavor = 0;
    this.teamData.goalsOwn = 0;
    this.teamData.goalsBalance = 0;
    this.teamData.efficiency = 0;
  }
}
