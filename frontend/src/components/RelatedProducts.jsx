import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import productsService from '../services/products.service';
import { ProductCard } from './NewArrivals';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RELATED PRODUCTS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const RelatedProducts = ({ currentProduct, onQuickView }) => {
  const scrollRef = useRef(null);
  const [related, setRelated] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Determine heading based on audience
  const sectionHeading = 'YOU MAY ALSO LIKE';

  // Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
      if (!currentProduct?.id) return;
      try {
        const res = await productsService.getRelatedProducts(currentProduct.id);
        if (res.success && res.data?.products) {
          setRelated(res.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };
    fetchRelated();
  }, [currentProduct?.id]);

  // Scroll tracking
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [related.length]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 270 : -270, behavior: 'smooth' });
  };

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-16 border-t border-gray-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative">

        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div className="text-center md:text-left">
            <h2 className="font-sans font-bold text-gray-900 text-2xl tracking-[0.2em] uppercase">
              {sectionHeading}
            </h2>
          </div>

          {/* Right: scroll buttons + View All */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className={`w-10 h-10 border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 rounded-sm focus-visible:outline-none ${
                  canScrollLeft ? 'opacity-100' : 'opacity-25 pointer-events-none'
                }`}
                aria-label="Scroll left"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="15 18 9 12 15 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                className={`w-10 h-10 border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-black hover:border-black hover:text-white transition-all duration-300 rounded-sm focus-visible:outline-none ${
                  canScrollRight ? 'opacity-100' : 'opacity-25 pointer-events-none'
                }`}
                aria-label="Scroll right"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            <Link
              to="/collections"
              className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-800 hover:underline underline-offset-4 shrink-0"
            >
              VIEW ALL →
            </Link>
          </div>
        </div>

        {/* ━━━ SCROLL ROW ━━━ */}
        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-7 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {related.map((product) => (
            <div key={product.id || product._id} className="snap-start w-[210px] md:w-[240px]">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;
