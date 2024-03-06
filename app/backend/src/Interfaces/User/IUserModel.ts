import IUser from './IUser';

export default interface IUserModel {
  findUserByEmail(email: IUser['email']): Promise<IUser | null>;
}
