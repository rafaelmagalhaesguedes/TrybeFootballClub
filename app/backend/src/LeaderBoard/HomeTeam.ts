import { IMatches } from '../Interfaces/Matches/IMatches';
import LeaderBoard from './LeaderBoard';

export default class HomeTeam extends LeaderBoard {
  public getHomeTeamData(name: string, matches: IMatches[]) {
    return this.getTeamData(name, matches, true);
  }
}
