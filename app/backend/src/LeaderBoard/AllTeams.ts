import { IMatches } from '../Interfaces/Matches/IMatches';
import LeaderBoard from './LeaderBoard';

export default class AllTeams extends LeaderBoard {
  public getAllTeamData(name: string, homeMatches: IMatches[], awayMatches: IMatches[]) {
    this.restartTeam();

    this.calculateTeamData(homeMatches, true);
    this.calculateTeamData(awayMatches, false);

    this.getTeamData(name, homeMatches, true);
    this.getTeamData(name, awayMatches, false);

    return this.teamData;
  }
}
