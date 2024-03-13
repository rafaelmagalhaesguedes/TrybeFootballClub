import { IMatches } from '../interfaces/Matches/IMatches';
import TeamBoard from './TeamBoard';

export default class TeamData extends TeamBoard {
  //
  public getTeam(name: string, matches: IMatches[], isHomeTeam: boolean) {
    //
    if (name !== this.teamData.name) this.restartTeam();

    this.teamData.name = String(name);
    this.calculateTeamData(matches, isHomeTeam);
    this.calculateTotalGames();
    this.calculateGoalsBalance();
    this.calculateEfficiency();

    return this.teamData;
  }

  public getAllTeams(name: string, homeMatches: IMatches[], awayMatches: IMatches[]) {
    //
    this.restartTeam();

    this.calculateTeamData(homeMatches, true);
    this.calculateTeamData(awayMatches, false);

    this.getTeam(name, homeMatches, true);
    this.getTeam(name, awayMatches, false);

    return this.teamData;
  }
}
