import IUser from '../Interfaces/User/IUser';
import { IUserModel } from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  public async findUserByEmail(email: IUser['email']): Promise<IUser | null> {
    // Find user by email
    const user = await this.model.findOne({ where: { email } });

    // If user does not exist, return null
    if (!user) return null;

    // Destructure user
    const { id, username, role, password } = user;

    // Return user
    return { id, username, email, role, password };
  }
}
