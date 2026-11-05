import React from 'react';

const CraftsmanshipProcess = () => {
  const steps = [
    {
      num: '01',
      title: 'Sourcing the Rough',
      desc: 'Every natural emerald and ruby is hand-selected before cutting. We actively seek out stones with unique inclusions—the microscopic fingerprints of the earth—that guarantee their unheated, authentic origin.'
    },
    {
      num: '02',
      title: 'Drawing the Silver',
      desc: 'Pure 925 sterling silver is smelted in small batches and meticulously drawn through sequentially smaller gauges until it forms fine, hair-like wires: the foundational element of authentic Odia Tarakasi.'
    },
    {
      num: '03',
      title: 'The Master\'s Solder',
      desc: 'Master artisans painstakingly twist and solder the silver threads into intricate filigree cages. The gemstones are then pressure-set into the metal, honoring ancient techniques without the use of modern chemical glues.'
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 border-t-[0.5px] border-[#C8A24A]/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="block font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#C8A24A] mb-6">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl text-[#6B1E2E] font-serif tracking-wide">
            How It's <span className="italic text-[#C8A24A]">Made</span>
          </h2>
        </div>

        {/* 3-Column Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group flex flex-col items-center text-center">
              
              {/* Massive Serif Number as a background/typographic element */}
              <div className="text-8xl lg:text-[8rem] text-[#C8A24A] font-serif leading-none mb-4 opacity-20 group-hover:opacity-40 transition-opacity duration-700 select-none">
                {step.num}
              </div>

              {/* Step Details pulled up slightly to overlap the number */}
              <h3 className="text-2xl lg:text-3xl text-[#6B1E2E] font-serif tracking-wide mb-6 relative z-10 -mt-8 lg:-mt-12">
                {step.title}
              </h3>
              
              {/* Decorative expanding separator line */}
              <div className="w-8 h-[0.5px] bg-[#C8A24A] mb-8 group-hover:w-16 transition-all duration-700"></div>
              
              <p className="text-[#6B1E2E]/80 font-sans text-[14px] leading-[1.75] max-w-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CraftsmanshipProcess;
