import React, { useRef, useState, useEffect } from 'react';
import categoriesService from '../services/categories.service';

const ShopCategoryRow = ({ activeType, onSelectType }) => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch jewellery_type categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesService.getCategories({ type: 'jewellery_type' });
        if (response.success && response.data?.categories) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error('ShopCategoryRow: Failed to fetch categories', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Don't render anything while loading or if no categories
  if (isLoading) {
    return (
      <div className="w-full bg-white border-b border-gray-100 py-6 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto flex gap-4 md:gap-6 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-shrink-0 animate-pulse">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gray-100" />
              <div className="mt-3 w-16 h-3 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (categories.length === 0) return null;

  return (
    <div className="w-full bg-white border-b border-gray-100 py-6 px-4 md:px-8 relative group">
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Left Arrow */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center text-gray-600 hover:text-[#6B1E2E] hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Categories List */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-none scroll-smooth px-1"
        >
          {categories.map((cat) => {
            const isActive = activeType === cat.slug;
            return (
              <button
                key={cat.id || cat.slug}
                onClick={() => onSelectType(cat.slug)}
                className="flex flex-col items-center flex-shrink-0 focus:outline-none cursor-pointer group/item"
              >
                {/* Rounded Square Image Container */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                    isActive 
                      ? 'border-[#6B1E2E] shadow-md scale-105' 
                      : 'border-transparent hover:border-gray-200 hover:scale-[1.03]'
                  }`}
                >
                  {cat.image_url ? (
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* Fallback placeholder with initial */
                    <div className="w-full h-full bg-gradient-to-br from-[#F5EDE2] to-[#E8D5C0] flex items-center justify-center">
                      <span className="font-serif text-2xl text-[#6B1E2E]/40">
                        {cat.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <span
                  className={`mt-3 font-sans text-xs md:text-sm font-semibold transition-colors text-center max-w-[90px] md:max-w-[110px] break-words ${
                    isActive 
                      ? 'text-[#6B1E2E]' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-150 flex items-center justify-center text-gray-600 hover:text-[#6B1E2E] hover:scale-105 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div>
    </div>
  );
};

export default ShopCategoryRow;
