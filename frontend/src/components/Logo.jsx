import React from 'react';

const Logo = ({ 
  showText = true, 
  showTagline = true, 
  layout = 'horizontal', 
  className = 'h-11' 
}) => {
  const isVertical = layout === 'vertical';

  return (
    <div className={`flex select-none ${isVertical ? 'flex-col items-center text-center' : 'flex-row items-center'} ${isVertical ? '' : className}`}>
      {/* Royal Monogram Icon */}
      <svg 
        viewBox="0 0 100 100" 
        className={`w-auto flex-shrink-0 ${isVertical ? className : 'h-full'}`}
        aria-label="Aishka Logo Icon"
        role="img"
      >
        {/* Diamond Pavilion Crest */}
        <polygon 
          points="50,6 94,50 50,94 6,50" 
          fill="none" 
          stroke="#C8A24A" 
          strokeWidth="1.5" 
          strokeDasharray="1.5 2"
        />
        <polygon 
          points="50,12 88,50 50,88 12,50" 
          fill="#FAF6EE" 
          stroke="#C8A24A" 
          strokeWidth="1.2"
        />

        {/* 4 Corner Sparkles */}
        <path d="M50,14 L51.5,19 L56,20 L51.5,21 L50,26 L48.5,21 L44,20 L48.5,19 Z" fill="#E8C766" />
        <path d="M84,50 L81,51 L80,54 L79,51 L76,50 L79,49 L80,46 L81,49 Z" fill="#E8C766" />
        <path d="M50,86 L48.5,81 L44,80 L48.5,79 L50,74 L51.5,79 L56,80 L51.5,81 Z" fill="#E8C766" />
        <path d="M16,50 L19,49 L20,46 L21,49 L24,50 L21,51 L20,54 L19,51 Z" fill="#E8C766" />

        {/* Luxury Serif Letter 'A' */}
        <path 
          d="M50 24 L32 72 H39 L43.5 59 H56.5 L61 72 H68 L50 24 Z M50 37 L54.5 53 H45.5 L50 37 Z" 
          fill="#7A1213" 
        />
        
        {/* Diamond Crown Gem atop 'A' */}
        <circle cx="50" cy="22" r="3" fill="#C8A24A" />
        <circle cx="50" cy="22" r="1.5" fill="#FFFFFF" />
      </svg>

      {/* Wordmark and Tagline */}
      {showText && (
        <div className={`flex flex-col justify-center ${layout === 'vertical' ? 'mt-2 items-center' : 'ml-2.5 items-start'}`}>
          <span 
            className="font-serif text-[#6B1E2E] font-medium tracking-[0.22em] text-xl sm:text-2xl leading-none uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Aishka
          </span>
          {showTagline && (
            <span className="font-sans text-[#C8A24A] text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.35em] mt-1 leading-none">
              Fine Jewellery · 925 Silver
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
