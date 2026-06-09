import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly jwtSecret: string;

  constructor(private readonly db: DatabaseService) {
    this.jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
    if (!process.env.JWT_SECRET) {
      this.logger.warn('JWT_SECRET chưa được cấu hình. Một khóa ngẫu nhiên tạm thời đã được tự tạo.');
    }
  }

  verifyPassword(password: string, passwordHash: string): boolean {
    try {
      const parts = passwordHash.split(':');
      if (parts.length !== 2) return false;
      const [salt, hash] = parts;
      const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
      return hash === verifyHash;
    } catch (err) {
      return false;
    }
  }

  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    if (!username || !password) {
      throw new UnauthorizedException('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.');
    }

    try {
      const rows = await this.db.query('SELECT * FROM admins WHERE username = $1', [username.trim()]);
      const admin = rows[0];

      if (!admin) {
        throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác.');
      }

      const isPasswordValid = this.verifyPassword(password, admin.password_hash);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Tài khoản hoặc mật khẩu không chính xác.');
      }

      const expiry = Date.now() + 24 * 60 * 60 * 1000;
      const payload = `${admin.username}:${expiry}`;
      
      const signature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(payload)
        .digest('hex');

      const token = Buffer.from(`${payload}:${signature}`).toString('base64');

      return {
        token,
        username: admin.username,
      };
    } catch (err: any) {
      if (err.message.includes('Cơ sở dữ liệu chưa sẵn sàng')) {
        throw new UnauthorizedException('Hệ thống cơ sở dữ liệu chưa sẵn sàng. Vui lòng thử lại sau.');
      }
      throw err;
    }
  }

  verifyToken(token: string): { username: string } {
    if (!token) {
      throw new UnauthorizedException('Không tìm thấy mã xác thực.');
    }

    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      const parts = decoded.split(':');

      if (parts.length !== 3) {
        throw new UnauthorizedException('Mã xác thực không hợp lệ.');
      }

      const [username, expiryStr, signature] = parts;
      const expiry = parseInt(expiryStr, 10);

      if (isNaN(expiry) || expiry < Date.now()) {
        throw new UnauthorizedException('Mã xác thực đã hết hạn.');
      }

      const payload = `${username}:${expiryStr}`;
      const expectedSignature = crypto
        .createHmac('sha256', this.jwtSecret)
        .update(payload)
        .digest('hex');

      if (signature !== expectedSignature) {
        throw new UnauthorizedException('Chữ ký xác thực không khớp.');
      }

      return { username };
    } catch (err) {
      throw new UnauthorizedException('Xác thực thất bại.');
    }
  }
}
