import { ILeaderBoard } from '../interfaces/LeaderBoard/ILeaderBoard';
import { IMatches } from '../interfaces/Matches/IMatches';
import TeamResetter from '../utils/TeamResetter';

export default class TeamBoard {
  //
  protected teamData: ILeaderBoard;

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

  protected restartTeam() {
    const resetter = new TeamResetter(this.teamData);
    resetter.reset();
  }

  protected calculateTotalGames() {
    this.teamData.totalGames = Number(
      this.teamData.totalVictories + this.teamData.totalDraws + this.teamData.totalLosses,
    );
  }

  protected calculateGoalsBalance() {
    this.teamData.goalsBalance = Number(this.teamData.goalsFavor - this.teamData.goalsOwn);
  }

  protected calculateEfficiency() {
    this.teamData.efficiency = Number(
      ((this.teamData.totalPoints / (this.teamData.totalGames * 3)) * 100).toFixed(2),
    );
  }

  protected calculateTeamData(matches: IMatches[], isHomeTeam: boolean) {
    matches.forEach((match) => {
      const teamGoals = Number(isHomeTeam ? match.homeTeamGoals : match.awayTeamGoals);
      const opponentGoals = Number(isHomeTeam ? match.awayTeamGoals : match.homeTeamGoals);

      if (teamGoals > opponentGoals) {
        this.teamData.totalPoints += 3;
        this.teamData.totalVictories += 1;
      } else if (teamGoals === opponentGoals) {
        this.teamData.totalPoints += 1;
        this.teamData.totalDraws += 1;
      } else {
        this.teamData.totalLosses += 1;
      }

      this.teamData.goalsFavor += teamGoals;
      this.teamData.goalsOwn += opponentGoals;
    });
  }
}
