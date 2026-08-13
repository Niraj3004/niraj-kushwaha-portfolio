import { User } from '../models/user.model';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';

export class AuthService {
  static async login(email: string, password: string) {
    let user = await User.findOne({ email });

    if (!user) {
      const isFirstUser = (await User.countDocuments()) === 0;
      if (isFirstUser) {
        const passwordHash = await hashPassword(password);
        user = await User.create({ email, passwordHash });
      } else {
        throw { statusCode: 401, message: 'Invalid credentials' };
      }
    } else {
      const isMatch = await comparePassword(password, user.passwordHash);
      if (!isMatch) {
        throw { statusCode: 401, message: 'Invalid credentials' };
      }
    }

    const token = generateToken({ id: user._id });
    return { token, user: { id: user._id, email: user.email } };
  }
}
