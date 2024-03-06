//
import * as bcript from 'bcryptjs';
import JwtService from '../utils/JwtService';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/User/IUserModel';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { ILogin, IUserRole, IToken } from '../Interfaces/User/IUser';

export default class LoginService {
  //
  private errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  public async sign(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    // Check if user exists
    const user = await this.userModel.findUserByEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    // Check if password is correct
    if (!bcript.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };
    }

    // Create token
    const token = JwtService.createToken({ id: user.id, email: user.email });

    // Return token
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<ServiceMessage | IUserRole>> {
    // Check if user exists
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    // Return user role
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
