import React from 'react';
import craftsmanshipImg from '../assets/craftsmanship.png';

const BrandStory = () => {
  return (
    <section className="relative w-full bg-[#6B1E2E] py-24 md:py-32 overflow-hidden border-t border-[#E8C766]/30">
      
      {/* Background abstract element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8C766]/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* Left Side: Asymmetrical Image Container */}
        <div className="w-full lg:w-[50%] relative mb-16 lg:mb-0 lg:pr-12 xl:pr-20">
          <div className="relative aspect-[3/4] w-full max-w-[450px] mx-auto lg:ml-0 overflow-hidden lg:rounded-tr-[120px] border-r-[0.5px] border-t-[0.5px] border-[#C8A24A]/40 shadow-xl bg-gradient-to-br from-[#1A070B] to-[#6B1E2E]">
            <img 
              src={craftsmanshipImg} 
              alt="Aishka Artisans" 
              loading="lazy"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            {/* Fine gold interior frame */}
            <div className="absolute top-4 bottom-4 left-4 right-4 border-[0.5px] border-[#F5EDE2]/40 lg:rounded-tr-[104px] pointer-events-none"></div>
          </div>
          
          {/* Floating decorative element overlapping the image */}
          <div className="absolute -bottom-8 right-8 lg:right-16 bg-[#1A070B]/90 backdrop-blur-md p-6 border border-[#C8A24A]/30 shadow-lg hidden md:block group z-20">
            <svg className="w-12 h-12 text-[#C8A24A] animate-[pulse_4s_ease-in-out_infinite] motion-reduce:animate-none" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"></path>
            </svg>
          </div>
        </div>

        {/* Right Side: Text Block */}
        <div className="w-full lg:w-[50%] flex flex-col items-start text-left">
          
          {/* Visual consistent header ornament */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-8 h-[1px] bg-[#C8A24A]"></div>
            <span className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-[#C8A24A]">
              Our Heritage
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] text-[#F5EDE2] font-serif tracking-tight leading-[1.15] mb-8">
            Rooted in <br className="hidden lg:block"/>
            <span className="italic text-[#C8A24A] font-light">Bhubaneswar.</span>
          </h2>
          
          <div className="border-l-[1.5px] border-[#C8A24A]/50 pl-6 ml-2 lg:ml-0">
            <p className="text-[#F5EDE2]/90 font-sans text-sm md:text-[15px] font-medium leading-[1.8] mb-6 max-w-md">
              Born from the timeless artistry of fine silver craftsmanship, Aishka is not just jewelry—it is elegance worn on the skin. 
            </p>
            <p className="text-[#F5EDE2]/80 font-sans text-sm md:text-[15px] font-medium leading-[1.8] mb-10 max-w-md">
              Every ring, earring, and choker is meticulously shaped by third-generation master silversmiths. We source our raw rubies and emeralds directly from trusted lapidaries, ensuring each gemstone honors the legacy of traditional Indian craftsmanship while remaining effortlessly accessible to the modern woman.
            </p>
          </div>

          <a 
            href="/about" 
            className="group relative inline-flex items-center px-2 py-2 text-[#F5EDE2] font-sans text-[11px] uppercase tracking-[0.25em] font-semibold hover:text-[#C8A24A] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded"
          >
            <span className="mr-4">Read Our Story</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-3 transition-transform duration-500 ease-out">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <polyline points="14 6 20 12 14 18"></polyline>
            </svg>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#C8A24A] scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100 group-hover:origin-left"></span>
          </a>
          
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
