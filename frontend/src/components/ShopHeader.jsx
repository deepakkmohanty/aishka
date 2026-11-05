import React from 'react';

const ShopHeader = () => {
  return (
    <header className="w-full bg-white pt-24 pb-28 px-6 md:px-12 lg:px-24 border-b border-[#E8C766]/30 relative overflow-hidden">
      
      {/* Subtle Background Accent - Geometric ring/target motif */}
      <svg className="absolute top-0 right-0 w-[600px] h-[600px] text-[#C8A24A] opacity-[0.04] pointer-events-none transform translate-x-1/4 -translate-y-1/4 rotate-12" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2"/>
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.2"/>
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="0.2"/>
      </svg>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-start">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-[#6B1E2E]/60 mb-12">
          <a href="/" className="hover:text-[#6B1E2E] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded">Home</a>
          <span className="text-[#6B1E2E]/30">/</span>
          <a href="/collections" className="hover:text-[#6B1E2E] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded">Collections</a>
          <span className="text-[#6B1E2E]/30">/</span>
          <span className="text-[#6B1E2E]">Bridal Silver</span>
        </nav>

        {/* Title and Description Split - Pure Typographic Editorial Layout */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full">
          
          {/* Main Title */}
          <div className="lg:w-2/3">
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.1] text-[#6B1E2E] font-serif tracking-tight lg:mb-2">
              Bridal Silver <br />
              <span className="italic text-[#C8A24A] pr-4 font-light">Heritage.</span>
            </h1>
          </div>

          {/* Vertical Separator & Description */}
          <div className="lg:w-1/3 flex flex-col relative pl-6 lg:pl-10 mt-10 lg:mt-0">
            {/* Fine gold border separator */}
            <div className="absolute top-2 bottom-0 left-0 w-[1.5px] bg-[#C8A24A]"></div>
            
            <p className="text-[#6B1E2E] font-sans text-sm md:text-[15px] leading-[1.8] font-medium max-w-sm">
              Discover heavy-gauge 925 sterling silver crafted for life’s most significant moments. From ornate chokers to delicate jhumkas, each piece features hand-selected gemstones set by traditional Indian artisans.
            </p>

            {/* Subtle metric/tag details below paragraph */}
            <div className="flex items-center space-x-6 mt-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6B1E2E]">12 Pieces</span>
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6B1E2E]">Handcrafted</span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

export default ShopHeader;
