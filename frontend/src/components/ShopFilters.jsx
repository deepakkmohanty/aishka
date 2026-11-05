import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const ShopFilters = ({ activeCategory, setActiveCategory, activeSort, setActiveSort }) => {
  const [categories, setCategories] = useState(['All Pieces']);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortOptions = ['Newest Arrivals', 'Price: High to Low', 'Price: Low to High'];

  const sortRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/categories');
        if (res.data && res.data.data) {
          const catNames = res.data.data.map(cat => cat.name);
          setCategories(['All Pieces', ...catNames]);
        }
      } catch (err) {
        console.error('Failed to fetch categories for filters', err);
        setCategories(['All Pieces', 'Rings', 'Earrings', 'Necklaces', 'Bracelets']);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-white px-6 md:px-12 lg:px-24 py-8 border-b border-[#E8C766]/30">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B1E2E] mr-3">Filter By:</span>
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative min-h-[44px] px-5 py-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2
                ${activeCategory === cat 
                  ? 'border border-[#6B1E2E] bg-[#6B1E2E]/5 text-[#6B1E2E] shadow-sm font-semibold' 
                  : 'border border-[#6B1E2E]/20 text-[#6B1E2E]/70 hover:border-[#6B1E2E]/50 hover:text-[#6B1E2E] bg-transparent'
                }`}
            >
              {/* Active Indicator Dot inside the pill */}
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 mr-2 ${activeCategory === cat ? 'bg-[#6B1E2E] scale-100' : 'bg-transparent scale-0 w-0 mr-0'}`}></span>
              {cat}
            </button>
          ))}
        </div>

        {/* Custom Styled Sort Dropdown */}
        <div className="relative flex items-center self-start lg:self-auto z-20" ref={sortRef}>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6B1E2E] mr-4">Sort:</span>
          
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center justify-between w-52 min-h-[44px] px-4 py-2.5 bg-transparent border border-[#6B1E2E]/40 text-[#6B1E2E] font-sans text-[10px] tracking-[0.2em] uppercase hover:border-[#6B1E2E] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2"
          >
            <span>{activeSort}</span>
            <svg className={`w-3 h-3 text-[#6B1E2E]/70 transform transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Absolute Dropdown Menu - No default browser styling */}
          {isSortOpen && (
            <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-[#6B1E2E]/20 shadow-xl py-2 z-50 rounded">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2
                    ${activeSort === option ? 'text-[#6B1E2E] bg-[#6B1E2E]/10 font-semibold' : 'text-[#6B1E2E]/70 hover:text-[#6B1E2E] hover:bg-[#6B1E2E]/5'}
                  `}
                >
                  <div className="flex items-center">
                    {/* Tiny active indicator for dropdown item */}
                    <span className={`w-1 h-1 rounded-full mr-2 transition-all duration-300 ${activeSort === option ? 'bg-[#6B1E2E] opacity-100' : 'bg-transparent opacity-0'}`}></span>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ShopFilters;
