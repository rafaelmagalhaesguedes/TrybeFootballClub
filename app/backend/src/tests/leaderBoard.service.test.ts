import * as sinon from 'sinon';
import { expect } from 'chai';

import LeaderBoardService from '../services/LeaderBoardService';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';

describe('LeaderBoardService', () => {
  afterEach(() => {
    sinon.restore();
  });

it('should get home leaderboard', async () => {
    const teams = [{ id: 1, teamName: 'Cruzeiro' }];
    const matches = [{ homeTeamId: 1, inProgress: false }];

    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const service = new LeaderBoardService();
    const result = await service.getHomeLeaderBoard();

    expect(result.status).equal('SUCCESSFUL');
    expect(result.data).to.have.lengthOf(1);
});

  it('should get away leaderboard', async () => {
    const teams = [{ id: 1, teamName: 'América MG' }];
    const matches = [{ awayTeamId: 1, inProgress: false }];

    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const service = new LeaderBoardService();
    const result = await service.getAwayLeaderBoard();

    expect(result.status).equal('SUCCESSFUL');
    expect(result.data).to.have.lengthOf(1);
  });
});