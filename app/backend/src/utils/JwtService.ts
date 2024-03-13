//
import { sign, verify, JwtPayload } from 'jsonwebtoken';

export default class JwtService {
  //
  private static jwtSecret = process.env.JWT_SECRET || 'secretKey';

  public static createToken(payload: JwtPayload) {
    return sign(payload, this.jwtSecret, { expiresIn: '3h', algorithm: 'HS256' });
  }

  public static verifyToken(token: string) {
    return verify(token, this.jwtSecret) as JwtPayload;
  }

  public static splitToken(authorization: string) {
    return authorization.split(' ')[1];
  }
}
