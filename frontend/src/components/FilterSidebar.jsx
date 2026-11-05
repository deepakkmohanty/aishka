import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const audiences = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'kids', label: 'Kids' },
  { id: 'gifts', label: 'Gifts' }
];

const types = [
  { id: 'all', label: 'All Types' },
  { id: 'rings', label: 'Rings' },
  { id: 'necklaces-chains', label: 'Necklaces & Chains' },
  { id: 'earrings', label: 'Earrings' },
  { id: 'kada-bracelets', label: 'Kada & Bracelets' },
  { id: 'pendants', label: 'Pendants' },
  { id: 'sets-combos', label: 'Sets & Combos' },
  { id: 'chokers', label: 'Chokers' },
  { id: 'bangles', label: 'Bangles' },
  { id: 'anklets', label: 'Anklets' }
];

const gemstones = [
  { id: 'ruby', label: 'Ruby', color: '#9B1C31' },
  { id: 'emerald', label: 'Emerald', color: '#004B23' },
  { id: 'sapphire', label: 'Sapphire', color: '#0F52BA' },
  { id: 'amethyst', label: 'Amethyst', color: '#86608E' },
  { id: 'citrine', label: 'Citrine', color: '#E4A010' },
  { id: 'pink-tourmaline', label: 'Pink Tourmaline', color: '#FF92A5' },
  { id: 'pearl', label: 'Pearl', color: '#F0EAD6' },
  { id: 'diamond', label: 'Diamond', color: '#E9F6FC' }
];

