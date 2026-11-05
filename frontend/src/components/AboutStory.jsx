import React from 'react';
import craftsmanship from '../assets/craftsmanship.png';
import rings from '../assets/rings.png'; 

const AboutStory = () => {
  return (
    <section className="w-full bg-white pt-32 pb-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Hero Title */}
        <div className="max-w-4xl mb-24 md:mb-40">
          <span className="block font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C8A24A] mb-6">
            Our Heritage
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] text-[#6B1E2E] font-serif tracking-tight leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Born in the temple city. <br className="hidden md:block"/>
            Forged in <span className="italic text-[#C8A24A]">silver.</span>
          </h1>
        </div>

        {/* Story Layout - Section 1: Craftsmanship */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32 md:mb-48">
          <div className="w-full lg:w-1/2 relative group">
            {/* Signature gold corner brackets */}
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:-top-8 group-hover:-left-8"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:-bottom-8 group-hover:-right-8"></div>
            
            <img src={craftsmanship} alt="Artisan working on silver filigree" className="w-full aspect-[4/5] object-cover filter grayscale-[15%] sepia-[15%] border-[0.5px] border-[#E8C766]/30 shadow-2xl shadow-[#C8A24A]/5" />
          </div>
          
          <div className="w-full lg:w-1/2 lg:pl-16">
            <div className="text-[#C8A24A] text-4xl font-serif leading-none mb-8 opacity-60">✦</div>
            <h2 className="text-4xl md:text-5xl text-[#6B1E2E] font-serif mb-10" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              The Art of <span className="italic">Tarakasi</span>
            </h2>
            <p className="text-[#6B1E2E]/80 font-sans text-[15px] md:text-[16px] leading-[2.2] mb-8">
              In the narrow, sun-drenched lanes of Odisha, the intricate art of Tarakasi—silver filigree—has been fiercely protected and practiced for over five centuries. Aishka was born not in a corporate boardroom, but amidst the rhythmic tapping of artisan hammers in Bhubaneswar.
            </p>
            <p className="text-[#6B1E2E]/80 font-sans text-[15px] md:text-[16px] leading-[2.2]">
              Every piece we create is a continuation of this legacy. We refuse to cast our jewelry in mass-production molds. Instead, pure silver is drawn into threads as fine as spider silk, then meticulously twisted and soldered by master craftsmen whose families have held these secrets for generations.
            </p>
          </div>
        </div>

        {/* Story Layout - Section 2: Materials */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 lg:pr-16">
            <div className="text-[#C8A24A] text-4xl font-serif leading-none mb-8 opacity-60">✦</div>
            <h2 className="text-4xl md:text-5xl text-[#6B1E2E] font-serif mb-10" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Uncompromising <span className="italic">Sourcing</span>
            </h2>
            <p className="text-[#6B1E2E]/80 font-sans text-[15px] md:text-[16px] leading-[2.2] mb-8">
              We reject the industry standard of synthetic stones and colored glass. Authenticity is the absolute cornerstone of our brand. When you see a crimson flash or a deep green hue in our collections, you are looking at natural, earth-mined rubies and emeralds.
            </p>
            <p className="text-[#6B1E2E]/80 font-sans text-[15px] md:text-[16px] leading-[2.2]">
              We personally source our gemstones, celebrating their natural inclusions—the tiny, beautiful "flaws" that prove their authenticity. Paired with our hallmarked 925 sterling silver, these stones are set using ancient techniques, ensuring they endure as heirloom pieces rather than fleeting trends.
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 relative lg:mt-32 group">
             {/* Signature gold corner brackets */}
             <div className="absolute -top-6 -right-6 w-16 h-16 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:-top-8 group-hover:-right-8"></div>
             <div className="absolute -bottom-6 -left-6 w-16 h-16 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:-bottom-8 group-hover:-left-8"></div>
             
            <img src={rings} alt="Natural gemstones set in silver" className="w-full aspect-square lg:aspect-[3/4] object-cover filter grayscale-[10%] sepia-[15%] border-[0.5px] border-[#E8C766]/30 shadow-2xl shadow-[#C8A24A]/5" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutStory;
