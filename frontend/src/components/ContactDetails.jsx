import React from 'react';

const ContactDetails = () => {
  return (
    <section className="w-full bg-white border-b-[0.5px] border-[#C8A24A]/30 py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 text-center">
          
          {/* Atelier & Boutique */}
          <div className="flex flex-col items-center group">
            {/* Circle Icon Wrapper */}
            <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A] flex items-center justify-center mb-8 text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-[#F5EDE2] transition-all duration-700 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E] mb-4">Atelier & Boutique</span>
            <p className="text-[#6B1E2E]/80 font-serif text-lg tracking-wide leading-relaxed">
              Janpath Road, Unit 3<br/>
              Bhubaneswar, Odisha 751001
            </p>
          </div>

          {/* Telephone */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A] flex items-center justify-center mb-8 text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-[#F5EDE2] transition-all duration-700 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92v3z"></path>
              </svg>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E] mb-4">Telephone</span>
            <a 
              href="tel:+919876543210" 
              className="text-[#6B1E2E]/80 font-serif text-lg tracking-wide hover:text-[#C8A24A] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded p-1"
            >
              +91 98765 43210
            </a>
            <span className="text-[#6B1E2E]/80 font-sans text-[10px] uppercase tracking-[0.1em] mt-2 italic font-medium">Mon-Sat, 10am - 7pm IST</span>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A] flex items-center justify-center mb-8 text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-[#F5EDE2] transition-all duration-700 shadow-sm">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E] mb-4">Direct Email</span>
            <a 
              href="mailto:concierge@aishka.com" 
              className="text-[#6B1E2E]/80 font-serif text-lg tracking-wide hover:text-[#C8A24A] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:outline-none rounded p-1"
            >
              concierge@aishka.com
            </a>
            <span className="text-[#6B1E2E]/80 font-sans text-[10px] uppercase tracking-[0.1em] mt-2 italic font-medium">Replies within 24 hours</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactDetails;
