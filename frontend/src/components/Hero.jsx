import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero_realistic_model.png';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden">
      
      {/* Full-Screen Background Image & Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Indian woman wearing Aishka High Jewelry" 
          fetchPriority="high"
          width="1920"
          height="1080"
          className="w-full h-full object-cover object-[center_35%] animate-kenburns motion-reduce:animate-none"
        />
        {/* Deep, immersive overlay to make the white text pop on the left, fading to transparent on the right to reveal the model */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A070B]/95 via-[#1A070B]/60 to-transparent"></div>
        {/* Subtle vignette on edges */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>

      {/* Content Container - Standardized to max-w-[1400px] */}
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 relative z-10 flex flex-col justify-center h-full pt-16 pb-32 md:pb-16">
        
        {/* Text Block - Refined, Smaller Left Aligned Layout */}
        <div className="max-w-2xl flex flex-col items-start text-left mt-8 md:mt-0">
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-8 h-[1px] bg-[#C8A24A]"></div>
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] drop-shadow-md">
              Heritage Redefined
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-[#F5EDE2] font-serif tracking-tight mb-6 drop-shadow-xl">
            Sparkle <span className="italic text-[#C8A24A] font-light">in the</span> <br />
            Details.
          </h1>

          <p className="text-[#F5EDE2]/90 font-sans text-sm md:text-[15px] font-medium leading-[1.8] max-w-md mb-10 drop-shadow-lg">
            Discover heirloom-quality silver designed for the modern woman.
            Every piece marries traditional Indian opulence with feminine elegance.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <Link 
              to="/collections" 
              className="inline-flex items-center justify-center min-h-[48px] px-10 py-3.5 border border-[#C8A24A] text-[#1A070B] font-sans text-[11px] uppercase tracking-[0.25em] bg-[#C8A24A] hover:bg-transparent hover:text-[#C8A24A] transition-all duration-500 font-bold shadow-[0_0_20px_rgba(200,162,74,0.3)] focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Explore Collection
            </Link>
            <Link 
              to="/about" 
              className="text-[#F5EDE2] font-sans text-[11px] uppercase tracking-[0.2em] hover:text-[#C8A24A] transition-all duration-300 border-b border-transparent hover:border-[#C8A24A] pb-1 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded"
            >
              Read Our Story
            </Link>
          </div>

        </div>

      </div>
      
      {/* Removed generic horizontal trust banner to maintain pure editorial luxury aesthetic */}

    </section>
  );
};

export default Hero;
