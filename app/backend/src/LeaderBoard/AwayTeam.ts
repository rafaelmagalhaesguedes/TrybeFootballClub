import { IMatches } from '../Interfaces/Matches/IMatches';
import LeaderBoard from './LeaderBoard';

export default class AwayTeam extends LeaderBoard {
  public getAwayTeamData(name: string, matches: IMatches[]) {
    return this.getTeamData(name, matches, false);
  }
}
