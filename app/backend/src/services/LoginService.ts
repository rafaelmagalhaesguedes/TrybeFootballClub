//
import * as bcript from 'bcryptjs';
import JwtService from '../utils/JwtService';
import UserModel from '../models/UserModel';
import IUserModel from '../Interfaces/User/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUser from '../Interfaces/User/IUser';

export default class LoginService {
  //
  private static errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  async sign(email: string, password: string): Promise<ServiceResponse<IUser | string>> {
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: LoginService.errorMessage } };

    if (!bcript.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: LoginService.errorMessage } };
    }

    const token = JwtService.createToken({ email: user.email, role: user.role });

    return { status: 'SUCCESSFUL', data: token };
  }
}
