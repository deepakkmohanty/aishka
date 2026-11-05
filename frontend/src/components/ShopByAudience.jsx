import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoriesService from '../services/categories.service';

// Fallback images when DB image_url is null
const AUDIENCE_FALLBACK = {
  women: '/images/categories/women.png',
  men: '/images/categories/men.png',
  kids: '/images/categories/kids.png',
  gifts: '/images/categories/gifts.png',
};
const AudienceTile = ({ aud }) => {
  return (
    <Link
      to={aud.link}
      className="relative w-full h-full block overflow-hidden group cursor-pointer focus-visible:outline-none"
      style={{
        clipPath: 'polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)'
      }}
      aria-label={`Shop for ${aud.label}`}
    >
      {/* Placeholder bg colour shown while image loads */}
      <div className="absolute inset-0 bg-white" />

      {/* Full-bleed image */}
      {aud.image && (
        <img
          src={aud.image}
          alt={`${aud.label} Jewellery`}
          className="absolute inset-0 w-full h-full object-cover object-top md:object-[center_15%] transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
      )}

      {/* Gradient overlay — transparent → deep wine at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#6B1E2E]/90 via-[#6B1E2E]/20 to-transparent group-hover:from-[#6B1E2E]/95 transition-all duration-500 pointer-events-none" />

      {/* Content pinned to bottom-left */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10 flex flex-col items-start">

        {/* Gold hairline — expands on hover */}
        <div className="h-px bg-[#C8A24A]/70 mb-3 origin-left transition-all duration-500 group-hover:bg-[#C8A24A]" style={{ width: '3rem' }} />

        {/* Audience label */}
        <h3
          className="font-serif italic text-[#F5EDE2] text-4xl md:text-5xl tracking-wide leading-none mb-2"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          {aud.label}
        </h3>

        {/* Subtitle */}
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#F5EDE2]/75">
          {aud.subtitle}
        </p>

        {/* Explore → fades in on hover */}
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#C8A24A] mt-4 flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Explore <span>→</span>
        </span>
      </div>
    </Link>
  );
};

const ShopByAudience = () => {
  const [audiences, setAudiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        const response = await categoriesService.getCategories({ type: 'audience' });
        if (response.success && response.data?.categories) {
          // Map category model to local UI model
          const mapped = response.data.categories.map(cat => ({
            id: cat.id,
            label: cat.name,
            subtitle: cat.description || `Delightful silver collections for ${cat.name}`,
            image: cat.image_url || AUDIENCE_FALLBACK[cat.slug] || null,
            link: `/collections?for=${cat.slug}`
          }));
          setAudiences(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch audience categories:', err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAudiences();
  }, []);

  return (
    <section className="bg-white py-16 md:py-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-[1400px] mx-auto">

        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A24A] block mb-4">
            ✦ SHOP FOR ✦
          </span>
          <h2
            className="font-serif text-[#6B1E2E] text-4xl md:text-5xl tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Find the Perfect Piece
          </h2>
        </div>

        {/* ━━━ 2×2 TILE GRID ━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {isLoading ? (
            // Skeleton tiles
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full animate-pulse bg-white"
                style={{
                  height: 'clamp(280px, 38vh, 460px)',
                  clipPath: 'polygon(0 3%, 3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%)'
                }}
              />
            ))
          ) : (
            audiences.map((aud) => (
              <div
                key={aud.id}
                className="w-full"
                style={{ height: 'clamp(280px, 38vh, 460px)' }}
              >
                <AudienceTile aud={aud} />
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default ShopByAudience;
