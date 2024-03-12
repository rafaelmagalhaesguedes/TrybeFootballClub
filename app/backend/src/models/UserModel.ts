import IUser from '../Interfaces/User/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  //
  constructor(private model = SequelizeUser) {}

  public async findUserByEmail(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;

    const { id, username, role, password } = user;
    return { id, username, email, role, password };
  }
}
