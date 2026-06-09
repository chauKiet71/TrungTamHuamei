import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export type LeadSource = 'trial' | 'advisory';
export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'enrolled' | 'lost';

export interface CreateLeadDto {
  source?: LeadSource;
  name?: string;
  phone?: string;
  email?: string;
  course?: string;
  level?: string;
  message?: string;
  page?: string;
}

export interface Lead extends Required<Pick<CreateLeadDto, 'name' | 'phone'>> {
  id: string;
  source: LeadSource;
  status: LeadStatus;
  email: string;
  course: string;
  level: string;
  message: string;
  page: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable()
export class LeadsService {
  private readonly statuses: LeadStatus[] = ['new', 'contacted', 'scheduled', 'enrolled', 'lost'];

  constructor(private readonly db: DatabaseService) {}

  async create(payload: CreateLeadDto): Promise<Lead> {
    const name = this.clean(payload.name);
    const phone = this.clean(payload.phone);
    const source = payload.source === 'trial' ? 'trial' : 'advisory';

    if (!name || !phone) {
      throw new BadRequestException('Vui lòng nhập họ tên và số điện thoại.');
    }

    const leadId = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const email = this.clean(payload.email);
    const course = this.clean(payload.course);
    const level = this.clean(payload.level);
    const message = this.clean(payload.message);
    const page = this.clean(payload.page);
    const now = new Date().toISOString();

    await this.db.query(
      `INSERT INTO leads (id, source, status, name, phone, email, course, level, message, page, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [leadId, source, 'new', name, phone, email, course, level, message, page, now, now]
    );

    return {
      id: leadId,
      source,
      status: 'new',
      name,
      phone,
      email,
      course,
      level,
      message,
      page,
      createdAt: now,
      updatedAt: now,
    };
  }

  async findAll(status?: string): Promise<Lead[]> {
    let queryText = 'SELECT * FROM leads ORDER BY created_at DESC';
    const params: any[] = [];

    if (status && status !== 'all') {
      if (!this.isLeadStatus(status)) {
        throw new BadRequestException('Trạng thái lead không hợp lệ.');
      }
      queryText = 'SELECT * FROM leads WHERE status = $1 ORDER BY created_at DESC';
      params.push(status);
    }

    try {
      const rows = await this.db.query(queryText, params);
      return rows.map((row) => this.mapRowToLead(row));
    } catch (err: any) {
      if (err.message.includes('Cơ sở dữ liệu chưa sẵn sàng')) {
        return [];
      }
      throw err;
    }
  }

  async getStats() {
    const defaultStats = {
      total: 0,
      new: 0,
      contacted: 0,
      scheduled: 0,
      enrolled: 0,
      lost: 0,
      trial: 0,
      advisory: 0,
    };

    try {
      const res = await this.db.query(`
        SELECT 
          count(*)::int as total,
          count(*) FILTER (WHERE status = 'new')::int as new,
          count(*) FILTER (WHERE status = 'contacted')::int as contacted,
          count(*) FILTER (WHERE status = 'scheduled')::int as scheduled,
          count(*) FILTER (WHERE status = 'enrolled')::int as enrolled,
          count(*) FILTER (WHERE status = 'lost')::int as lost,
          count(*) FILTER (WHERE source = 'trial')::int as trial,
          count(*) FILTER (WHERE source = 'advisory')::int as advisory
        FROM leads
      `);

      if (res && res[0]) {
        return {
          total: res[0].total || 0,
          new: res[0].new || 0,
          contacted: res[0].contacted || 0,
          scheduled: res[0].scheduled || 0,
          enrolled: res[0].enrolled || 0,
          lost: res[0].lost || 0,
          trial: res[0].trial || 0,
          advisory: res[0].advisory || 0,
        };
      }
      return defaultStats;
    } catch (err: any) {
      if (err.message.includes('Cơ sở dữ liệu chưa sẵn sàng')) {
        return defaultStats;
      }
      throw err;
    }
  }

  async updateStatus(id: string, status: string): Promise<Lead> {
    if (!this.isLeadStatus(status)) {
      throw new BadRequestException('Trạng thái lead không hợp lệ.');
    }

    const rows = await this.db.query('SELECT * FROM leads WHERE id = $1', [id]);
    const leadRow = rows[0];

    if (!leadRow) {
      throw new NotFoundException('Không tìm thấy lead.');
    }

    const now = new Date().toISOString();
    await this.db.query(
      'UPDATE leads SET status = $1, updated_at = $2 WHERE id = $3',
      [status, now, id]
    );

    const updatedRow = {
      ...leadRow,
      status,
      updated_at: now,
    };

    return this.mapRowToLead(updatedRow);
  }

  private clean(value?: string): string {
    return typeof value === 'string' ? value.trim().slice(0, 500) : '';
  }

  private isLeadStatus(value: string): value is LeadStatus {
    return this.statuses.includes(value as LeadStatus);
  }

  private mapRowToLead(row: any): Lead {
    return {
      id: row.id,
      source: row.source as LeadSource,
      status: row.status as LeadStatus,
      name: row.name,
      phone: row.phone,
      email: row.email || '',
      course: row.course || '',
      level: row.level || '',
      message: row.message || '',
      page: row.page || '',
      createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
      updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    };
  }
}
