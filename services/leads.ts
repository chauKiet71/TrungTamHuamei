import { api } from '../lib/api';

export interface Lead {
  id: string;
  source: 'trial' | 'advisory';
  status: 'new' | 'contacted' | 'scheduled' | 'enrolled' | 'lost';
  name: string;
  phone: string;
  email: string;
  course: string;
  level: string;
  message: string;
  page: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  scheduled: number;
  enrolled: number;
  lost: number;
  trial: number;
  advisory: number;
}

export const leadsService = {
  async getAll(status = 'all'): Promise<Lead[]> {
    return api.get(`/api/leads?status=${encodeURIComponent(status)}`);
  },

  async getStats(): Promise<LeadStats> {
    return api.get('/api/leads/stats');
  },

  async updateStatus(id: string, status: string): Promise<Lead> {
    return api.patch(`/api/leads/${id}/status`, { status });
  },

  async create(payload: {
    source: 'trial' | 'advisory';
    name: string;
    phone: string;
    email?: string;
    course?: string;
    level?: string;
    message?: string;
    page?: string;
  }): Promise<Lead> {
    return api.post('/api/leads', payload);
  },
};
