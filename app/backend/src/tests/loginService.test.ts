import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import { expect } from 'chai';
import JwtService from '../services/JwtService';
import UserModel from '../models/UserModel';
import LoginService from '../services/LoginService';

describe('Login Service Tests', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should sign in a user', async () => {
        const user = { id: 1, email: 'test@test.com', password: bcrypt.hashSync('password') };
        const loginData = { email: 'test@test.com', password: 'password' };

        sinon.stub(UserModel.prototype, 'findUserByEmail').resolves(user as any);
        sinon.stub(JwtService, 'createToken').returns('token');

        const service = new LoginService();
        const result = await service.sign(loginData);

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).to.have.property('token', 'token');
    });

    it('should get user role', async () => {
        const user = { id: 1, email: 'test@test.com', role: 'admin' };

        sinon.stub(UserModel.prototype, 'findUserByEmail').resolves(user as any);

        const service = new LoginService();
        const result = await service.getRole('test@test.com');

        expect(result.status).equal('SUCCESSFUL');
        expect(result.data).to.have.property('role', 'admin');
    });

    it('should return unauthorized when user does not exist', async () => {
        sinon.stub(UserModel.prototype, 'findUserByEmail').resolves(null);

        const service = new LoginService();
        const result = await service.getRole('norole');

        expect(result.status).equal('UNAUTHORIZED');
        expect(result.data).to.have.property('message', 'Invalid email or password');
    });

    it('should return unauthorized when password is incorrect', async () => {
        const user = { id: 1, email: 'test@test.com', password: bcrypt.hashSync('password') };

        sinon.stub(UserModel.prototype, 'findUserByEmail').resolves(user as any);

        const service = new LoginService();
        const result = await service.sign({ email: 'test@test.com', password: 'wrongpassword' });

        expect(result.status).equal('UNAUTHORIZED');
        expect(result.data).to.have.property('message', 'Invalid email or password');
    });
});