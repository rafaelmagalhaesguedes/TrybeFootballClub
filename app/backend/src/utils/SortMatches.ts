import { ILeaderBoard } from '../Interfaces/LeaderBoard/ILeaderBoard';

class MatchesSorter {
  public static Sort(matches: ILeaderBoard[]) {
    return matches.sort((a, b) => {
      // Sort by totalPoints
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      // Sort by totalVictories
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      // Sort by goalsBalance
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      // Sort by goalsFavor
      if (b.goalsFavor !== a.goalsFavor) {
        return b.goalsFavor - a.goalsFavor;
      }

      // Sort by goalsOwn
      return b.goalsOwn - a.goalsOwn;
    });
  }
}

export default MatchesSorter.Sort;
