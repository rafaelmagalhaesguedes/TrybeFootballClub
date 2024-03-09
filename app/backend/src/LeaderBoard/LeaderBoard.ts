import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';
import { IMatches } from '../Interfaces/Matches/IMatches';

export default class LeaderBoard {
  //
  private teamData: ILeaderBoard;

  constructor() {
    this.teamData = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  private restartTeam() {
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

  private teamVictory() {
    this.teamData.totalPoints += 3;
    this.teamData.totalVictories += 1;
  }

  private teamDraw() {
    this.teamData.totalPoints += 1;
    this.teamData.totalDraws += 1;
  }

  private teamLoss() {
    this.teamData.totalLosses += 1;
  }

  private calculateTeamData(matches: IMatches[], isHomeTeam: boolean) {
    matches.forEach((match) => {
      const teamGoals = isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals;
      const opponentGoals = isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals;

      if (teamGoals > opponentGoals) {
        this.teamVictory();
      } else if (teamGoals === opponentGoals) {
        this.teamDraw();
      } else {
        this.teamLoss();
      }

      this.teamData.goalsFavor += teamGoals;
      this.teamData.goalsOwn += opponentGoals;
    });
  }

  public getTeamData(name: string, matches: IMatches[], isHomeTeam: boolean) {
    if (name !== this.teamData.name) {
      this.restartTeam();
    }

    this.teamData.name = name;
    this.calculateTeamData(matches, isHomeTeam);
    this.teamData.totalGames += matches.length;

    this.teamData.goalsBalance = this.teamData.goalsFavor - this.teamData.goalsOwn;
    this.teamData.efficiency = Number(
      ((this.teamData.totalPoints / (this.teamData.totalGames * 3)) * 100).toFixed(2),
    );

    return this.teamData;
  }
}
