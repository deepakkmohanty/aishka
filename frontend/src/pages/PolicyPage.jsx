import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bannerBgImg from '../assets/hero_slide_1.png';
import contentService from '../services/content.service';

const CLIP_PATH = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

const PolicyPage = ({ sectionKey, fallbackContent }) => {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await contentService.getSectionContent(sectionKey);
        if (res.data?.success && res.data?.data?.content && Object.keys(res.data.data.content).length > 0) {
          setContent(res.data.data.content);
        }
      } catch (err) {
        console.error(`Failed to fetch policy ${sectionKey}`, err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [sectionKey]);

  useEffect(() => {
    if (content?.title) {
      document.title = `${content.title} | Aishka`;
    }
    window.scrollTo(0, 0);
  }, [content]);

  // Smooth scroll to anchor
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Offset for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* ━━━ MAIN CONTAINER ━━━ */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-28 pb-16">
        
        {/* In-page Clean Header */}
        <div className="mb-10 pb-5 border-b border-[#C8A24A]/25">
          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E] block mb-2">
            ✦ Company Policies ✦
          </span>
          <h1
            className="font-serif text-[#6B1E2E] text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {content.title}
          </h1>
          <p className="font-sans text-xs text-[#6B1E2E]/60 tracking-widest font-light mt-2">
            Last Updated: {content.lastUpdated}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* ━━━ LEFT COLUMN: Sticky Table of Contents (300px) ━━━ */}
          <aside className="w-full lg:w-[260px] shrink-0 lg:sticky lg:top-28">
            <div className="bg-white p-6 border border-[#C8A24A]/20" style={{ clipPath: CLIP_PATH }}>
              <h3 className="font-serif text-[#6B1E2E] text-lg font-semibold tracking-wide border-b border-[#C8A24A]/25 pb-3 mb-4">
                On This Page
              </h3>
              <nav className="flex flex-col space-y-3">
                {content.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => handleScrollToSection(e, sec.id)}
                    className="font-sans text-xs text-[#6B1E2E]/70 hover:text-[#C8A24A] uppercase tracking-wider font-semibold transition-colors duration-250 py-0.5 text-left border-l-2 border-transparent hover:border-[#C8A24A] pl-3.5"
                  >
                    {sec.title.replace(/^\d+\.\s*/, '')} {/* Strip number prefix in menu for elegance */}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* ━━━ RIGHT COLUMN: Document Body (max-width 800px) ━━━ */}
          <article className="flex-1 max-w-[800px] bg-white p-8 md:p-12 shadow-md border border-[#C8A24A]/15" style={{ clipPath: CLIP_PATH }}>
            <div className="space-y-12">
              {content.sections.map((sec) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <h2 
                    className="font-serif text-[#6B1E2E] text-2xl md:text-3xl font-medium tracking-wide mb-5 border-b border-[#C8A24A]/10 pb-2"
                    style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
                  >
                    {sec.title}
                  </h2>
                  <div className="space-y-4">
                    {sec.content.map((paragraph, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="font-sans text-sm text-[#6B1E2E]/80 leading-relaxed font-light"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            
            {/* Disclaimer Footer */}
            <div className="mt-16 pt-8 border-t border-[#C8A24A]/20 text-center">
              <p className="font-sans text-[10px] text-[#6B1E2E]/50 tracking-wider uppercase">
                Aishka Atelier · Handcrafted Sterling Elegance
              </p>
            </div>
          </article>

        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
