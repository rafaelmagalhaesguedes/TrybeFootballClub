import { IMatches } from '../Interfaces/Matches/IMatches';

export default class LeaderBoard {
  //
  private teams = {
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

  private restartTeam() {
    this.teams.totalPoints = 0;
    this.teams.totalGames = 0;
    this.teams.totalVictories = 0;
    this.teams.totalDraws = 0;
    this.teams.totalLosses = 0;
    this.teams.goalsFavor = 0;
    this.teams.goalsOwn = 0;
    this.teams.goalsBalance = 0;
    this.teams.efficiency = 0;
  }

  private homeTeamVictory(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 3;
    this.teams.totalVictories += 1;
    this.teams.goalsFavor += homeTeamGoals;
    this.teams.goalsOwn += awayTeamGoals;
  }

  private awayTeamVictory(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 3;
    this.teams.totalVictories += 1;
    this.teams.goalsFavor += awayTeamGoals;
    this.teams.goalsOwn += homeTeamGoals;
  }

  private homeDraw(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 1;
    this.teams.totalDraws += 1;
    this.teams.goalsFavor += homeTeamGoals;
    this.teams.goalsOwn += awayTeamGoals;
  }

  private awayDraw(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 1;
    this.teams.totalDraws += 1;
    this.teams.goalsFavor += awayTeamGoals;
    this.teams.goalsOwn += homeTeamGoals;
  }

  private homeTeamLoss(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 0;
    this.teams.totalLosses += 1;
    this.teams.goalsFavor += homeTeamGoals;
    this.teams.goalsOwn += awayTeamGoals;
  }

  private awayTeamLoss(homeTeamGoals: number, awayTeamGoals: number) {
    this.teams.totalPoints += 0;
    this.teams.totalLosses += 1;
    this.teams.goalsFavor += awayTeamGoals;
    this.teams.goalsOwn += homeTeamGoals;
  }

  private homePoints(matches: IMatches[]) {
    matches.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        this.homeTeamVictory(match.homeTeamGoals, match.awayTeamGoals);
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.homeDraw(match.homeTeamGoals, match.awayTeamGoals);
      } else {
        this.homeTeamLoss(match.homeTeamGoals, match.awayTeamGoals);
      }
    });
  }

  private awayPoints(matches: IMatches[]) {
    matches.forEach((match) => {
      if (match.homeTeamGoals < match.awayTeamGoals) {
        this.awayTeamVictory(match.homeTeamGoals, match.awayTeamGoals);
      } else if (match.homeTeamGoals === match.awayTeamGoals) {
        this.awayDraw(match.homeTeamGoals, match.awayTeamGoals);
      } else {
        this.awayTeamLoss(match.homeTeamGoals, match.awayTeamGoals);
      }
    });
  }

  public homeTeamsData(name: string, matches: IMatches[]) {
    if (name !== this.teams.name) {
      this.restartTeam();
    }

    this.teams.name = name;
    this.homePoints(matches);
    this.teams.totalGames += matches.length;

    this.teams.goalsBalance = this.teams.goalsFavor - this.teams.goalsOwn;
    this.teams.efficiency = Number(
      ((this.teams.totalPoints / (this.teams.totalGames * 3)) * 100).toFixed(2),
    );

    return this.teams;
  }

  public awayTeamsData(name: string, matches: IMatches[]) {
    if (name !== this.teams.name) {
      this.restartTeam();
    }

    this.teams.name = name;
    this.awayPoints(matches);
    this.teams.totalGames += matches.length;

    this.teams.goalsBalance = this.teams.goalsFavor - this.teams.goalsOwn;
    this.teams.efficiency = Number(
      ((this.teams.totalPoints / (this.teams.totalGames * 3)) * 100).toFixed(2),
    );
    return this.teams;
  }
}
