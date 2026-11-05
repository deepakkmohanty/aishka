import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import productsService from '../services/products.service';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

// ━━━ PRODUCT CARD ━━━
export const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(product.id);
  const isSoldOut = product.stock === 0;

  const formatPrice = (price) => {
    return 'Rs. ' + parseFloat(price).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSoldOut) addToCart(product, 1);
  };

  const productImages = product.images || (product.image ? [product.image] : ['']);

  return (
    <div
      className="group w-full flex flex-col transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ━━━ IMAGE CONTAINER ━━━ */}
      <Link 
        to={`/product/${product.slug}`}
        className="relative w-full block overflow-hidden rounded-lg aspect-square bg-white border border-gray-100 shadow-sm cursor-pointer"
        title={product.name}
      >
        {/* Front image */}
        <img
          src={productImages[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        {/* Hover/detail image */}
        {productImages[1] && (
          <img
            src={productImages[1]}
            alt={`${product.name} detail`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* SOLD OUT badge */}
        {isSoldOut && (
          <div className="absolute top-0 left-0 right-0 bg-[#6B1E2E] text-[#F5EDE2] text-center font-sans text-[9px] font-bold uppercase tracking-[0.3em] py-2 z-10">
            SOLD OUT
          </div>
        )}

        {/* Action Buttons Overlay (centered horizontally, only shows on hover) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Wishlist */}
          <button
            onClick={handleWishlistToggle}
            className="w-9 h-9 rounded bg-white flex items-center justify-center shadow-md border border-gray-100 text-gray-700 hover:text-white hover:bg-[#7A1213] transition-all duration-200 cursor-pointer"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          
          {/* Cart */}
          <button
            onClick={handleQuickAdd}
            disabled={isSoldOut}
            className={`w-9 h-9 rounded bg-white flex items-center justify-center shadow-md border border-gray-100 text-gray-700 hover:text-white hover:bg-[#7A1213] transition-all duration-200 ${isSoldOut ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
            aria-label="Add to cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
        </div>
      </Link>

      {/* ━━━ PRODUCT INFO ━━━ */}
      <div className="flex flex-col text-center mt-3">
        {/* Product name */}
        <Link
          to={`/product/${product.slug}`}
          className="font-sans text-[13px] md:text-[14px] font-bold text-gray-800 leading-snug line-clamp-1 hover:text-[#7A1213] transition-colors mb-1"
        >
          {product.name}
        </Link>

        {/* Price */}
        <span className="font-sans text-xs md:text-sm font-bold text-gray-900 mb-3">
          {formatPrice(product.price)}
        </span>

        {/* Solid ADD TO CART Button */}
        <button
          onClick={handleQuickAdd}
          disabled={isSoldOut}
          className={`w-full py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white bg-[#7A1213] border border-[#7A1213] hover:bg-transparent hover:text-[#7A1213] active:bg-transparent active:text-[#7A1213] transition-all duration-300 ${
            isSoldOut ? 'bg-gray-400 border-gray-400 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isSoldOut ? 'SOLD OUT' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

// ━━━ NEW ARRIVALS SECTION ━━━
const NewArrivals = ({ onQuickView }) => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProducts({ isNewArrival: true, limit: 10 });
        if (response.success) {
          setNewArrivals(response.data.products);
        }
      } catch (error) {
        console.error('Failed to fetch new arrivals', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="bg-white py-12 md:py-16 px-6 md:px-12 lg:px-16">
      {/* ━━━ SECTION HEADER ━━━ */}
      <div className="max-w-[1400px] mx-auto text-center mb-10">
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-gray-900 mb-1">
          NEW ARRIVALS
        </h2>
        <p className="font-sans text-xs sm:text-sm text-gray-500">
          Shop our new arrivals
        </p>
      </div>

      {/* ━━━ GRID OF NEW ARRIVALS ━━━ */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse flex flex-col">
              <div className="w-full bg-gray-100 aspect-square rounded-lg mb-4" />
              <div className="h-4 bg-gray-100 w-3/4 mb-2 rounded" />
              <div className="h-4 bg-gray-100 w-1/2 mb-3 rounded" />
              <div className="h-10 bg-gray-100 w-full rounded" />
            </div>
          ))
        ) : (
          newArrivals.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
