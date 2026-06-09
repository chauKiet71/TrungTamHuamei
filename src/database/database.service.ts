import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as crypto from 'crypto';
import { readFile, rename } from 'fs/promises';
import { join } from 'path';

// Load .env variables
dotenv.config();

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;
  private isConfigured = false;

  async onModuleInit() {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl || dbUrl.includes('ep-host-name')) {
      this.logger.error('==================================================================');
      this.logger.error('CẢNH BÁO: DATABASE_URL CHƯA ĐƯỢC CẤU HÌNH HOẶC ĐANG DÙNG MẪU.');
      this.logger.error('Vui lòng điền chuỗi kết nối Neon PostgreSQL vào file .env ở thư mục gốc.');
      this.logger.error('Ứng dụng sẽ hoạt động hạn chế cho đến khi kết nối thành công.');
      this.logger.error('==================================================================');
      return;
    }

    try {
      this.pool = new Pool({
        connectionString: dbUrl,
        ssl: {
          rejectUnauthorized: false, // Required for Neon serverless connect
        },
      });

      // Test connection
      await this.pool.query('SELECT NOW()');
      this.isConfigured = true;
      this.logger.log('Kết nối thành công tới Neon PostgreSQL database.');

      // Initialize Schema, Admin & Migration
      await this.initSchema();
      await this.seedAdmin();
      await this.migrateJsonLeads();
    } catch (err: any) {
      this.logger.error(`Không thể kết nối tới Neon PostgreSQL: ${err.message}`);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.logger.log('Đã ngắt kết nối database pool.');
    }
  }

  getPool(): Pool {
    if (!this.isConfigured) {
      throw new Error('Database chưa được cấu hình. Vui lòng thiết lập DATABASE_URL hợp lệ trong .env.');
    }
    return this.pool;
  }

  async query<R = any>(text: string, params?: any[]): Promise<R[]> {
    if (!this.isConfigured) {
      throw new Error('Cơ sở dữ liệu chưa sẵn sàng. Hãy kiểm tra cấu hình DATABASE_URL.');
    }
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } finally {
      client.release();
    }
  }

  private async initSchema() {
    this.logger.log('Khởi tạo database schema nếu chưa tồn tại...');
    
    // Create admins table
    await this.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id VARCHAR(50) PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create leads table
    await this.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id VARCHAR(50) PRIMARY KEY,
        source VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        email VARCHAR(255),
        course VARCHAR(255),
        level VARCHAR(255),
        message TEXT,
        page VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    this.logger.log('Database schema khởi tạo hoàn tất.');
  }

  private async seedAdmin() {
    const adminCheck = await this.query('SELECT COUNT(*) FROM admins');
    const count = parseInt(adminCheck[0].count, 10);

    if (count === 0) {
      this.logger.log('Không tìm thấy tài khoản admin. Tiến hành khởi tạo tài khoản mặc định...');
      
      const adminId = `admin_${Date.now().toString(36)}`;
      const defaultUsername = 'admin';
      const defaultPassword = 'HuameiAdmin2026!';
      
      // Hash password using PBKDF2
      const salt = crypto.randomBytes(16).toString('hex');
      const hash = crypto.pbkdf2Sync(defaultPassword, salt, 1000, 64, 'sha512').toString('hex');
      const passwordHash = `${salt}:${hash}`;

      await this.query(
        'INSERT INTO admins (id, username, password_hash) VALUES ($1, $2, $3)',
        [adminId, defaultUsername, passwordHash]
      );
      
      this.logger.log('==================================================================');
      this.logger.log(`Tài khoản Admin đã được tạo mặc định:`);
      this.logger.log(`   Username: ${defaultUsername}`);
      this.logger.log(`   Password: ${defaultPassword}`);
      this.logger.log('Vui lòng lưu lại thông tin đăng nhập trên!');
      this.logger.log('==================================================================');
    }
  }

  private async migrateJsonLeads() {
    const leadCheck = await this.query('SELECT COUNT(*) FROM leads');
    const dbCount = parseInt(leadCheck[0].count, 10);

    // Only migrate if database is currently empty
    if (dbCount === 0) {
      const jsonPath = join(process.cwd(), 'data', 'leads.json');
      const backupPath = join(process.cwd(), 'data', 'leads_backup.json');

      try {
        const content = await readFile(jsonPath, 'utf8');
        const leads = JSON.parse(content) as any[];

        if (Array.isArray(leads) && leads.length > 0) {
          this.logger.log(`Tìm thấy ${leads.length} leads cũ từ file JSON. Đang tiến hành đồng bộ lên Neon PostgreSQL...`);

          for (const lead of leads) {
            await this.query(
              `INSERT INTO leads (id, source, status, name, phone, email, course, level, message, page, created_at, updated_at) 
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
               ON CONFLICT (id) DO NOTHING`,
              [
                lead.id,
                lead.source,
                lead.status,
                lead.name,
                lead.phone,
                lead.email || '',
                lead.course || '',
                lead.level || '',
                lead.message || '',
                lead.page || '',
                lead.createdAt || new Date().toISOString(),
                lead.updatedAt || new Date().toISOString(),
              ]
            );
          }

          this.logger.log('Đồng bộ dữ liệu JSON cũ lên cơ sở dữ liệu mới hoàn tất!');

          // Rename file to backup to avoid re-run migration in future restarts
          await rename(jsonPath, backupPath);
          this.logger.log(`Đã đổi tên file leads cũ thành 'leads_backup.json' để lưu trữ.`);
        }
      } catch (err: any) {
        if (err.code === 'ENOENT') {
          this.logger.log('Không tìm thấy file leads.json cũ. Bỏ qua bước đồng bộ dữ liệu.');
        } else {
          this.logger.error(`Lỗi đồng bộ dữ liệu cũ: ${err.message}`);
        }
      }
    }
  }
}
