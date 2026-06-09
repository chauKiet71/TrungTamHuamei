'use client';

import React, { useState } from 'react';
import { Plus, Minus, ClipboardList } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Roadmap from '../components/Roadmap';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import ContactWidget from '../components/ContactWidget';
import { leadsService } from '../services/leads';

export default function HomePage() {
  // 1. Courses Section Tab State
  const [courseTab, setCourseTab] = useState<'hsk' | 'general'>('hsk');

  // 2. QA Accordion State
  const [openQa, setOpenQa] = useState<number | null>(null);
  const toggleQa = (idx: number) => {
    setOpenQa(openQa === idx ? null : idx);
  };

  // 3. Advisory Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [course, setCourse] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !course) {
      alert('Vui lòng điền các trường bắt buộc (*)');
      return;
    }

    setIsSubmitting(true);
    try {
      await leadsService.create({
        source: 'advisory',
        name: name.trim(),
        phone: phone.trim(),
        course,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
        page: 'Trang chủ (Next.js)',
      });

      alert('Đăng ký tư vấn thành công! Tiếng Trung Huamei sẽ liên hệ với bạn trong vòng 24 giờ.');
      // Reset form
      setName('');
      setPhone('');
      setCourse('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      alert(err.message || 'Gửi thông tin thất bại. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const qaList = [
    {
      q: '1. Học phí cho mỗi khóa học tại Huamei là bao nhiêu?',
      a: 'Học phí tại Huamei được thiết kế linh hoạt dựa trên lộ trình cá nhân hóa và hình thức học (1 kèm 1 hoặc lớp nhóm). Trung tâm liên tục có các chương trình học bổng và ưu đãi lên đến 30% học phí dành cho học viên đăng ký sớm. Vui lòng gửi thông tin tư vấn để nhận báo giá chi tiết.'
    },
    {
      q: '2. Lộ trình học tại Huamei như thế nào?',
      a: 'Lộ trình học được thiết kế chuẩn chỉnh từ cơ bản (phát âm, chữ viết cơ bản) đến nâng cao (giao tiếp chuyên sâu, ôn luyện đề thi HSK). Mỗi học viên đều được làm bài kiểm tra năng lực đầu vào để xây dựng lộ trình học cá nhân phù hợp nhất, rút ngắn 50% thời gian học.'
    },
    {
      q: '3. Huamei có cam kết chất lượng đầu ra không?',
      a: 'Có. Huamei cam kết bằng văn bản hợp đồng đào tạo đối với tất cả học viên đăng ký lộ trình học đầy đủ. Nếu học viên đi học và làm bài tập đầy đủ nhưng không đạt đầu ra, trung tâm sẽ hỗ trợ học lại hoàn toàn miễn phí cho đến khi đạt mục tiêu.'
    },
    {
      q: '4. Người mới bắt đầu học Tiếng Trung cần chuẩn bị những gì?',
      a: 'Bạn chỉ cần chuẩn bị một tinh thần thoải mái và sự quyết tâm học tập. Toàn bộ giáo trình độc quyền, tài khoản app hỗ trợ tự học, tài liệu bổ trợ và hệ thống bài tập thực hành sẽ được Huamei cung cấp đầy đủ khi bạn nhập học.'
    }
  ];

  return (
    <>
      {/* Header & Navigation */}
      <Navbar />

      {/* Hero Carousel Slideshow */}
      <Hero />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Courses Section */}
      <section id="courses" className="courses-explore-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title title-with-icon">
              <img src="/assets/images/courses_title_icon.png" alt="Courses Icon" className="section-title-icon" />
              KHOÁ HỌC NỔI BẬT TẠI HUAMEI
            </h2>
          </div>
          
          <div className="course-tabs-container">
            <div className="course-tab-headers">
              <button 
                className={`tab-btn ${courseTab === 'hsk' ? 'active' : ''}`}
                onClick={() => setCourseTab('hsk')}
              >
                HuaMei HSK 3.0
              </button>
              <button 
                className={`tab-btn ${courseTab === 'general' ? 'active' : ''}`}
                onClick={() => setCourseTab('general')}
              >
                HuaMei Giao tiếp
              </button>
            </div>
            
            <div className="course-tab-contents">
              {/* Tab 1: HSK */}
              {courseTab === 'hsk' && (
                <div className="tab-pane active" id="tab-one-on-one">
                  <div className="tab-content-grid">
                    <div className="tab-text">
                      <p>
                        <strong>HuaMei HSK 3.0</strong> là chương trình ứng dụng công nghệ AI và lộ trình cá nhân hoá, giúp người học thi đỗ HSK hiệu quả và sử dụng tiếng Trung vững vàng. Khoá học phù hợp với người cần chứng chỉ để du học, xin việc và phát triển sự nghiệp.
                      </p>
                      <a href="#roadmap" className="btn btn-primary">XEM CHI TIẾT KHÓA HỌC</a>
                    </div>
                    <div>
                      <img src="/assets/images/image_course.png" alt="Lớp học HSK Huamei" className="tab-img" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab 2: General */}
              {courseTab === 'general' && (
                <div className="tab-pane active" id="tab-general">
                  <div className="tab-content-grid">
                    <div className="tab-text">
                      <p>
                        <strong>HuaMei Giao tiếp - Khóa Tiếng Trung cho người đi làm</strong> được thiết kế dành riêng cho người bận rộn, với mục tiêu cốt lõi: dùng được tiếng Trung ngay trong công việc hằng ngày.
                        <br /><br />
                        Lộ trình được tối ưu cho người đi làm: bài học ngắn – rõ ràng – thực dụng, bài tập tinh gọn nhưng hiệu quả, đảm bảo học viên tiến bộ thật và sử dụng được thật trong môi trường công việc.
                      </p>
                      <a href="#advisory" className="btn btn-primary">XEM CHI TIẾT KHÓA HỌC</a>
                    </div>
                    <div>
                      <img src="/assets/images/image_course2.png" alt="Đào tạo Tiếng Trung Huamei" className="tab-img" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <Roadmap />

      {/* QA Section */}
      <section id="qa" className="qa-section">
        <div className="container qa-container">
          <div className="qa-content">
            <div className="section-header">
              <h2 className="section-title">Hỏi đáp & Củng cố kiến thức</h2>
              <p className="section-subtitle">Giải đáp tất cả các băn khoăn phổ biến nhất của học viên khi bắt đầu</p>
            </div>
            
            <div className="accordion">
              {qaList.map((item, idx) => (
                <div key={idx} className={`accordion-item ${openQa === idx ? 'active' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleQa(idx)}>
                    <span>{item.q}</span>
                    {openQa === idx ? <Minus className="accordion-icon" size={16} /> : <Plus className="accordion-icon" size={16} />}
                  </button>
                  <div className="accordion-body">
                    <div className="accordion-content">
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="qa-image-container">
            <img src="/assets/images/image_question.png" alt="Tư vấn học tập tại Huamei" className="qa-img" />
          </div>
        </div>
      </section>

      {/* Advisory Form Section */}
      <section id="advisory" className="advisory-section-redesigned">
        <div className="container">
          <div className="advisory-box-redesigned">
            {/* Left column: Marketing & Image */}
            <div className="advisory-marketing">
              <span className="advisory-tag">HỌC TIẾNG TRUNG TỪ NGƯỜI GIỎI NHẤT</span>
              <h2 className="advisory-title-main">ĐĂNG KÝ TƯ VẤN NGAY!</h2>
              
              <div className="advisory-image-wrapper">
                <img src="/assets/images/advisory_hsk_girl.jpg" alt="Đăng ký tư vấn cùng Huamei" className="advisory-girl-img" />
              </div>
            </div>
            
            {/* Right column: Form */}
            <div className="advisory-form-wrapper">
              <div className="advisory-marketing-desktop">
                <span className="advisory-tag">HỌC TIẾNG TRUNG TỪ NGƯỜI GIỎI NHẤT</span>
                <h2 className="advisory-title-main">ĐĂNG KÝ TƯ VẤN NGAY!</h2>
              </div>
              <form onSubmit={handleFormSubmit} className="advisory-form-redesigned">
                <div className="form-grid-2">
                  <div className="form-group-white">
                    <label htmlFor="adv-name">Họ và Tên (*)</label>
                    <input 
                      type="text" 
                      id="adv-name" 
                      placeholder="Họ và Tên" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group-white">
                    <label htmlFor="adv-phone">Số Điện Thoại (*)</label>
                    <input 
                      type="tel" 
                      id="adv-phone" 
                      placeholder="Nhập số điện thoại" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                </div>
                
                <div className="form-grid-2">
                  <div className="form-group-white">
                    <label htmlFor="adv-course">Khóa Học Bạn Quan Tâm (*)</label>
                    <select 
                      id="adv-course" 
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      required
                    >
                      <option value="">-- Chọn khóa học --</option>
                      <option value="1on1">Tiếng Trung Lớp 1 kèm 1</option>
                      <option value="com">Tiếng Trung Giao Tiếp</option>
                      <option value="hsk">Luyện Thi HSK 1 - 6</option>
                      <option value="kids">Tiếng Trung Trẻ Em</option>
                    </select>
                  </div>
                  <div className="form-group-white">
                    <label htmlFor="adv-email">Email</label>
                    <input 
                      type="email" 
                      id="adv-email" 
                      placeholder="info@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-group-white">
                  <label htmlFor="adv-message">Câu Hỏi Khác?</label>
                  <textarea 
                    id="adv-message" 
                    rows={3} 
                    placeholder="Viết câu hỏi tại đây" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                
                <div className="form-submit-row">
                  <button type="submit" className="btn-submit-redesigned" disabled={isSubmitting}>
                    <ClipboardList className="btn-icon" size={18} />
                    {isSubmitting ? 'ĐANG GỬI...' : 'GỬI THÔNG TIN NGAY'}
                  </button>
                  <p className="submit-subtext">Huamei sẽ liên hệ lại trong vòng 24 giờ làm việc.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews/Testimonials */}
      <Reviews />

      {/* Footer */}
      <Footer />

      {/* Sticky Support Widget */}
      <ContactWidget />
    </>
  );
}
