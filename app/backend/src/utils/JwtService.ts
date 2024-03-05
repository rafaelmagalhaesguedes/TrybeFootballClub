import * as jwt from 'jsonwebtoken';

type Payload = { id: number; email: string };

export default class JwtService {
  //
  private static jwtSecret = process.env.JWT_SECRET || 'secretKey';

  static createToken(payload: Payload) {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '3h', algorithm: 'HS256' });
  }

  static verifyToken(token: string) {
    return jwt.verify(token, this.jwtSecret) as Payload;
  }

  static splitToken(authorization: string) {
    return authorization.split(' ')[1];
  }
}
