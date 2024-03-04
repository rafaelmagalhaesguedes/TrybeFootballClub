//
import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import statusCode from '../utils/MapStatusCode';

export default class LoginController {
  //
  constructor(private loginService = new LoginService()) { }

  async signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.sign(email, password);
    res.status(statusCode(status)).json(data);
  }
}
