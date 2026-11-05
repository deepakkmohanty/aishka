import React, { useState, useEffect } from 'react';

const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImages = images && images.length > 0 ? images : [];

  const handleNext = () => {
    if (activeImages.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % activeImages.length);
  };

  const handlePrev = () => {
    if (activeImages.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length);
  };

  return (
    <div className="w-full lg:w-[50%] flex flex-col md:flex-row gap-4 items-start">
      {/* ━━━ VERTICAL THUMBNAILS (Desktop Only) ━━━ */}
      {activeImages.length > 1 && (
        <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 max-h-[500px] overflow-y-auto scrollbar-hide py-1">
          {activeImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-20 overflow-hidden rounded-sm transition-all duration-300 border focus:outline-none ${
                  isActive
                    ? 'border-black ring-1 ring-black'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={img}
                  alt={`${productName} Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* ━━━ MAIN IMAGE CONTAINER ━━━ */}
      <div className="flex-1 w-full flex flex-col gap-4">
        <div 
          className="relative w-full h-[400px] lg:h-[500px] overflow-hidden bg-gray-50 border border-gray-100 rounded-sm cursor-zoom-in"
          onClick={() => {
            if (activeImages.length > 0) setIsLightboxOpen(true);
          }}
        >
          {activeImages.length === 0 ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#DFBA73] via-[#F6E7C1] to-[#A07A2B] flex items-center justify-center">
              <span className="font-serif italic text-[#6B1E2E] text-lg tracking-wider">No Image Available</span>
            </div>
          ) : (
            <>
              {activeImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${productName} Detail ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                    activeIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}

              {/* Navigation Arrows */}
              {activeImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 shadow-sm border border-gray-200 text-gray-800 z-20 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/85 shadow-sm border border-gray-200 text-gray-800 z-20 hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* ━━━ HORIZONTAL THUMBNAILS (Mobile Only) ━━━ */}
        {activeImages.length > 1 && (
          <div className="flex md:hidden gap-3 overflow-x-auto whitespace-nowrap py-1 scrollbar-hide">
            {activeImages.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-16 h-16 shrink-0 overflow-hidden rounded-sm transition-all duration-300 border focus:outline-none ${
                    isActive
                      ? 'border-black ring-1 ring-black'
                      : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${productName} Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ━━━ LIGHTBOX OVERLAY ━━━ */}
      {isLightboxOpen && activeImages.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all z-[110]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <img
            src={activeImages[activeIndex]}
            alt={`${productName} Zoom View`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
