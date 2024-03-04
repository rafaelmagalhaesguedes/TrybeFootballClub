import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import JwtService from '../utils/JwtService';
import { tokenMock } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('1. Integration tests', () => {
    it('should return token and status 200', async function() {
        // arrange
        sinon.stub(JwtService, 'createToken').returns(tokenMock);
        
        // act
        const request = { email: 'user@user.com', password: 'secret_user' };
    
        const res = await chai.request(app).post('/login').send(request);
    
        // assert
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(tokenMock)
      });

    it('should return 400 if email is not provided', async function() {
      // act
      const { status, body } = await chai.request(app).post('/login').send({ password: '123456' });

      // assert
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });

    it('should return 400 if password is not provided', async function() {
      // act
      const { status, body } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com' });

      // assert
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
    });
  });
});
