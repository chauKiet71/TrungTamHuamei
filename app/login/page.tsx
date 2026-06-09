'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setShake(false);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameInput.trim(), password: passwordInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Đăng nhập không thành công.');
      }

      login(data.token, data.username);
    } catch (err: any) {
      setErrorMessage(err.message);
      setShake(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inlineStyles = `
    .login-body-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F3F4F6;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .ambient-circle {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      z-index: 1;
      opacity: 0.6;
      animation: float 12s infinite alternate ease-in-out;
    }

    .circle-blue {
      width: 350px;
      height: 350px;
      background: #0B3D91;
      top: -50px;
      left: -50px;
    }

    .circle-yellow {
      width: 300px;
      height: 300px;
      background: #FFB703;
      bottom: -50px;
      right: -50px;
      animation-delay: -6s;
    }

    @keyframes float {
      0% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(40px, 30px) scale(1.1); }
    }

    .login-card {
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
      width: 100%;
      max-width: 420px;
      padding: 3rem 2.5rem;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      z-index: 10;
      position: relative;
      text-align: center;
      animation: slideUp 0.6s ease;
    }

    .login-card.shake {
      animation: shake 0.4s ease;
    }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }

    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 2rem;
      text-decoration: none;
    }

    .brand-img {
      height: 52px;
      width: auto;
      object-fit: contain;
    }

    .brand-text {
      display: flex;
      flex-direction: column;
      text-align: left;
      line-height: 1.15;
    }

    .brand-title {
      font-weight: 900;
      font-size: 1.35rem;
      color: #0B3D91;
      letter-spacing: 1px;
    }

    .brand-subtitle {
      font-weight: 700;
      font-size: 0.68rem;
      color: #FFB703;
      letter-spacing: 0.5px;
    }

    h2 {
      color: #1F2937;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #6B7280;
      font-size: 0.9rem;
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;
      position: relative;
    }

    label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: #1F2937;
      margin-bottom: 0.5rem;
    }

    .input-wrapper {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #6B7280;
    }

    .form-input {
      width: 100%;
      padding: 12px 14px 12px 42px;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      color: #1F2937;
      outline: none;
      transition: all 0.3s ease;
    }

    .form-input:focus {
      border-color: #1565D8;
      box-shadow: 0 0 0 4px rgba(21, 101, 216, 0.15);
      background: #FFFFFF;
    }

    .btn-submit {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      border: none;
      background: linear-gradient(135deg, #0B3D91 0%, #1565D8 100%);
      color: #FFFFFF;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(11, 61, 145, 0.2);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 2rem;
    }

    .btn-submit:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(11, 61, 145, 0.3);
    }

    .btn-submit:disabled {
      background: #6B7280;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .error-alert {
      background-color: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      color: #EF4444;
      padding: 10px 14px;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 8px;
      text-align: left;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #FFFFFF;
      animation: spin 1s infinite linear;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .login-footer {
      margin-top: 2.5rem;
      font-size: 0.78rem;
      color: #6B7280;
    }
  `;

  return (
    <div className="login-body-wrapper">
      <style>{inlineStyles}</style>
      <div className="ambient-circle circle-blue"></div>
      <div className="ambient-circle circle-yellow"></div>

      <main className={`login-card ${shake ? 'shake' : ''}`}>
        {/* Logo */}
        <a href="#" className="brand-logo">
          <img src="/assets/images/logo.png" alt="Trung Tâm Tiếng Trung Huamei" className="brand-img" />
          <div className="brand-text">
            <span className="brand-title">HUAMEI</span>
            <span className="brand-subtitle">TIẾNG TRUNG HOA MỸ</span>
          </div>
        </a>

        <h2>Hệ thống Quản trị</h2>
        <p className="subtitle">Đăng nhập tài khoản để quản lý dữ liệu khách hàng</p>

        {/* Error box */}
        {errorMessage && (
          <div className="error-alert">
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                id="username" 
                className="form-input" 
                placeholder="Nhập tên đăng nhập" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required 
                autoComplete="username"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                id="password" 
                className="form-input" 
                placeholder="Nhập mật khẩu" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required 
                autoComplete="current-password"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              <span>ĐĂNG NHẬP</span>
            )}
          </button>
        </form>

        <div className="login-footer">
          &copy; 2026 Tiếng Trung Huamei. All rights reserved.
        </div>
      </main>
    </div>
  );
}
