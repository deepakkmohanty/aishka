import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsService from '../services/products.service';
import { ProductCard } from './NewArrivals';

const BestSellers = ({ onQuickView }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProducts({ isBestseller: true, limit: 10 });
        if (response.success) {
          setBestSellers(response.data.products);
        }
      } catch (error) {
        console.error('Failed to fetch bestsellers', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
  }, []);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12 lg:px-16">
      {/* ━━━ SECTION HEADER ━━━ */}
      <div className="max-w-[1400px] mx-auto text-center mb-10">
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          Our Bestseller
        </h2>
        <p className="font-sans text-xs sm:text-sm text-gray-500">
          Shop Our All Time Favorites
        </p>
      </div>

      {/* ━━━ GRID OF BESTSELLERS ━━━ */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex flex-col">
              <div className="w-full bg-gray-100 aspect-[3/4] rounded-lg mb-4" />
              <div className="h-4 bg-gray-100 w-3/4 mb-2 rounded" />
              <div className="h-4 bg-gray-100 w-1/2 mb-3 rounded" />
              <div className="h-10 bg-gray-100 w-full rounded" />
            </div>
          ))
        ) : (
          bestSellers.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))
        )}
      </div>
    </section>
  );
};

export default BestSellers;
