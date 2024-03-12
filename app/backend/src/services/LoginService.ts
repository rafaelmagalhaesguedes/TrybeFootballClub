//
import * as bcript from 'bcryptjs';
import UserModel from '../models/UserModel';
import JwtService from '../utils/JwtService';
import { IUserModel } from '../Interfaces/User/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILogin, IUserRole, IToken } from '../Interfaces/User/IUser';

export default class LoginService {
  //
  private errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  public async sign(data: ILogin): Promise<ServiceResponse<IToken>> {
    //
    const user = await this.userModel.findUserByEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    if (!bcript.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };
    }

    const token = JwtService.createToken({ id: user.id, email: user.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<IUserRole>> {
    //
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
