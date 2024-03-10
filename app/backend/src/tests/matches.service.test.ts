import * as sinon from 'sinon';
import MatchesModel from '../models/MatchesModel';
import MatchesService from '../services/MatchesService';
import { expect } from 'chai';

describe('MatchesService', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should get matches', async () => {
        const matches = [{ id: 1, homeTeamId: 1, awayTeamId: 2 }];

        sinon.stub(MatchesModel.prototype, 'findMatches').resolves(matches as any);

        const service = new MatchesService();
        const result = await service.getMatches();

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).deep.equal(matches);
    });

    it('should create a match', async () => {
        const match = { homeTeamId: 1, awayTeamId: 2 };

        sinon.stub(MatchesModel.prototype, 'createMatch').resolves(match as any);

        const service = new MatchesService();
        const result = await service.createMatch(match as any);

        expect(result.status).equal('CREATED');
        expect(result.data).deep.equal(match);
    });

    it('should update match progress', async () => {
        const match = { id: 1, homeTeamId: 1, awayTeamId: 2 };

        sinon.stub(MatchesModel.prototype, 'updateMatchProgress').resolves(match as any);

        const service = new MatchesService();
        const result = await service.updateMatchProgress(1);

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).to.have.property('message', 'Finished');
    });

    it('should update match results', async () => {
        const match = { id: 1, homeTeamId: 1, awayTeamId: 2 };
        const results = { homeTeamGoals: 1, awayTeamGoals: 2 };

        sinon.stub(MatchesModel.prototype, 'updateMatchResults').resolves(match as any);

        const service = new MatchesService();
        const result = await service.updateMatchResults(1, results);

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).to.have.property('message', 'The match result has been changed');
    });

    it('should return not found when there is no match', async () => {
        sinon.stub(MatchesModel.prototype, 'findMatches').resolves(null);

        const service = new MatchesService();
        const result = await service.getMatches();

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'Match not found');
    });

    it('should return unprocessable entity when home and away teams are equal', async () => {
        const match = { homeTeamId: 1, awayTeamId: 1 };

        const service = new MatchesService();
        const result = await service.createMatch(match as any);

        expect(result.status).equal('UNPROCESSABLE_ENTITY');
        expect(result.data).to.have.property('message', 'It is not possible to create a match with two equal teams');
    });

    it('should return not found when match does not exist', async () => {
        sinon.stub(MatchesModel.prototype, 'updateMatchProgress').resolves(null);

        const service = new MatchesService();
        const result = await service.updateMatchProgress(1);

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'Match not found');
    });

    it('should return not found when match does not exist', async () => {
        sinon.stub(MatchesModel.prototype, 'updateMatchResults').resolves(null);

        const service = new MatchesService();
        const result = await service.updateMatchResults(1, { homeTeamGoals: 1, awayTeamGoals: 2 });

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'Match not found');
    });

    it('should return not found when home team does not exist', async () => {
        const match = { homeTeamId: 1, awayTeamId: 2 };

        sinon.stub(MatchesModel.prototype, 'createMatch').resolves(null);

        const service = new MatchesService();
        const result = await service.createMatch(match as any);

        expect(result.status).equal('NOT_FOUND');
        expect(result.data).to.have.property('message', 'There is no team with such id!');
    });
});