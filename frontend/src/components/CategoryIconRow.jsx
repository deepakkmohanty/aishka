import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoriesService from '../services/categories.service';

// Fallback images when DB image_url is null
const CATEGORY_FALLBACK = {
  rings: '/images/categories/rings.png',
  earrings: '/images/categories/earrings.png',
  necklace: '/src/assets/necklaces.png',
  chokers: '/src/assets/necklaces.png',
  bangles: '/src/assets/bracelets.png',
  pendants: '/src/assets/necklaces.png',
  lahari: '/src/assets/necklaces.png',
  sitahar: '/src/assets/necklaces.png',
  'tie-chains': '/src/assets/necklaces.png',
  mantasha: '/src/assets/bracelets.png',
};

// Fallback categories list when DB connection is down
const FALLBACK_CATEGORIES_LIST = [
  { id: 'fb-1', name: 'Necklace', slug: 'necklace' },
  { id: 'fb-2', name: 'Chokers', slug: 'chokers' },
  { id: 'fb-3', name: 'Bangles', slug: 'bangles' },
  { id: 'fb-4', name: 'Earrings', slug: 'earrings' },
  { id: 'fb-5', name: 'Pendants', slug: 'pendants' },
  { id: 'fb-6', name: 'Lahari', slug: 'lahari' },
  { id: 'fb-7', name: 'Sitahar', slug: 'sitahar' },
  { id: 'fb-8', name: 'Tie Chains', slug: 'tie-chains' },
  { id: 'fb-9', name: 'Mantasha', slug: 'mantasha' }
];

// SVG icons for categories without images
const CATEGORY_ICONS = {
  'necklaces-chains': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M20 8C20 8 12 16 12 28C12 40 20 48 32 52C44 48 52 40 52 28C52 16 44 8 44 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="32" cy="52" r="4" fill="currentColor"/>
      <path d="M28 52L32 58L36 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pendants: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M24 6C24 6 18 14 18 24C18 34 24 38 32 40C40 38 46 34 46 24C46 14 40 6 40 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 40V48" stroke="currentColor" strokeWidth="2"/>
      <path d="M26 48L32 56L38 48" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="32" cy="52" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="52" r="2" fill="currentColor"/>
    </svg>
  ),
  'kada-bracelets': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <ellipse cx="32" cy="32" rx="20" ry="12" stroke="currentColor" strokeWidth="2.5"/>
      <ellipse cx="32" cy="32" rx="16" ry="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2"/>
      <circle cx="32" cy="20" r="3" fill="currentColor"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="44" cy="28" r="2" fill="currentColor"/>
    </svg>
  ),
  'sets-combos': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <circle cx="32" cy="18" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="18" r="3" fill="currentColor"/>
      <rect x="20" y="34" width="24" height="20" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M28 38H36M28 42H36M28 46H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  chokers: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M8 28C8 28 16 20 32 20C48 20 56 28 56 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 32C10 32 18 24 32 24C46 24 54 32 54 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="32" cy="32" r="5" fill="currentColor"/>
      <path d="M27 32L32 38L37 32" stroke="#F5EDE2" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  bangles: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="32" cy="32" r="15" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="12" r="2.5" fill="currentColor"/>
      <circle cx="32" cy="52" r="2.5" fill="currentColor"/>
    </svg>
  ),
  anklets: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M8 32C14 26 22 24 32 24C42 24 50 26 56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="16" cy="30" r="2" fill="currentColor"/>
      <circle cx="24" cy="26" r="2.5" fill="currentColor"/>
      <circle cx="32" cy="24" r="3" fill="currentColor"/>
      <circle cx="40" cy="26" r="2.5" fill="currentColor"/>
      <circle cx="48" cy="30" r="2" fill="currentColor"/>
      <path d="M32 27V34" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="32" cy="36" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'nose-pins': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <circle cx="32" cy="26" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="26" r="4" fill="currentColor"/>
      <path d="M32 34C32 34 28 42 28 48C28 52 30 54 32 54C34 54 36 52 36 48C36 42 32 34 32 34Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'maang-tikka': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M16 12H48" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M32 12V24" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="30" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="30" r="3" fill="currentColor"/>
      <path d="M26 30L32 42L38 30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="32" cy="46" r="4" fill="currentColor"/>
    </svg>
  ),
  jhumkas: (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <circle cx="32" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M32 16V22" stroke="currentColor" strokeWidth="2"/>
      <path d="M22 22H42L38 42H26L22 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M26 28H38M27 34H37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="28" cy="46" r="2" fill="currentColor"/>
      <circle cx="32" cy="48" r="2" fill="currentColor"/>
      <circle cx="36" cy="46" r="2" fill="currentColor"/>
    </svg>
  ),
  'mens-chains': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M16 8L16 56" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      <path d="M16 16H28C30 16 32 18 32 20V24C32 26 30 28 28 28H16" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 28H32C34 28 36 30 36 32V36C36 38 34 40 32 40H16" stroke="currentColor" strokeWidth="2"/>
      <rect x="36" y="44" width="16" height="12" rx="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="44" cy="50" r="2" fill="currentColor"/>
    </svg>
  ),
  'mens-rings': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <ellipse cx="32" cy="32" rx="18" ry="20" stroke="currentColor" strokeWidth="3"/>
      <rect x="14" y="26" width="36" height="12" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>
  ),
  'kids-jewellery': (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 md:w-10 md:h-10">
      <path d="M32 8L36 16H28L32 8Z" fill="currentColor"/>
      <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 28L28 32L24 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M40 28L36 32L40 36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="32" r="4" fill="currentColor"/>
      <path d="M32 46V54" stroke="currentColor" strokeWidth="2"/>
      <circle cx="32" cy="56" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
};

