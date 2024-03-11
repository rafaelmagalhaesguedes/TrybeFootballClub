import { IMatches } from '../Interfaces/Matches/IMatches';
import TeamBoard from './TeamBoard';

export default class TeamData extends TeamBoard {
  //
  public getTeamData(name: string, matches: IMatches[], isHomeTeam: boolean) {
    //
    if (name !== this.teamData.name) this.restartTeam();

    this.teamData.name = String(name);
    this.calculateTeamData(matches, isHomeTeam);
    this.calculateTotalGames();
    this.calculateGoalsBalance();
    this.calculateEfficiency();

    return this.teamData;
  }

  public getAllTeamsData(name: string, homeMatches: IMatches[], awayMatches: IMatches[]) {
    //
    this.restartTeam();

    this.calculateTeamData(homeMatches, true);
    this.calculateTeamData(awayMatches, false);

    this.getTeamData(name, homeMatches, true);
    this.getTeamData(name, awayMatches, false);

    return this.teamData;
  }
}
