'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, LogOut, Search, RefreshCw, Inbox } from 'lucide-react';
import { leadsService, Lead, LeadStats } from '../../services/leads';
import './crm.css';

const statusLabels: Record<string, string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ',
  scheduled: 'Đã hẹn lịch',
  enrolled: 'Đã ghi danh',
  lost: 'Không phù hợp'
};

const sourceLabels: Record<string, string> = {
  trial: 'Học thử',
  advisory: 'Tư vấn'
};

export default function CrmPage() {
  const { logout, isLoading: authLoading, token } = useAuth();
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    new: 0,
    contacted: 0,
    scheduled: 0,
    enrolled: 0,
    lost: 0,
    trial: 0,
    advisory: 0
  });
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load leads and stats from backend
  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await leadsService.getAll(filterStatus);
      const statsData = await leadsService.getStats();
      setLeads(data);
      setStats(statsData);
    } catch (err: any) {
      console.error('Lỗi khi tải dữ liệu từ máy chủ:', err);
    } finally {
      setLoading(false);
    }
  }, [filterStatus, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle status update
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await leadsService.updateStatus(id, newStatus);
      await loadData();
    } catch (err: any) {
      alert(err.message || 'Không cập nhật được trạng thái.');
    }
  };

  const formatTime = (value: string) => {
    try {
      return new Intl.DateTimeFormat('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(new Date(value));
    } catch (e) {
      return value;
    }
  };

  if (authLoading || !token) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <p>Đang tải thông tin xác thực...</p>
      </div>
    );
  }

  // Filter leads based on search term
  const filteredLeads = leads.filter((lead) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase().trim();
    return (
      (lead.name && lead.name.toLowerCase().includes(term)) ||
      (lead.phone && lead.phone.includes(term)) ||
      (lead.email && lead.email.toLowerCase().includes(term)) ||
      (lead.course && lead.course.toLowerCase().includes(term)) ||
      (lead.level && lead.level.toLowerCase().includes(term)) ||
      (lead.message && lead.message.toLowerCase().includes(term))
    );
  });

  return (
    <div className="crm-body-wrapper">
      <header className="crm-header">
        <div>
          <span className="eyebrow">Huamei CRM</span>
          <h1>Khách hàng đăng ký</h1>
        </div>
        <div className="header-actions">
          <a href="/" className="back-link">
            <ArrowLeft size={18} /> Website
          </a>
          <button id="logoutBtn" className="logout-link" onClick={logout}>
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </header>

      <main className="crm-shell">
        <section className="summary-grid">
          <article className="summary-card">
            <span>Tổng lead</span>
            <strong>{stats.total}</strong>
          </article>
          <article className="summary-card accent">
            <span>Lead mới</span>
            <strong>{stats.new}</strong>
          </article>
          <article className="summary-card">
            <span>Đã hẹn lịch</span>
            <strong>{stats.scheduled}</strong>
          </article>
          <article className="summary-card">
            <span>Đã ghi danh</span>
            <strong>{stats.enrolled}</strong>
          </article>
        </section>

        <section className="toolbar">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="search" 
              placeholder="Tìm theo tên, số điện thoại, khóa học"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Lọc trạng thái"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="new">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="scheduled">Đã hẹn lịch</option>
            <option value="enrolled">Đã ghi danh</option>
            <option value="lost">Không phù hợp</option>
          </select>
          <button className="icon-button" onClick={loadData} title="Tải lại">
            <RefreshCw size={18} className={loading ? 'spin-animation' : ''} />
          </button>
        </section>

        <section className="lead-panel">
          <div className="table-wrap">
            {filteredLeads.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>Nhu cầu</th>
                    <th>Nguồn</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => {
                    const need = lead.course || lead.level || 'Chưa chọn';
                    return (
                      <tr key={lead.id}>
                        <td>
                          <strong>{lead.name}</strong>
                          <div className="muted">{lead.phone}</div>
                          {lead.email && <div className="muted">{lead.email}</div>}
                        </td>
                        <td>
                          <strong>{need}</strong>
                          {lead.message && <div className="message">{lead.message}</div>}
                        </td>
                        <td>
                          <span className="source-pill">
                            {sourceLabels[lead.source]}
                          </span>
                        </td>
                        <td>
                          <div>{formatTime(lead.createdAt)}</div>
                          <div className="muted">Cập nhật {formatTime(lead.updatedAt)}</div>
                        </td>
                        <td>
                          <select 
                            className="status-select" 
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          >
                            {Object.entries(statusLabels).map(([value, label]) => (
                              <option key={value} value={value}>{label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-state" style={{ display: 'grid' }}>
                <Inbox size={32} />
                <p>Chưa có khách hàng phù hợp.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
