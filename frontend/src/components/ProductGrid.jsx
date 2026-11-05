import React, { useState, useEffect } from 'react';
import { ProductCard } from './NewArrivals';

const ProductGrid = ({
  products = [],
  onQuickView,
  onClearFilters,
  isLoading = false,
  paginationType = 'pages' // 'pages' | 'load-more'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Reset to page 1 whenever active products change (e.g. filters applied/cleared)
  useEffect(() => {
    setCurrentPage(1);
  }, [products.length, products[0]?.id]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex justify-center w-full">
            <div className="w-[220px] md:w-[240px] flex flex-col animate-pulse">
              {/* Image Skeleton */}
              <div
                className="relative w-full overflow-hidden mb-4 bg-gradient-to-br from-white via-white to-white"
                style={{
                  aspectRatio: '3 / 4',
                  clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)'
                }}
              />
              {/* Info Skeleton */}
              <div className="flex flex-col px-1 space-y-2">
                <div className="h-2 w-1/3 bg-[#C8A24A]/30 rounded" />
                <div className="h-4 w-3/4 bg-[#6B1E2E]/20 rounded" />
                <div className="h-4 w-1/2 bg-[#6B1E2E]/20 rounded" />
                <div className="h-3 w-1/4 bg-[#C8A24A]/30 rounded pt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        {/* Centered sparkle SVG icon */}
        <div className="mb-6 flex justify-center text-[#C8A24A]">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            {/* Tiny auxiliary sparkles */}
            <path
              d="M6 6L7 8L8 6L7 4Z"
              fill="currentColor"
              fillOpacity="0.6"
            />
            <path
              d="M18 18L19 20L20 18L19 16Z"
              fill="currentColor"
              fillOpacity="0.6"
            />
          </svg>
        </div>
        
        {/* Empty State Text */}
        <h3
          className="text-[#6B1E2E] font-serif text-2xl tracking-wide italic mb-6 animate-fade-in"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          No pieces found in this category
        </h3>

        {/* Clear Filters Button - Gold Outlined */}
        <button
          onClick={onClearFilters}
          className="px-6 py-2.5 bg-transparent border border-[#C8A24A] text-[#6B1E2E] font-sans text-xs font-bold uppercase tracking-[0.15em] clip-gemstone hover:bg-[#C8A24A] hover:text-[#F5EDE2] transition-all duration-300"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  // Calculate items for current page
  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Under 'pages' pagination type: we slice the array to only show the current page's products
  // Under 'load-more' pagination type: we show from the beginning up to the current page's end
  const displayedProducts = paginationType === 'pages'
    ? products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : products.slice(0, currentPage * itemsPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      // Scroll back up to the top of the collections grid area
      const mainContainer = document.querySelector('main');
      if (mainContainer) {
        mainContainer.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* ━━━ PRODUCT GRID ━━━ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {displayedProducts.map(product => (
          <div key={product.id} className="flex justify-center w-full">
            <ProductCard
              product={product}
              onQuickView={onQuickView}
            />
          </div>
        ))}
      </div>

      {/* ━━━ PAGINATION CONTROLS ━━━ */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 pt-6 border-t border-[#C8A24A]/10">
          {paginationType === 'pages' ? (
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider transition-colors select-none ${
                  currentPage === 1
                    ? 'text-[#6B1E2E]/30 cursor-not-allowed'
                    : 'text-[#6B1E2E] hover:text-[#C8A24A]'
                }`}
              >
                Previous
              </button>

              {/* Numbered Page Buttons */}
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center font-sans text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-[#C8A24A] text-[#6B1E2E]'
                        : 'bg-transparent text-[#6B1E2E] border border-[#C8A24A] hover:bg-[#C8A24A]/10'
                    }`}
                    style={{
                      clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)'
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider transition-colors select-none ${
                  currentPage === totalPages
                    ? 'text-[#6B1E2E]/30 cursor-not-allowed'
                    : 'text-[#6B1E2E] hover:text-[#C8A24A]'
                }`}
              >
                Next
              </button>
            </div>
          ) : (
            /* Load More Button option */
            currentPage < totalPages && (
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-transparent border border-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#C8A24A] hover:text-[#F5EDE2]"
                style={{
                  clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)'
                }}
              >
                Load More
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
