//
import * as bcript from 'bcryptjs';
import UserModel from '../models/UserModel';
import JwtService from '../utils/JwtService';
import { IUserModel } from '../interfaces/User/IUserModel';
import { ServiceResponse } from '../interfaces/ServiceResponse';
import { ILogin, IUserRole, IToken } from '../interfaces/User/IUser';

export default class LoginService {
  //
  private errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  public async sign(data: ILogin): Promise<ServiceResponse<IToken>> {
    //
    const user = await this.userModel.findUserByEmail(data.email);
    if (!user || !bcript.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };
    }

    try {
      const token = JwtService.createToken({ id: user.id, email: user.email });
      return { status: 'SUCCESSFUL', data: { token } };
    } catch (error) {
      console.log('Error in LoginService.sign:', error);
      return { status: 'INTERNAL_ERROR', data: { message: 'An internal error occurred' } };
    }
  }

  public async getRole(email: string): Promise<ServiceResponse<IUserRole>> {
    //
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
