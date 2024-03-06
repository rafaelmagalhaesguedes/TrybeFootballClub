//
import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import statusCode from '../utils/MapStatusCode';

export default class LoginController {
  //
  constructor(private loginService = new LoginService()) { }

  public async signUp(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.loginService.sign(req.body);
    return res.status(statusCode(status)).json(data);
  }

  public async getUserRole(_req: Request, res: Response): Promise<Response> {
    const { email } = res.locals.user;
    const { status, data } = await this.loginService.getRole(email);
    return res.status(statusCode(status)).json(data);
  }
}
