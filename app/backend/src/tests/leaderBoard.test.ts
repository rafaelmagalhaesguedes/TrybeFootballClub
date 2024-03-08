import { expect } from 'chai';
import LeaderBoard from '../utils/LeaderBoard';

describe('LeaderBoard', () => {
  let leaderBoard: LeaderBoard;

  beforeEach(() => {
    leaderBoard = new LeaderBoard();
  });

  describe('Home Teams Data', () => {
    it('should calculate home team data correctly', () => {
      const matches = [
        { homeTeamGoals: 3, awayTeamGoals: 1 },
        { homeTeamGoals: 2, awayTeamGoals: 2 },
        { homeTeamGoals: 1, awayTeamGoals: 3 },
      ];

      const result = leaderBoard.homeTeamsData('Team A', matches as any);

      expect(result).to.deep.equal({
        name: 'Team A',
        totalPoints: 4,
        totalGames: 3,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 6,
        goalsOwn: 6,
        goalsBalance: 0,
        efficiency: 44.44,
      });
    });
  });

  describe('Away Teams Data', () => {
    it('should calculate away team data correctly', () => {
      const matches = [
        { homeTeamGoals: 1, awayTeamGoals: 3 },
        { homeTeamGoals: 2, awayTeamGoals: 2 },
        { homeTeamGoals: 3, awayTeamGoals: 1 },
      ];

      const result = leaderBoard.awayTeamsData('Team B', matches as any);

      expect(result).to.deep.equal({
        name: 'Team B',
        totalPoints: 4,
        totalGames: 3,
        totalVictories: 1,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 6,
        goalsOwn: 6,
        goalsBalance: 0,
        efficiency: 44.44,
      });
    });
  });
});
