import React, { useEffect, useState } from 'react';
import contentService from '../services/content.service';

const getIconSvg = (iconName) => {
  switch (iconName) {
    case 'gemstone':
      return (
        <svg className="w-12 h-12 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3L8 9l4 12 4-12-3-6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
        </svg>
      );
    case 'hallmark':
      return (
        <svg className="w-12 h-12 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l2 2 4-4" />
        </svg>
      );
    case 'handcrafted':
      return (
        <svg className="w-12 h-12 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2.5M9.5 3h5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 17c1.5-2 4-3 6-3s4.5 1 6 3M2 20h20" />
        </svg>
      );
    case 'family':
      return (
        <svg className="w-12 h-12 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="7" r="2.5" />
          <path strokeLinecap="round" d="M7 19c0-2.5 2-4.5 5-4.5s5 2 5 4.5" />
          <circle cx="6" cy="11" r="1.8" />
          <path strokeLinecap="round" d="M3 19c0-1.8 1.5-3.2 3-3.2s3 1.4 3 3.2" />
          <circle cx="18" cy="10" r="2.2" />
          <path strokeLinecap="round" d="M14 19c0-2.2 1.8-3.8 4-3.8s4 1.6 4 3.8" />
        </svg>
      );
    case 'safe':
    default:
      return (
        <svg className="w-12 h-12 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7c-2 2-3 4-2 6.5s3.5 1.5 4.5-.5-1-4.5-2.5-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 13l2 2" />
        </svg>
      );
  }
};

const WhyChooseUs = () => {
  const [trustPoints, setTrustPoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrustPoints = async () => {
      try {
        const res = await contentService.getTrustPoints();
        if (res.data?.success && res.data?.data?.trustPoints) {
          setTrustPoints(res.data.data.trustPoints);
        }
      } catch (error) {
        console.error('Failed to fetch trust points:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrustPoints();
  }, []);

  if (loading || trustPoints.length === 0) {
    return null; // or a shimmer if preferred, but hiding it is cleaner if it fails
  }

  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ━━━ DECORATIVE STARS ABOVE HEADER ━━━ */}
        <div className="flex justify-center items-center gap-4 mb-4 select-none">
          <svg className="w-3.5 h-3.5 text-[#C8A24A]/40 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
          </svg>
          <svg className="w-5 h-5 text-[#C8A24A] animate-pulse" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0.2s' }}>
            <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
          </svg>
          <svg className="w-3.5 h-3.5 text-[#C8A24A]/40 animate-pulse" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0.4s' }}>
            <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
          </svg>
        </div>

        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="text-center mb-12 md:mb-16">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A24A] block mb-3">
            ✦ WHY AISHKA ✦
          </span>
          <h2
            className="font-serif text-[#6B1E2E] text-3xl md:text-4xl tracking-wide font-normal max-w-xl mx-auto"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Crafted with Care, Worn with Pride
          </h2>
        </div>

        {/* ━━━ TRUST POINTS ROW ━━━ */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-6 md:gap-x-8">
          {trustPoints.map((point, index) => {
            const isOdd = index % 2 === 0; // 1st, 3rd, 5th items (0, 2, 4)
            return (
              <div
                key={point.id}
                className={`flex flex-col items-center text-center px-4 transition-transform duration-300 hover:scale-[1.02] ${
                  index === trustPoints.length - 1 && trustPoints.length % 2 !== 0 ? 'col-span-2 lg:col-span-1 max-w-[280px] lg:max-w-none mx-auto' : 'col-span-1'
                } ${
                  isOdd ? 'lg:pt-12 lg:pb-4' : 'lg:pt-4 lg:pb-12'
                } ${
                  index < trustPoints.length - 1 ? 'lg:border-r lg:border-[#C8A24A]/20' : ''
                }`}
              >
                {/* Custom Line Art Icon */}
                <div className="mb-5 transition-transform duration-500 hover:rotate-6">
                  {getIconSvg(point.icon_name)}
                </div>

                {/* Title */}
                <h3
                  className="font-serif text-[#6B1E2E] text-lg sm:text-xl tracking-wide mb-3 min-h-[56px] flex items-center justify-center"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                >
                  {point.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs md:text-sm text-[#6B1E2E]/70 font-light leading-relaxed max-w-[240px]">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