const FilterSidebar = ({ totalProductsCount, onApplyMobileFilters }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Accordion open/close states (open by default)
  const [sectionsOpen, setSectionsOpen] = useState({
    shopFor: true,
    type: true,
    price: true,
    gemstone: true,
    availability: true
  });

  // Get active filters from URL search params
  const activeAudience = searchParams.get('for') || 'all';
  const activeType = searchParams.get('type') || 'all';
  const activeGemstone = searchParams.get('gemstone') || '';
  const minPrice = parseInt(searchParams.get('minPrice')) || 0;
  const maxPrice = parseInt(searchParams.get('maxPrice')) || 15000;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const onSale = searchParams.get('onSale') === 'true';

  // Toggle Accordion section
  const toggleSection = (section) => {
    setSectionsOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper to sync changes with URL params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'All' || value === 'false') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    const sort = searchParams.get('sort');
    if (sort) newParams.set('sort', sort); // keep sort param
    setSearchParams(newParams);
  };

  // Dual-slider handle changes
  const handleMinChange = (e) => {
    const val = Math.min(Number(e.target.value), maxPrice - 500);
    updateParam('minPrice', val === 0 ? '' : val.toString());
  };

  const handleMaxChange = (e) => {
    const val = Math.max(Number(e.target.value), minPrice + 500);
    updateParam('maxPrice', val === 15000 ? '' : val.toString());
  };

  const hasActiveFilters = 
    activeType !== 'all' || 
    activeGemstone || 
    minPrice > 0 || 
    maxPrice < 15000 || 
    inStockOnly || 
    onSale;

  const renderContent = () => (
    <div className="flex flex-col gap-6">
      
      {/* ━━━ STYLE REGISTRATION FOR DUAL SLIDER THUMBS ━━━ */}
      <style dangerouslySetInnerHTML={{__html: `
        .range-slider-input::-webkit-slider-thumb {
          pointer-events: auto;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #6B1E2E;
          cursor: pointer;
          border: 1.5px solid #ffffff;
          transition: transform 150ms ease;
        }
        .range-slider-input::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .range-slider-input::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #6B1E2E;
          cursor: pointer;
          border: 1.5px solid #ffffff;
          transition: transform 150ms ease;
        }
        .range-slider-input::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}} />

      {/* ━━━ SECTION 2: JEWELLERY TYPE ━━━ */}
      <div className="border-b border-[#C8A24A]/25 pb-5">
        <button
          onClick={() => toggleSection('type')}
          className="flex items-center justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-[#6B1E2E] mb-3 focus-visible:outline-none"
        >
          <span>Jewellery Type</span>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${sectionsOpen.type ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {sectionsOpen.type && (
          <div className="flex flex-wrap gap-2.5 pt-1.5">
            {types.map(t => {
              const isActive = activeType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => updateParam('type', t.id === 'all' ? '' : t.id)}
                  className={`min-h-[38px] px-4.5 py-2 rounded-full font-sans text-[10px] uppercase tracking-wider transition-all duration-300 border focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#6B1E2E] text-white border-[#6B1E2E] font-semibold'
                      : 'bg-transparent text-[#6B1E2E]/80 border-[#6B1E2E]/20 hover:border-[#6B1E2E]/40'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ━━━ SECTION 3: PRICE RANGE ━━━ */}
      <div className="border-b border-[#C8A24A]/25 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-[#6B1E2E] mb-3 focus-visible:outline-none"
        >
          <span>Price Range</span>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${sectionsOpen.price ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {sectionsOpen.price && (
          <div className="pt-2 px-1">
            <div className="relative w-full h-5 flex items-center">
              {/* Colored Active Track bar */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-[#6B1E2E]/20 rounded" />
              <div 
                className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#6B1E2E] rounded"
                style={{
                  left: `${(minPrice / 15000) * 100}%`,
                  width: `${((maxPrice - minPrice) / 15000) * 100}%`
                }}
              />

              {/* Dual inputs overlayed */}
              <input
                type="range"
                min="0"
                max="15000"
                step="250"
                value={minPrice}
                onChange={handleMinChange}
                className="range-slider-input absolute inset-0 w-full bg-transparent appearance-none pointer-events-none focus:outline-none z-30"
              />
              <input
                type="range"
                min="0"
                max="15000"
                step="250"
                value={maxPrice}
                onChange={handleMaxChange}
                className="range-slider-input absolute inset-0 w-full bg-transparent appearance-none pointer-events-none focus:outline-none z-40"
              />
            </div>

            {/* Price values label */}
            <div className="flex justify-between items-center mt-4">
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B1E2E]/60">Range:</span>
              <span className="font-serif text-[#6B1E2E] text-sm tracking-wide font-medium">
                ₹{minPrice.toLocaleString('en-IN')} – ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ━━━ SECTION 4: GEMSTONE ━━━ */}
      <div className="border-b border-[#C8A24A]/25 pb-5">
        <button
          onClick={() => toggleSection('gemstone')}
          className="flex items-center justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-[#6B1E2E] mb-3 focus-visible:outline-none"
        >
          <span>Gemstone</span>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${sectionsOpen.gemstone ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {sectionsOpen.gemstone && (
          <div className="flex flex-col gap-3 pt-1.5">
            {gemstones.map(gem => {
              const isActive = activeGemstone.toLowerCase() === gem.id;
              return (
                <button
                  key={gem.id}
                  onClick={() => updateParam('gemstone', isActive ? '' : gem.id)}
                  className="flex items-center text-left font-sans text-xs tracking-wider text-[#6B1E2E] hover:text-[#C8A24A] transition-colors duration-200 focus-visible:outline-none"
                >
                  {/* Swatch color dot */}
                  <span 
                    className="w-2.5 h-2.5 rounded-full mr-3 border border-[#6B1E2E]/10 shrink-0 shadow-sm"
                    style={{ backgroundColor: gem.color }}
                  />
                  <span className={isActive ? 'text-[#6B1E2E] font-semibold' : ''}>
                    {gem.label}
                  </span>
                  {isActive && (
                    <span className="text-[#6B1E2E] text-[9px] ml-auto">✦ ACTIVE</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ━━━ SECTION 5: AVAILABILITY & SALE ━━━ */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full font-sans text-[10px] font-bold uppercase tracking-widest text-[#6B1E2E] mb-4 focus-visible:outline-none"
        >
          <span>Availability</span>
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${sectionsOpen.availability ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {sectionsOpen.availability && (
          <div className="flex flex-col gap-4 pt-1">
            {/* Toggle: In Stock Only */}
            <label className="flex items-center justify-between cursor-pointer select-none">
              <span className="font-sans text-xs tracking-wider text-[#6B1E2E]/80">In Stock Only</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#C8A24A]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#6B1E2E] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C8A24A]" />
              </div>
            </label>

            {/* Toggle: On Sale */}
            <label className="flex items-center justify-between cursor-pointer select-none">
              <span className="font-sans text-xs tracking-wider text-[#6B1E2E]/80">On Sale</span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => updateParam('onSale', e.target.checked ? 'true' : '')}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#C8A24A]/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#6B1E2E] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C8A24A]" />
              </div>
            </label>
          </div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* ━━━ DESKTOP LAYOUT (Sidebar view) ━━━ */}
      <div className="w-[260px] shrink-0 border-r border-[#C8A24A]/20 pr-5">
        <div className="flex items-center justify-between border-b border-[#C8A24A]/30 pb-4 mb-6">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#C8A24A]">
            Filters
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#6B1E2E]/80 hover:text-[#C8A24A] transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
        {renderContent()}
      </div>

      {/* ━━━ MOBILE DRAWER WRAPPER ━━━ */}
      {/* (Only rendered if onApplyMobileFilters callback is triggered by a mobile modal open) */}
      {onApplyMobileFilters && (
        <div className="flex flex-col h-full justify-between">
          <div className="flex-grow pr-1">
            {renderContent()}
          </div>
          
          {/* Mobile Apply Actions Bar */}
          <div className="flex gap-4 pt-6 border-t border-[#C8A24A]/25 mt-6 shrink-0">
            <button
              onClick={clearAllFilters}
              className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B1E2E] border border-[#6B1E2E]/30 rounded-sm hover:border-[#6B1E2E]"
            >
              Clear
            </button>
            <button
              onClick={onApplyMobileFilters}
              className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-[#F5EDE2] bg-[#6B1E2E] hover:bg-[#C8A24A] transition-colors rounded-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