const CategoryIconRow = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      
      if (scrollWidth <= clientWidth) {
        setShowArrows(false);
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories({ type: 'jewellery_type' });
        if (response.success && response.data?.categories && response.data.categories.length > 0) {
          setCategories(response.data.categories);
        } else {
          setCategories(FALLBACK_CATEGORIES_LIST);
        }
      } catch (err) {
        console.error('Failed to load categories:', err.message);
        setCategories(FALLBACK_CATEGORIES_LIST);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories, isLoading]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const displayedCategories = categories.length > 0 ? categories : FALLBACK_CATEGORIES_LIST;

  return (
    <section className="bg-white pt-4 pb-8 px-0 md:px-8 lg:px-16 overflow-hidden">
      {/* ━━━ SECTION HEADER ━━━ */}
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 mb-8">
        <div className="flex-grow text-center pl-10 md:pl-12">
          <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#111827] mb-1">
            OUR COLLECTION
          </h2>
          <p className="font-serif text-gray-500 text-xs sm:text-sm italic">
            Where Every Piece Tells a Story
          </p>
        </div>
        
        {/* Right Arrow Button */}
        <Link
          to="/collections"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#8C5E28] hover:bg-[#7A1213] transition-all duration-300 flex items-center justify-center text-white shadow-md hover:scale-105"
          aria-label="View all collections"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform rotate-[45deg]">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </Link>
      </div>

      {/* ━━━ CATEGORY ICONS ROW ━━━ */}
      <div 
        className="max-w-[1400px] mx-auto relative group"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          className={`hidden md:flex absolute left-3 md:left-0 top-[56px] sm:top-[64px] -translate-y-1/2 md:-translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-800 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } hover:bg-[#7A1213] hover:text-white`}
          aria-label="Scroll left"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-6 md:gap-8 pb-8 px-6 md:px-4 snap-x scrollbar-hide"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {isLoading ? (
            // Skeleton Loader cards
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div 
                key={i} 
                className="flex flex-col items-center flex-shrink-0 snap-start w-28 sm:w-32 h-28 sm:h-32 animate-pulse rounded-2xl bg-gray-100"
              />
            ))
          ) : (
            displayedCategories.map((cat) => (
              <Link 
                to={`/collections?type=${cat.slug}`} 
                key={cat.id} 
                className="flex flex-col items-center group/card flex-shrink-0 snap-start w-28 sm:w-32"
              >
                {/* Image Container */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-3 relative overflow-hidden rounded-2xl border border-gray-150 transition-all duration-300 group-hover/card:shadow-md group-hover/card:border-[#C8A24A]/40 bg-gray-50">
                  {(cat.image_url || CATEGORY_FALLBACK[cat.slug]) ? (
                    <img 
                      src={cat.image_url || CATEGORY_FALLBACK[cat.slug]} 
                      alt={cat.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {CATEGORY_ICONS[cat.slug] || (
                        <span className="font-serif text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {cat.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Category Name below the card */}
                <span className="font-sans text-[11px] sm:text-xs font-semibold text-gray-800 text-center tracking-wide mt-1 transition-colors duration-300 group-hover/card:text-[#7A1213]">
                  {cat.name}
                </span>
              </Link>
            ))
          )}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          className={`hidden md:flex absolute right-3 md:right-0 top-[56px] sm:top-[64px] -translate-y-1/2 md:translate-x-4 z-10 w-8 h-8 md:w-10 md:h-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-gray-800 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100 ${
            canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } hover:bg-[#7A1213] hover:text-white`}
          aria-label="Scroll right"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default CategoryIconRow;
