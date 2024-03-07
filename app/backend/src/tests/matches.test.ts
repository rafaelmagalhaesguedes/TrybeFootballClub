import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { matchesMock } from './mocks/matches.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Tests', () => {
  afterEach(() => {
    sinon.restore();
  });
    
  describe('Integration tests', () => {
    it('should return all matches', async () => {
      // arrange
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);
    
      // act
      const res = await chai.request(app).get('/matches');
    
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(matchesMock);
    });

    it('should return all matches in progress', async () => {
      // arrange
      sinon.stub(SequelizeMatches, 'findAll').resolves(matchesMock as any);
    
      // act
      const res = await chai.request(app).get('/matches?inProgress=true');
    
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(matchesMock);
    });
  });
});