import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';

export default class MatchesSorter {
  public static sortMatches(matches: ILeaderBoard[]) {
    return matches.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }

      return b.goalsOwn - a.goalsOwn;
    });
  }
}
