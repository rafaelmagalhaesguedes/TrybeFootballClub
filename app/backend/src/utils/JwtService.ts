import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';

export default class JwtService {
  static createToken({ email, role }: { email: string; role: string }) {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ email, role }, JWT_SECRET, jwtConfig);

    return token;
  }

  static verify(token: string) {
    return jwt.verify(token, JWT_SECRET);
  }
}
