import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/SequelizeMatches';
import { matchesMock } from './mocks/matches.mocks';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

// Generates a new token
const secret = 'secretKey';
const payload = { userId: 1, userEmail: 'rafael@dev.com'};
const options = { expiresIn: '1h' };

const generateToken = () => jwt.sign(payload, secret, options);

let tokenMock: string;

describe('Matches Tests', () => {

  beforeEach(() => {
    tokenMock = generateToken();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('Integration tests', () => {
    it('should return all matches', async () => {
      // arrange
      sinon.stub(MatchesModel, 'findAll').resolves(matchesMock as any);

      // act
      const res = await chai.request(app).get('/matches');

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(matchesMock);
    });

    it('should return all matches in progress', async () => {
      // arrange
      const inProgressMatches = matchesMock.filter(match => match.inProgress);
      sinon.stub(MatchesModel, 'findAll').resolves(inProgressMatches as any);

      // act
      const res = await chai.request(app).get('/matches?inProgress=true');

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(inProgressMatches);
    });

    it('should update a match', async () => {
      // arrange
      const matchId = 1;
      const updatedMatch = { ...matchesMock[0], inProgress: false };
      sinon.stub(MatchesModel.prototype, 'update').resolves(updatedMatch as any);
    
      // act
      const res = await chai.request(app)
        .patch(`/matches/${matchId}/finish`)
        .set('Authorization', `Bearer ${tokenMock}`);
    
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ message: 'Finished' });
    });

    it('should update match results', async () => {
      // arrange
      const matchId = 1;
      const updatedMatch = { ...matchesMock[0], homeTeamGoals: 2, awayTeamGoals: 1 };
      sinon.stub(MatchesModel, 'update').resolves(updatedMatch as any);

      // act
      const res = await chai.request(app)
        .patch(`/matches/${matchId}`)
        .set('Authorization', `Bearer ${tokenMock}`)
        .send({ homeTeamGoals: 6, awayTeamGoals: 1 });

      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ message: 'The match result has been changed' });
    });
  });
});