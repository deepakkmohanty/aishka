import React from 'react';

const MapSection = () => {
  return (
    <section className="w-full bg-white py-24 md:py-32 border-t-[0.5px] border-[#C8A24A]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="block font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E] mb-4">
            Visit Us
          </span>
          <h2 className="text-3xl md:text-4xl text-[#6B1E2E] font-serif tracking-wide">
            The <span className="italic text-[#C8A24A] font-light">Atelier</span>
          </h2>
        </div>

        {/* Map Container - Wrapped and Styled */}
        <div className="relative w-full h-[400px] md:h-[500px] group bg-white p-2 md:p-3 border-[0.5px] border-[#C8A24A]/40 shadow-sm">
          
          {/* Signature Gold Corner Brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:w-12 group-hover:h-12 group-hover:-top-2 group-hover:-left-2"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:w-12 group-hover:h-12 group-hover:-top-2 group-hover:-right-2"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:w-12 group-hover:h-12 group-hover:-bottom-2 group-hover:-left-2"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A] transition-all duration-[1500ms] group-hover:w-12 group-hover:h-12 group-hover:-bottom-2 group-hover:-right-2"></div>

          {/* Iframe Wrapper */}
          <div className="relative w-full h-full overflow-hidden border-[0.5px] border-[#C8A24A]/20">
            {/* 
              CSS filters applied directly to the iframe to match brand aesthetics.
              We use grayscale and sepia to make the map look warm/golden by default, 
              and smoothly reveal the full native color on hover!
            */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119743.53374945415!2d85.744111!3d20.296058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1909d2d5170aa5%3A0xfc580e2b68b33c8b!2sBhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full filter grayscale-[60%] sepia-[40%] contrast-[95%] opacity-80 group-hover:grayscale-0 group-hover:sepia-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-1000 ease-out pointer-events-auto"
              title="Aishka Atelier Location"
            ></iframe>
            
            {/* An invisible shield that prevents scroll-trapping when the user is trying to scroll past the map, 
                but disappears on hover so they can interact with the map if they want. */}
            <div className="absolute inset-0 w-full h-full z-10 group-hover:hidden"></div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default MapSection;
