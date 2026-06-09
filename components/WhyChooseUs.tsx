import React from 'react';
import { Award, GraduationCap, ShieldCheck, PlaneTakeoff, Gauge, Route } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="why-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">LÝ DO NÊN CHỌN TIẾNG TRUNG HUAMEI</h2>
          <p className="section-subtitle">Những ưu thế vượt trội kiến tạo nên sự khác biệt và thành công của học viên</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Award className="feature-icon" size={32} />
            </div>
            <h3>Trung tâm Tiếng Trung hàng đầu</h3>
            <p>Tự hào nằm trong top các thương hiệu giáo dục tiêu biểu với trang thiết bị phòng học thông minh, hiện đại đạt chuẩn quốc tế.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <GraduationCap className="feature-icon" size={32} />
            </div>
            <h3>Giảng viên chuẩn, trình độ cao</h3>
            <p>Đội ngũ giảng viên 100% đạt chuẩn từ HSK 6 trở lên, giàu kinh nghiệm thực chiến, chuyên môn sư phạm vững vàng và tận tâm.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShieldCheck className="feature-icon" size={32} />
            </div>
            <h3>Chất lượng đào tạo vượt trội</h3>
            <p>Huamei liên tục cải biên giáo trình, cập nhật phương pháp phản xạ hiện đại phù hợp nhất với tư duy học ngôn ngữ của người Việt.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <PlaneTakeoff className="feature-icon" size={32} />
            </div>
            <h3>Cơ hội du học & Việc làm lớn</h3>
            <p>Hỗ trợ tư vấn học bổng du học Trung Quốc giá trị lớn và kết nối cơ hội làm việc hấp dẫn tại các doanh nghiệp đa quốc gia.</p>
          </div>
        </div>
      </div>

      {/* Free Trial Promo Section (Replacing Book Promo Section) */}
      <div className="container" style={{ paddingTop: '4rem' }}>
        <h2 className="trial-title">HỌC THỬ <span className="underline-accent">MIỄN PHÍ</span></h2>
        
        <div className="trial-grid">
          {/* Card 1 */}
          <div className="trial-card">
            <div className="trial-icon-wrapper">
              <Gauge className="trial-card-icon" size={24} />
            </div>
            <div className="trial-card-text">
              <strong>Test đầu vào,</strong>
              <span>nhận kết quả nhanh chính xác</span>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="trial-card">
            <div className="trial-icon-wrapper">
              <Route className="trial-card-icon" size={24} />
            </div>
            <div className="trial-card-text">
              <strong>Tư vấn lộ trình</strong>
              <span>sau test cùng chuyên gia</span>
            </div>
          </div>
          
          {/* Card 3 */}
          <a href="#advisory" className="trial-cta-card">
            <span>ĐĂNG KÝ NGAY</span>
          </a>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUs;
