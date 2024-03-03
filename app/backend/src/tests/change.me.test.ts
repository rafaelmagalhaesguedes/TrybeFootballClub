import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/team.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1. Get All teams', () => {
    it('should return all teams', async function() {
      // arrange
      sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
  
      // act
      const { status, body } = await chai.request(app).get('/teams');
  
      // assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(teams);
    });
  });

  describe('2. Get Team by id', () => {
    it('should return a team by id', async function() {
      // arrange
      const team = teams[0];
      sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);

      // act
      const { status, body } = await chai.request(app).get(`/teams/${team.id}`);

      // assert
      expect(status).to.equal(200);
      expect(body).to.deep.equal(team);
    });

    it('should return 404 if team is not found', async function() {
      // arrange
      sinon.stub(SequelizeTeam, 'findByPk').resolves(null);

      // act
      const { status, body } = await chai.request(app).get('/teams/1');

      // assert
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Team not found' });
    });
  });
});
