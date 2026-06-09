import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <div className="footer-logo-wrapper">
            <img src="/assets/images/logo_footer.png" alt="Huamei Education Logo" className="footer-logo-img" />
          </div>
          <p>
            Hệ thống đào tạo tiếng Trung chuẩn quốc tế hàng đầu. Đồng hành cùng bạn chinh phục ngôn ngữ, mở ra cơ hội tương lai tốt đẹp hơn.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/huameiedu" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="14" height="20" fill="currentColor">
                <path d="M80 299.3V256H12V171.3h68v-61.7C80 41.7 120.2 0 197.8 0H272v85.3h-44.5c-30.8 0-36.8 14.6-36.8 36.1v50h82l-10.7 84.7H190.7V512H80V299.3z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@huameiedu" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
                <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/huameiedu" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>THÔNG TIN LIÊN HỆ</h4>
          <ul className="contact-info">
            <li><Mail size={16} /> huameizhongxin@gmail.com</li>
            <li><Phone size={16} /> 036.913.9381</li>
            <li><MapPin size={16} /> Số 15, Ngõ 4, Nguyễn Đổng Chi, Cầu Diễn, Nam Từ Liêm, Hà Nội</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>DANH SÁCH KHÓA HỌC</h4>
          <ul className="footer-links">
            <li><a href="#courses">Khóa học 1-1</a></li>
            <li><a href="#courses">Khóa học giao tiếp</a></li>
            <li><a href="#programs">Luyện thi HSK 1 - 6</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>VỀ TIẾNG TRUNG HUAMEI</h4>
          <ul className="footer-links">
            <li><a href="#">Giới thiệu giáo trình</a></li>
            <li><a href="#reviews">Cảm nhận học viên</a></li>
            <li><a href="#advisory">Cơ hội tuyển dụng</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom text-center">
        <div className="container">
          <p>&copy; 2026 Tiếng Trung HuaMei - Hoa Mỹ</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
