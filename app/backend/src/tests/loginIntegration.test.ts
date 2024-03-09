import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import JwtService from '../services/JwtService';
import { tokenMock } from './mocks/user.mock';
import LoginService from '../services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login tests', () => {
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
      expect(res.body).to.deep.equal({ token: tokenMock })
    });

    it('should return role and status 200', async function() {
      // arrange
      const email = 'test@example.com';
      const role = 'admin';
      sinon.stub(JwtService, 'verifyToken').returns({ email, role } as any);
      sinon.stub(LoginService.prototype, 'getRole').withArgs(email).resolves({ status: 'SUCCESSFUL', data: { role } });
    
      // act
      const res = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${tokenMock}`);
    
      // assert
      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ role });
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

    it('should return 401 if email is invalid', async function() {
      // act
      const { status, body } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com', password: '123456' });

      // assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });

    it('should return 401 if password is invalid', async function() {
      // act
      const { status, body } = await chai.request(app).post('/login').send({ email: 'rafael@gmail.com', password: '123456' });

      // assert
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Invalid email or password' });
    });
  });
});
