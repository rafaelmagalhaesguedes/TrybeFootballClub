import * as sinon from 'sinon';
import TeamModel from '../models/TeamModel';
import TeamService from '../services/TeamService';
import { expect } from 'chai';

describe('TeamService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should get all teams', async () => {
        const teams = [{ id: 1, name: 'Team 1' }, { id: 2, name: 'Team 2' }];

        sinon.stub(TeamModel.prototype, 'getAll').resolves(teams as any);

        const service = new TeamService();
        const result = await service.getAllTeams();

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).deep.equal(teams);
    });

    it('should get a team by id', async () => {
        const team = { id: 1, name: 'Team 1' };

        sinon.stub(TeamModel.prototype, 'getById').resolves(team as any);

        const service = new TeamService();
        const result = await service.getTeamById(1);

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).deep.equal(team);
    });

    it('should return not found when there is no team', async () => {
        sinon.stub(TeamModel.prototype, 'getById').resolves(null);

        const service = new TeamService();
        const result = await service.getTeamById(1);

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'Team not found');
    });

    it('should return not found when there are no teams', async () => {
        sinon.stub(TeamModel.prototype, 'getAll').resolves();

        const service = new TeamService();
        const result = await service.getAllTeams();

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'Teams not found');
    });
});