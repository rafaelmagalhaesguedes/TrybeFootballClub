import * as jwt from 'jsonwebtoken';

export default class JwtService {
  //
  private static jwtSecret = process.env.JWT_SECRET || 'secretKey';

  static createToken({ email, role }: { email: string; role: string }) {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ email, role }, JwtService.jwtSecret, jwtConfig);

    return token;
  }

  static verify(token: string) {
    return jwt.verify(token, JwtService.jwtSecret);
  }
}
