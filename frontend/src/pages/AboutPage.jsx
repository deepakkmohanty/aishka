import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroSlide1Img from '../assets/hero_slide_1.png';
import necklacesImg from '../assets/necklaces.png';
import contentService from '../services/content.service';

const AboutPage = () => {
  const [content, setContent] = useState({
    header_title: 'ABOUT US',
    header_paragraph_1: 'Welcome to AISHKA, a premium jewellery brand built on a simple promise: beautiful jewellery that fits real, everyday life.',
    header_paragraph_2: 'We specialize in 925 Sterling Silver jewellery as well as imitation and fashion jewellery, giving you the choice between fine silver pieces you can wear for years and trend-led fashion pieces that let you experiment without a heavy price tag. Every AISHKA piece is checked for finish, polish, and stone-setting quality before it reaches you. Whether you\'re shopping for daily-wear studs, a statement neckpiece for a wedding, or an affordable fashion set to match an outfit, our collections are designed to give you more style for your money.',
    what_we_offer: [
      '925 Hallmark-quality Sterling Silver jewellery: rings, earrings, pendants, chains, bracelets and more',
      'Imitation & fashion jewellery: trend-forward pieces in gold-tone, oxidized, and antique finishes',
      'Every day-wear and occasion-wear collections for women and men',
      'New designs added regularly'
    ],
    our_promise: [
      'Quality-checked pieces before dispatch',
      'Genuine 925 silver purity on all sterling silver products',
      'Secure packaging for safe delivery',
      'Friendly, responsive customer support'
    ],
    contact_text: 'Have a question before you shop? Reach us any time at jewelsamrat@outlook.com or +91 9106702473.'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us | Aishka';

    const fetchContent = async () => {
      try {
        const res = await contentService.getSectionContent('about_page');
        if (res.data?.success && res.data?.data?.content) {
          const c = res.data.data.content;
          setContent(prev => ({
            ...prev,
            header_title: c.header_title || prev.header_title,
            header_paragraph_1: c.header_paragraph_1 || prev.header_paragraph_1,
            header_paragraph_2: c.header_paragraph_2 || prev.header_paragraph_2,
            what_we_offer: c.what_we_offer || prev.what_we_offer,
            our_promise: c.our_promise || prev.our_promise,
            contact_text: c.contact_text || prev.contact_text
          }));
        }
      } catch (err) {
        console.error('Failed to load about page content:', err);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="w-full bg-white pb-16 md:pb-24">
      {/* ━━━ SECTION 1: ABOUT US HEADER ━━━ */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16 bg-[#FAF9F6]">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A1213] block mb-3">
            ✦ OUR STORY ✦
          </span>
          <h1 className="font-serif text-3xl md:text-5xl tracking-wide uppercase text-gray-900 mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            {content.header_title}
          </h1>
          <div className="w-16 h-[2px] bg-[#C8A24A] mx-auto mb-10" />

          <p className="font-sans text-base md:text-lg text-gray-800 leading-[1.8] mb-6 font-medium">
            {content.header_paragraph_1}
          </p>

          <p className="font-sans text-sm md:text-[15px] text-gray-600 leading-[1.9] font-light">
            {content.header_paragraph_2}
          </p>
        </div>
      </section>

      {/* ━━━ SECTION 2: WHAT WE OFFER & PROMISE ━━━ */}
      <section className="py-16 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* What We Offer */}
          <div className="bg-white p-8 border border-[#C8A24A]/20 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#7A1213] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              What We Offer
            </h2>
            <ul className="space-y-4">
              {content.what_we_offer.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-[#C8A24A] text-lg mt-0.5">✦</span>
                  <span className="font-sans text-sm text-gray-700 leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Promise */}
          <div className="bg-white p-8 border border-[#C8A24A]/20 shadow-sm rounded-sm">
            <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#7A1213] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Our Promise
            </h2>
            <ul className="space-y-4">
              {content.our_promise.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <span className="text-[#C8A24A] text-lg mt-0.5">✓</span>
                  <span className="font-sans text-sm text-gray-700 leading-relaxed font-light">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ━━━ SECTION 3: CONTACT HIGHLIGHT ━━━ */}
      <section className="py-12 px-6 bg-[#7A1213] text-white text-center">
        <div className="max-w-[800px] mx-auto space-y-4">
          <p className="font-serif text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {content.contact_text}
          </p>
          <div className="pt-2 flex justify-center space-x-4">
            <Link
              to="/contact"
              className="px-6 py-2.5 bg-white text-[#7A1213] font-sans text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
