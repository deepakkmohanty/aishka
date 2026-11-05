import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import productsService from '../services/products.service';
import { CartContext } from '../context/CartContext';

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Clear query when closing
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setQuery(''), 350); // clear after animation
    }
  }, [isOpen]);

  const popularSearches = ['Rings', 'Necklaces', 'Earrings', 'Kada', 'Pendants', 'Gift Sets'];

  const [popularProducts, setPopularProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load popular products on mount
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await productsService.getProducts({ isFeatured: true, limit: 6 });
        if (response.success) {
          setPopularProducts(response.data.products);
        }
      } catch (err) {
        console.error('Failed to fetch popular products', err);
      }
    };
    fetchPopular();
  }, []);

  // Debounced live search
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await productsService.searchProducts(query);
        if (response.success) {
          setSearchResults(response.data.products);
        }
      } catch (err) {
        console.error('Search failed', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const displayProducts = query.trim() ? searchResults : popularProducts;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  return (
    <>
      {/* ━━━ OVERLAY BACKDROP ━━━ */}
      <div 
        className={`fixed inset-0 bg-[#1A070B]/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      {/* ━━━ SLIDE DOWN PANEL ━━━ */}
      <div 
        className={`fixed top-0 left-0 w-full bg-white border-b-2 border-[#C8A24A] z-[110] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col max-h-[85vh] ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col overflow-hidden h-full">
          
          {/* Close button top right */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-[#6B1E2E] hover:text-[#C8A24A] transition-colors p-2"
            aria-label="Close search"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* ━━━ SEARCH INPUT ━━━ */}
          <div className="w-full max-w-[600px] mx-auto relative mb-6">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jewellery..."
              autoFocus={isOpen}
              className="w-full bg-transparent border-0 border-b border-[#C8A24A] text-[#6B1E2E] font-serif text-2xl px-2 pb-2 focus:ring-0 focus:outline-none placeholder:text-[#6B1E2E]/40 placeholder:italic pr-12"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center pr-2 pb-2">
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="text-[#6B1E2E]/60 hover:text-[#6B1E2E] mr-2 focus:outline-none"
                  aria-label="Clear search"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="1.5" className="pointer-events-none">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* ━━━ POPULAR SEARCHES ━━━ */}
          <div className="w-full max-w-[600px] mx-auto text-center mb-10 flex-shrink-0">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#C8A24A] md:mr-3 block md:inline-block mb-3 md:mb-0">
              Popular Searches:
            </span>
            <div className="inline-flex flex-wrap justify-center gap-2 align-middle">
              {popularSearches.map(term => (
                <button 
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1 border border-[#C8A24A] rounded-full bg-transparent text-[#6B1E2E] font-sans text-xs hover:bg-[#C8A24A] transition-colors whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* ━━━ PRODUCTS DISPLAY (POPULAR OR LIVE) ━━━ */}
          <div className="flex-1 overflow-y-auto px-2 pb-6 min-h-0">
            <div className="text-center mb-8">
              <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#C8A24A]">
                {query.trim() ? 'Search Results' : 'Popular Products'}
              </h3>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="font-serif italic text-2xl text-[#6B1E2E] animate-pulse">
                  Searching...
                </p>
              </div>
            ) : query.trim() && searchResults.length === 0 ? (
              <div className="text-center py-12">
                <p className="font-serif italic text-2xl text-[#6B1E2E]">
                  No results for '{query}'
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto pb-4">
                {displayProducts.map(product => {
                  const price = Number(product.discount_price || product.price);
                  return (
                    <div key={product.id} className="group flex flex-col">
                      <Link 
                        to={`/product/${product.slug}`} 
                        onClick={onClose}
                        className="w-full aspect-[4/5] bg-white relative overflow-hidden mb-3"
                        style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}
                      >
                        <img 
                          src={product.images && product.images[0]} 
                          alt={product.name} 
                          className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <Link 
                        to={`/product/${product.slug}`} 
                        onClick={onClose}
                        className="font-serif text-[#6B1E2E] text-[15px] md:text-lg leading-tight hover:text-[#C8A24A] transition-colors truncate"
                      >
                        {product.name}
                      </Link>
                      <p className="font-serif text-[#C8A24A] text-sm md:text-base mt-1 mb-3">
                        {formatPrice(price)}
                      </p>
                      <button 
                        onClick={() => addToCart(product, 1)}
                        className="w-full py-2.5 border border-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-transparent hover:text-[#C8A24A] active:bg-transparent active:text-[#C8A24A] transition-all duration-300 mt-auto"
                      >
                        Add to Cart
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default SearchOverlay;
