import { expect } from 'chai';
import SortMatches from '../utils/SortMatches';

describe('MatchesSorter', () => {
    it('should correctly sort matches', () => {
        const matches = [
          { totalPoints: 3, totalVictories: 1, goalsBalance: 1, goalsFavor: 2, goalsOwn: 1 },
          { totalPoints: 3, totalVictories: 1, goalsBalance: 1, goalsFavor: 1, goalsOwn: 0 },
          { totalPoints: 2, totalVictories: 0, goalsBalance: 1, goalsFavor: 1, goalsOwn: 0 },
        ];
      
        const sortedMatches = SortMatches(matches as any);
      
        expect(sortedMatches).deep.equal([
          { totalPoints: 3, totalVictories: 1, goalsBalance: 1, goalsFavor: 2, goalsOwn: 1 },
          { totalPoints: 3, totalVictories: 1, goalsBalance: 1, goalsFavor: 1, goalsOwn: 0 },
          { totalPoints: 2, totalVictories: 0, goalsBalance: 1, goalsFavor: 1, goalsOwn: 0 },
        ]);
    });
});