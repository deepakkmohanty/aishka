import React from 'react';

const TrustSection = () => {
  const promises = [
    {
      title: 'Ethical Sourcing',
      desc: 'Every ruby and emerald is traceable, mined with respect for both people and the earth.',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
          <polygon points="32,8 56,24 48,56 16,56 8,24" />
          <polygon points="32,8 40,24 32,56 24,24" />
          <line x1="8" y1="24" x2="56" y2="24" />
          <line x1="16" y1="56" x2="48" y2="56" />
        </svg>
      ),
      delay: '0'
    },
    {
      title: 'Heirloom Quality',
      desc: 'Crafted with heavy-gauge 925 silver designed to be passed down through generations.',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
          <path d="M 20 32 C 20 16, 44 16, 44 32 C 44 48, 20 48, 20 32 Z" />
          <path d="M 32 20 C 16 20, 16 44, 32 44 C 48 44, 48 20, 32 20 Z" />
          <circle cx="32" cy="32" r="4" />
        </svg>
      ),
      delay: '150'
    },
    {
      title: 'Insured Transit',
      desc: 'Your pieces travel in unmarked, fully insured packaging directly to your hands.',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 transform -rotate-45">
          <circle cx="44" cy="20" r="12" />
          <circle cx="44" cy="20" r="6" />
          <line x1="36" y1="28" x2="12" y2="52" />
          <line x1="24" y1="40" x2="16" y2="32" />
          <line x1="18" y1="46" x2="10" y2="38" />
        </svg>
      ),
      delay: '300'
    },
    {
      title: 'Lifetime Care',
      desc: 'Complimentary professional polishing and stone-setting checks for the life of the piece.',
      icon: (
        <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14">
          <line x1="32" y1="4" x2="32" y2="60" />
          <line x1="4" y1="32" x2="60" y2="32" />
          <line x1="12" y1="12" x2="52" y2="52" />
          <line x1="12" y1="52" x2="52" y2="12" />
          <circle cx="32" cy="32" r="16" strokeDasharray="2 4" />
          <circle cx="32" cy="32" r="2" fill="currentColor" />
        </svg>
      ),
      delay: '450'
    }
  ];

  return (
    <section className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-[#C8A24A]/20">
      
      {/* Background Architectural/Geometric Overlay */}
      <svg className="absolute top-0 right-0 w-[800px] h-[800px] text-[#C8A24A] opacity-[0.03] pointer-events-none transform translate-x-1/4 -translate-y-1/4" viewBox="0 0 100 100">
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="currentColor" strokeWidth="0.2"/>
        <polygon points="50,15 85,35 85,65 50,85 15,65 15,35" fill="none" stroke="currentColor" strokeWidth="0.2"/>
        <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.2"/>
        <line x1="0" y1="25" x2="100" y2="75" stroke="currentColor" strokeWidth="0.2"/>
        <line x1="0" y1="75" x2="100" y2="25" stroke="currentColor" strokeWidth="0.2"/>
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col items-start">
        
        {/* Left-aligned, Grid-aligned Section Header */}
        <div className="flex flex-col items-start text-left mb-16 md:mb-24 relative z-10 w-full">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-[1px] bg-[#6B1E2E]"></div>
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-[#6B1E2E]">
              Our Commitment
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] text-[#6B1E2E] font-serif tracking-tight leading-none">
            The Aishka Promise
          </h2>
        </div>

        {/* Staggered Zig-Zag / Floating Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 xl:gap-8 mt-4">
          {promises.map((promise, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-start text-left group relative ${idx % 2 === 1 ? 'xl:mt-20' : ''}`}
            >
              {/* Connecting dashed line in background for desktop (only between items) */}
              {idx < 3 && (
                <div className="hidden xl:block absolute top-12 left-[60%] w-full h-[1px] border-t border-dashed border-[#C8A24A]/30 pointer-events-none" style={{ transform: idx % 2 === 0 ? 'rotate(15deg)' : 'rotate(-15deg)' }}></div>
              )}

              {/* Icon Container: Elegant floating sketches */}
              <div className="mb-8 text-[#C8A24A] transform transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                {promise.icon}
              </div>

              {/* Title: Serif font */}
              <h3 className="text-xl md:text-2xl text-[#6B1E2E] font-serif tracking-wide mb-4 italic">
                {promise.title}
              </h3>

              {/* Description: 14px size for readable rendering */}
              <p className="text-[#6B1E2E]/80 font-sans text-sm leading-[1.8] font-medium max-w-[260px]">
                {promise.desc}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
