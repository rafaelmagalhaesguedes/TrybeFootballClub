//
import * as bcript from 'bcryptjs';
import JwtService from '../utils/JwtService';
import UserModel from '../models/UserModel';
import IUserModel from '../Interfaces/User/IUserModel';

export default class LoginService {
  //
  private errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  public async sign(email: string, password: string) {
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    if (!bcript.compareSync(password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };
    }

    const token = JwtService.createToken({ id: user.id, email: user.email });

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string) {
    const user = await this.userModel.findUserByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
