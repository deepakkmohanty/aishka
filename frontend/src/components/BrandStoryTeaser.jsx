import React from 'react';
import { Link } from 'react-router-dom';
import craftsmanshipImg from '../assets/craftsmanship.png';

const BrandStoryTeaser = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ━━━ LEFT COLUMN: ASYMMETRIC IMAGE WITH FRAME ━━━ */}
          <div className="lg:col-span-5 relative w-full max-w-[480px] mx-auto lg:max-w-none">
            
            {/* Main Image Container */}
            <div 
              className="relative w-full aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] clip-gemstone overflow-hidden shadow-xl"
              style={{ background: '#6B1E2E' }}
            >
              <img
                src={craftsmanshipImg}
                alt="Aishka Craftsmanship"
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-105"
                loading="lazy"
              />

              {/* Inset Gold Border frame */}
              <div className="absolute inset-3 pointer-events-none z-10">
                <svg
                  className="w-full h-full stroke-[#C8A24A]/70 fill-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points="0,4 4,0 96,0 100,4 100,96 96,100 4,100 0,96"
                    vectorEffect="non-scaling-stroke"
                    style={{ strokeWidth: '1.5px' }}
                  />
                </svg>
              </div>

              {/* Top-Right Sparkle Star SVG */}
              <svg 
                className="w-5 h-5 text-[#C8A24A] absolute top-6 right-6 animate-pulse z-15"
                viewBox="0 0 24 24" 
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
              </svg>

              {/* Bottom-Left Sparkle Star SVG */}
              <svg 
                className="w-4 h-4 text-[#C8A24A] absolute bottom-8 left-8 animate-pulse z-15"
                viewBox="0 0 24 24" 
                fill="currentColor"
                style={{ animationDelay: '1s' }}
                aria-hidden="true"
              >
                <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
              </svg>
            </div>
            
          </div>

          {/* ━━━ RIGHT COLUMN: EDITORIAL CONTENT ━━━ */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Eyebrow */}
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A24A] block mb-3.5">
              ✦ OUR STORY ✦
            </span>

            {/* Heading */}
            <h2 
              className="font-serif text-[#6B1E2E] text-4xl md:text-5xl tracking-wide leading-tight mb-6 max-w-xl"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              Jewellery for Every Chapter of Life
            </h2>

            {/* Body copy (⚠️ FLAG: Placeholder content for client review) */}
            <p className="font-sans text-sm md:text-base text-[#6B1E2E]/80 leading-relaxed font-light max-w-xl mb-10">
              From a baby's first silver anklet to a grandfather's favourite ring, silver jewellery has always been part of every Indian family's story. Aishka was born to be that brand for your whole family — crafting 925 sterling silver pieces with authentic gemstones and timeless artistry.
            </p>

            {/* Highlight Stats Row */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#C8A24A]/25 w-full max-w-xl">
              
              <div className="flex flex-col">
                <span 
                  className="font-serif text-[#C8A24A] text-3xl md:text-4xl font-semibold tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                >
                  500+
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6B1E2E] mt-1.5">
                  Unique Designs
                </span>
              </div>

              <div className="flex flex-col">
                <span 
                  className="font-serif text-[#C8A24A] text-3xl md:text-4xl font-semibold tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                >
                  10K+
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6B1E2E] mt-1.5">
                  Happy Customers
                </span>
              </div>

              <div className="flex flex-col">
                <span 
                  className="font-serif text-[#C8A24A] text-3xl md:text-4xl font-semibold tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                >
                  100%
                </span>
                <span className="font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6B1E2E] mt-1.5">
                  Authentic Gemstones
                </span>
              </div>

            </div>

            {/* CTA Button */}
            <Link
              to="/about"
              className="inline-flex items-center justify-center mt-10 px-8 py-3.5 border border-[#C8A24A] text-[#6B1E2E] font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#C8A24A] hover:text-[#F5EDE2] hover:scale-[1.02] focus-visible:outline-none clip-gemstone"
            >
              READ OUR FULL STORY →
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandStoryTeaser;
