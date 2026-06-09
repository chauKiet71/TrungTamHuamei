'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#" className="logo">
          <img src="/assets/images/logo.jpg" alt="Trung Tâm Tiếng Trung Huamei" className="logo-img" />
        </a>

        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="#hero" className="nav-link active" onClick={() => setIsMenuOpen(false)}>
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#why-choose-us" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="#courses" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Khóa học
              </a>
            </li>
            <li>
              <a href="#qa" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Hỏi đáp
              </a>
            </li>
            <li>
              <a href="#reviews" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Đánh giá
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-cta">
          <a href="#advisory" className="btn-sign-up">
            ĐĂNG KÝ TƯ VẤN
          </a>
        </div>

        <button 
          className="mobile-menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};
export default Navbar;
