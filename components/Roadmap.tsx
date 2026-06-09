'use client';

import React, { useState } from 'react';
import { CalendarCheck } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hsk' | 'working'>('hsk');

  return (
    <section id="roadmap" className="roadmap-section">
      <div className="container">
        {/* Header of the section */}
        <div className="roadmap-header">
          <div className="roadmap-header-icon">
            <img 
              src="/assets/images/learning_roadmap_icon.png" 
              alt="Chiến lược học tinh gọn" 
              className="roadmap-header-img" 
            />
          </div>
          <div className="roadmap-header-text">
            <div className="roadmap-badge">CHIẾN LƯỢC HỌC TINH GỌN</div>
            <h2 className="roadmap-title">LỘ TRÌNH TỔNG QUAN</h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="roadmap-tabs">
          <button 
            className={`roadmap-tab-btn ${activeTab === 'hsk' ? 'active' : ''}`}
            onClick={() => setActiveTab('hsk')}
          >
            LUYỆN THI HSK
          </button>
          <button 
            className={`roadmap-tab-btn ${activeTab === 'working' ? 'active' : ''}`}
            onClick={() => setActiveTab('working')}
          >
            TIẾNG TRUNG CHO NGƯỜI ĐI LÀM
          </button>
        </div>

        {/* Tab Content */}
        <div className="roadmap-content">
          {/* Pane 1: HSK */}
          {activeTab === 'hsk' && (
            <div className="roadmap-pane active">
              <div className="roadmap-banner-wrapper">
                <img 
                  src="/assets/images/image_lo_trinh1.png" 
                  alt="Lộ trình luyện thi HSK" 
                  className="roadmap-banner-img" 
                />
              </div>
            </div>
          )}

          {/* Pane 2: Working Chinese */}
          {activeTab === 'working' && (
            <div className="roadmap-pane active">
              <div className="roadmap-banner-wrapper">
                <img 
                  src="/assets/images/image_lo_trinh2.png" 
                  alt="Lộ trình tiếng Trung cho người đi làm" 
                  className="roadmap-banner-img" 
                />
              </div>
            </div>
          )}
        </div>

        {/* CTA Button at the bottom */}
        <div className="roadmap-cta">
          <a href="#advisory" className="btn btn-accent btn-large">
            <CalendarCheck className="btn-icon" size={20} />
            ĐĂNG KÝ TƯ VẤN LỘ TRÌNH MIỄN PHÍ
          </a>
        </div>
      </div>
    </section>
  );
};
export default Roadmap;
