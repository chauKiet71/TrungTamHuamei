'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  const reviews = [
    { name: 'Hoàng Tố Anh', role: 'Học viên giao tiếp', text: '"Mình thực sự thích phương pháp học giao tiếp phản xạ tại Huamei. Giáo viên cực kỳ hỗ trợ nhiệt tình, giáo trình bám sát thực tế cuộc sống, giúp mình tự tin nói tiếng Trung chỉ sau 3 tháng học tập tại đây."' },
    { name: 'Lê Thương', role: 'Luyện thi HSK 4', text: '"Khóa học luyện thi HSK tại đây rất chất lượng. Các thầy cô dạy kỹ, chia sẻ nhiều mẹo giải đề thi nhanh và chuẩn xác. Nhờ lộ trình học tối ưu của Huamei mà mình đã đạt điểm số HSK 4 dễ dàng chỉ sau một khóa."' },
    { name: 'Nguyễn Hải Nam', role: 'Học viên lớp 1 kèm 1', text: '"Học lớp 1-1 giúp mình tiến bộ cực nhanh. Thầy cô sửa lỗi phát âm kỹ lưỡng và thiết kế nội dung bài học theo đúng nhu cầu công việc kinh doanh của mình. Rất đáng tiền đầu tư học tại đây."' },
    { name: 'Phạm Minh Đức', role: 'Tiếng Trung du lịch', text: '"Nhờ Huamei mà chuyến đi Thượng Hải của mình cực kỳ suôn sẻ. Mình có thể giao tiếp cơ bản, tự tin mua sắm và hỏi đường mà không cần phiên dịch viên hỗ trợ."' },
    { name: 'Trần Thu Trang', role: 'Học viên HSK 5', text: '"Giáo trình Mi Di Tong hỗ trợ tự học ở nhà cực kỳ tốt kết hợp với lớp học chất lượng cao của Huamei giúp mình đỗ HSK 5 nhanh vượt mức mong đợi ban đầu."' },
    { name: 'Đỗ Việt Anh', role: 'Học sinh cấp 3', text: '"Các thầy cô dạy siêu vui và dễ hiểu. Lớp học thoải mái không bị áp lực chút nào, em học được nhiều từ vựng và tự tin giao tiếp phản xạ tự nhiên hơn rất nhiều."' },
    { name: 'Vũ Thị Mai', role: 'Nhân viên văn phòng', text: '"Khóa học giao tiếp buổi tối tại Huamei giúp ích rất nhiều cho công việc hiện tại của mình tại công ty Trung Quốc. Đồng nghiệp và sếp đều khen mình tiến bộ nhanh chóng."' },
    { name: 'Nguyễn Tiến Đạt', role: 'Luyện thi HSK 6', text: '"Khóa học 1-1 cực kỳ chất lượng, giảng viên sửa lỗi phát âm và viết bài luận rất chi tiết. Mình đạt HSK 6 ngay lần thi đầu tiên sau khi kết thúc khóa học ở trung tâm."' },
    { name: 'Bùi Thùy Linh', role: 'Du học sinh tương lai', text: '"Trung tâm hỗ trợ mình làm hồ sơ xin học bổng du học rất chu đáo và tận tâm. Khóa học tiếng Trung tại đây giúp mình tự tin phỏng vấn học bổng thành công rực rỡ."' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(2);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(2);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = reviews.length - cardsPerView;

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  // Inline transform style calculation
  const getTransformStyle = () => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const card = trackRef.current.children[0] as HTMLElement;
      const cardWidth = card.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
      const offset = (cardWidth + gap) * currentIndex;
      return `translateX(-${offset}px)`;
    }
    // Fallback percentages
    return `translateX(-${(100 / cardsPerView) * currentIndex}%)`;
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="reviews-combined-box">
          {/* Header of the box */}
          <div className="reviews-box-header-redesigned">
            <div className="reviews-header-top-row">
              <div className="reviews-header-target-wrapper">
                <img src="/assets/images/icon_target.png" alt="Mục tiêu Huamei" className="reviews-header-target-img" />
              </div>
              <div className="reviews-header-title-wrapper">
                <h2 className="reviews-title-main">ĐƯỢC TIN TƯỞNG & LỰA CHỌN BỞI</h2>
                <div className="reviews-title-banner">
                  <span>HÀNG CHỤC NGHÌN HỌC VIÊN TRÊN TOÀN QUỐC</span>
                </div>
              </div>
            </div>
            
            <div className="reviews-header-subtitle-row">
              <div className="subtitle-star-icon">
                <Star size={16} fill="#FFB703" color="#FFB703" />
              </div>
              <p className="reviews-subtitle-text">
                Đây chính là sự ghi nhận quý giá nhất để <strong>Huamei</strong> không ngừng cải tiến chương trình, phương pháp và trải nghiệm học tập – giúp mỗi học viên học đúng hướng và tiến bộ rõ ràng.
              </p>
            </div>
          </div>
          
          {/* Slider section */}
          <div className="reviews-slider-container">
            <div className="reviews-slider-viewport" style={{ overflow: 'hidden' }}>
              <div 
                className="reviews-slider-track" 
                ref={trackRef}
                style={{ 
                  display: 'flex', 
                  transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                  transform: getTransformStyle()
                }}
              >
                {reviews.map((rev, idx) => (
                  <div key={idx} className="review-card" style={{ flexShrink: 0, width: cardsPerView === 1 ? '100%' : 'calc(50% - 0.5rem)' }}>
                    <div className="review-header">
                      <div className="review-user-info">
                        <h4>{rev.name}</h4>
                        <span>{rev.role}</span>
                      </div>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="star-filled" fill="#FFB703" color="#FFB703" style={{ marginRight: '2px' }} />
                        ))}
                      </div>
                    </div>
                    <p className="review-text">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Reviews;
