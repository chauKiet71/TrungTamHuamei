'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const slides = [
    { img: '/assets/images/banner1.jpg', alt: 'Huamei Banner 1' },
    { img: '/assets/images/banner2.jpg', alt: 'Huamei Banner 2' },
    { img: '/assets/images/banner1.jpg', alt: 'Huamei Banner 1' },
    { img: '/assets/images/banner2.jpg', alt: 'Huamei Banner 2' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section id="hero" className="hero-section-banner">
      <div className="hero-carousel-container">
        <div className="hero-carousel-track">
          {slides.map((slide, idx) => (
            <div 
              key={idx} 
              className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
              style={{ display: idx === currentIndex ? 'block' : 'none' }}
            >
              <a href="#advisory" className="hero-banner-link">
                <img src={slide.img} alt={slide.alt} className="hero-banner-img" />
              </a>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button className="carousel-arrow prev-arrow" onClick={prevSlide} aria-label="Previous Slide">
          <ChevronLeft size={24} />
        </button>
        <button className="carousel-arrow next-arrow" onClick={nextSlide} aria-label="Next Slide">
          <ChevronRight size={24} />
        </button>
        
        {/* Indicators / Dot Navigation */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`} 
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Hero;
