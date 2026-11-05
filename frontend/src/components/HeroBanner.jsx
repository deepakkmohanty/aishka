import React, { useState, useEffect } from 'react';
import contentService from '../services/content.service';
import heroImg from '../assets/hero_realistic_model.png';

const BengaliPlaque = ({ data }) => {
  const line1 = data.line1 || 'গয়নায় ধরা থাকুক';
  const line2 = data.line2 || 'শুভ সূচনা,';
  const line3 = data.line3 || 'অক্ষয় হোক';
  const line4 = data.line4 || 'আপনার প্রতিটি মুহূর্ত';

  return (
    <div className="relative w-[190px] xs:w-[210px] sm:w-[260px] md:w-[310px] h-[238px] xs:h-[263px] sm:h-[325px] md:h-[388px] flex flex-col items-center justify-center text-center select-none drop-shadow-xl animate-fade-in">
      {/* Absolute SVG Background for Arched Shape */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {/* Outer Arch Shape with cream background and gold border */}
        <path 
          d="M 15 385 
             L 15 160 
             C 15 150, 5 145, 15 135 
             C 25 105, 90 35, 160 15 
             C 230 35, 295 105, 305 135 
             C 315 145, 305 150, 305 160 
             L 305 385 
             Z" 
          fill="#FAF6EE" 
          stroke="#C8A24A" 
          strokeWidth="3" 
        />
        {/* Inner Dotted Arch Shape */}
        <path 
          d="M 23 377 
             L 23 162 
             C 23 154, 15 149, 23 141 
             C 32 113, 93 45, 160 25 
             C 227 45, 288 113, 297 141 
             C 305 149, 297 154, 297 162 
             L 297 377 
             Z" 
          stroke="#C8A24A" 
          strokeWidth="1.2" 
          strokeDasharray="4 4" 
        />
      </svg>

      {/* Content Placed Over Background */}
      <div className="relative z-10 flex flex-col items-center px-4 xs:px-6 pt-3 xs:pt-4 pb-2 w-full h-full justify-center">
        {/* Kalash Icon */}
        <div className="text-[#7A1213] mb-1 sm:mb-2">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-11 md:h-11">
            <path d="M22 26C22 20 28 16 32 20C36 16 42 20 42 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 28C16 18 24 16 32 24C40 16 48 18 48 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M28 20C28 15 32 10 32 10C32 10 36 15 36 20Z" fill="currentColor" />
            <path d="M20 34C18 38 18 46 22 50C26 54 38 54 42 50C46 46 46 38 44 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 28H40C41 28 42 29 42 30H22C22 29 23 28 24 28Z" fill="currentColor" />
            <path d="M22 30C22 30 24 32 32 32C40 32 42 30 42 30" stroke="currentColor" strokeWidth="1.5" />
            <path d="M32 35V45M27 40H37M27 35H32M32 45H37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Bengali text lines */}
        <h3 className="text-[#7A1213] text-[9px] xs:text-[10px] sm:text-[13px] md:text-[16px] font-bold tracking-wide mb-0.5 sm:mb-1" style={{ fontFamily: "serif" }}>
          {line1}
        </h3>
        <h3 className="text-[#7A1213] text-[9px] xs:text-[10px] sm:text-[13px] md:text-[16px] font-bold tracking-wide mb-1 sm:mb-2" style={{ fontFamily: "serif" }}>
          {line2}
        </h3>
        <h2 className="text-[#7A1213] text-[18px] xs:text-[20px] sm:text-[28px] md:text-[34px] font-extrabold tracking-wider my-0.5 sm:my-1 leading-none" style={{ fontFamily: "serif" }}>
          {line3}
        </h2>
        <p className="text-[#7A1213] text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] font-bold tracking-wide mt-1 sm:mt-1.5 mb-1 sm:mb-2" style={{ fontFamily: "serif" }}>
          {line4}
        </p>

        {/* Small dots decoration */}
        <div className="flex items-center gap-1 mt-1 sm:mt-2 text-[#C8A24A] scale-[0.7] sm:scale-100">
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
          <span className="w-1 h-1 rounded-full bg-current"></span>
        </div>
      </div>
    </div>
  );
};

const HeroBanner = () => {
  const [heroPlaque, setHeroPlaque] = useState({
    backgroundImage: '',
    line1: 'গয়নায় ধরা থাকুক',
    line2: 'শুভ সূচনা,',
    line3: 'অক্ষয় হোক',
    line4: 'আপনার প্রতিটি মুহূর্ত'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await contentService.getSectionContent('hero_section');
        if (res.data.success && res.data.data.content) {
          setHeroPlaque(res.data.data.content);
        }
      } catch (err) {
        console.error('Failed to load hero plaque data, using defaults.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[45vh] min-h-[380px] bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#7A1213] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="w-full relative h-[42vh] xs:h-[46vh] sm:h-[50vh] md:h-[45vh] lg:h-[48vh] min-h-[280px] xs:min-h-[320px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[440px]">
        {/* ━━━ BACKGROUND IMAGE ━━━ */}
        <img 
          src={heroPlaque.backgroundImage || heroImg} 
          alt="Aishka Banner"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
        />

        {/* ━━━ CONTENT OVERLAY ━━━ */}
        <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          {/* Bengali Plaque */}
          <div className="w-full flex justify-start py-4 md:py-0">
            <BengaliPlaque data={heroPlaque} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
