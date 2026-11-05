import React from 'react';

const BrandValues = () => {
  const values = [
    {
      title: '100% Earth-Mined Gemstones',
      desc: 'We guarantee that every ruby, emerald, and sapphire set into our pieces is completely natural and unheated. We celebrate the unique inclusions that distinguish real earth-mined stones from synthetic glass.',
      color: 'bg-[#00594C]', // Emerald Green
      shadow: 'shadow-[#00594C]/40'
    },
    {
      title: 'Zero-Nickel 925 Silver',
      desc: 'Every gram of silver used in our workshops is certified 925 sterling and completely free of nickel and lead, ensuring that your heirloom pieces are hypoallergenic and safe for sensitive skin.',
      color: 'bg-[#9B111E]', // Ruby Red
      shadow: 'shadow-[#9B111E]/40'
    },
    {
      title: 'Lifetime Authenticity Guarantee',
      desc: 'Each order arrives with a formal Certificate of Authenticity. We stand behind the purity of our silver and the natural origin of our gemstones for the entire lifetime of the piece.',
      color: 'bg-[#C8A24A]', // Brand Gold / Topaz
      shadow: 'shadow-[#C8A24A]/40'
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden border-t-[0.5px] border-[#C8A24A]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-20 lg:gap-32">
        
        {/* Left Intro Panel */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center relative">
          {/* Subtle architectural bracket */}
          <div className="absolute -left-6 top-0 w-16 h-16 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A] opacity-50"></div>
          
          <span className="block font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C8A24A] mb-6">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#6B1E2E] font-serif tracking-tight leading-[1.1] mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Unwavering <br className="hidden lg:block"/>
            <span className="italic text-[#C8A24A]">Standards.</span>
          </h2>
          <p className="text-[#6B1E2E]/80 font-sans text-[15px] leading-[2.2]">
            Trust in fine jewelry is not freely given; it is earned through absolute transparency. From the purity of our silver to the authenticity of our stones, we refuse to compromise on the materials that will become your family heirlooms.
          </p>
        </div>

        {/* Right List Panel - Avoiding the repetitive 3-column icon grid */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center space-y-14">
          {values.map((value, index) => (
            <div key={index} className="relative pl-12 group cursor-default">
              
              {/* Gemstone Dot Accent - Custom treatment instead of generic icons */}
              <div className="absolute left-0 top-2 flex items-center justify-center">
                {/* Outer Glow (expands on hover) */}
                <div className={`absolute w-5 h-5 rounded-full ${value.color} opacity-15 blur-[2px] transition-all duration-[800ms] group-hover:scale-150 group-hover:opacity-30`}></div>
                {/* Inner Solid Gem */}
                <div className={`relative w-2 h-2 rounded-full ${value.color} ${value.shadow} shadow-sm border border-[#F5EDE2]`}></div>
              </div>

              <h3 className="text-xl md:text-2xl text-[#6B1E2E] font-serif tracking-wide mb-4 transition-colors duration-500" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                {value.title}
              </h3>
              
              <p className="text-[#6B1E2E]/70 font-sans text-[14px] leading-[2.1] max-w-xl transition-colors duration-500 group-hover:text-[#6B1E2E]">
                {value.desc}
              </p>
              
              {/* Subtle underline separator for all but the last item */}
              {index !== values.length - 1 && (
                <div className="mt-14 w-full max-w-xl h-[0.5px] bg-gradient-to-r from-[#E8C766]/40 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrandValues;
