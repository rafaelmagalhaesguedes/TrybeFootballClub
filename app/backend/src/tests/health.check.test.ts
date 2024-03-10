import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';

chai.use(chaiHttp);

describe('Healthcheck API', () => {
  const app = new App().app;

  it('Server is running!', async () => {
    const { status, text } = await chai.request(app).get('/');
    chai.expect(status).to.be.equal(200);
    chai.expect(text).to.be.equal('{"ok":true}');
  });
});