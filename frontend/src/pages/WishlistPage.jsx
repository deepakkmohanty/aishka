import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { ProductCard } from '../components/NewArrivals';
import QuickViewModal from '../components/QuickViewModal';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const CLIP = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SPARKLE SVG
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SparkleIcon = ({ size = 56 }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    fill="none" stroke="#C8A24A" strokeWidth="1"
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Central large star */}
    <path
      d="M12 2L13.8 9.2L21 12L13.8 14.8L12 22L10.2 14.8L3 12L10.2 9.2Z"
      fill="#C8A24A" fillOpacity="0.18"
    />
    {/* Top-left mini sparkle */}
    <path d="M5 5L5.6 6.8L7 7L5.6 7.2L5 9L4.4 7.2L3 7L4.4 6.8Z"
      fill="#C8A24A" fillOpacity="0.5" />
    {/* Bottom-right mini sparkle */}
    <path d="M19 17L19.6 18.8L21 19L19.6 19.2L19 21L18.4 19.2L17 19L18.4 18.8Z"
      fill="#C8A24A" fillOpacity="0.5" />
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SHARE WISHLIST BUTTON
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ShareWishlistBtn = ({ wishlist }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const slugs = wishlist
      .map(item => item.product?.slug || item.slug)
      .filter(Boolean)
      .join(',');
    const url = `${window.location.origin}/collections?wishlist=${encodeURIComponent(slugs)}`;

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-5 py-2.5 border font-sans text-[10px] font-bold uppercase
                  tracking-[0.2em] transition-all duration-300
                  ${copied
                    ? 'border-green-400 text-green-600 bg-green-50'
                    : 'border-[#C8A24A]/50 text-[#6B1E2E] hover:border-[#C8A24A] hover:bg-[#C8A24A]/8'
                  }`}
    >
      {copied ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Link Copied!
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Share Wishlist
        </>
      )}
    </button>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EMPTY STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const EmptyState = () => (
  <div className="flex flex-col items-center text-center py-24 px-6">
    {/* Large animated sparkle */}
    <div className="mb-6 animate-pulse">
      <SparkleIcon size={72} />
    </div>

    {/* Heart outline */}
    <div className="mb-6">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C8A24A"
        strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>

    <h2
      className="font-serif italic text-[#6B1E2E] text-3xl md:text-4xl mb-3 leading-snug"
      style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
    >
      Your wishlist is empty
    </h2>
    <p className="font-sans text-sm text-[#6B1E2E]/55 font-light mb-8 max-w-xs leading-relaxed">
      Save the pieces you love and come back when you're ready.
    </p>
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <Link
        to="/collections"
        className="inline-flex items-center gap-2 px-8 py-4 bg-[#C8A24A] text-[#6B1E2E]
                   font-sans text-[10px] font-bold uppercase tracking-[0.3em]
                   hover:bg-[#E8C766] transition-all duration-300"
        style={{ clipPath: CLIP }}
      >
        Explore Jewellery →
      </Link>
      <Link
        to="/"
        className="font-sans text-[10px] text-[#6B1E2E]/55 uppercase tracking-[0.2em]
                   hover:text-[#C8A24A] transition-colors underline underline-offset-4"
      >
        Back to Home
      </Link>
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WISHLIST CARD (extends ProductCard with a persistent remove btn
// and an "ADD TO CART" strip below the card)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WishlistCard = ({ product, onQuickView, onRemove }) => {
  const { addToCart } = useContext(CartContext);
  const [adding, setAdding] = useState(false);
  const [added, setAdded]   = useState(false);

  const isSoldOut = product.stock === 0;
  const price = product.discount_price || product.price;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isSoldOut || adding) return;
    setAdding(true);
    addToCart(product, 1);
    await new Promise(r => setTimeout(r, 400));
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Reuse the existing ProductCard — it already shows audience tag,
          name, price, heart (filled when in wishlist), and quick view */}
      <div className="flex justify-center">
        <ProductCard product={product} onQuickView={onQuickView} />
      </div>

      {/* Add to Cart strip below each card */}
      <div className="mt-2 flex justify-center">
        <button
          onClick={handleAddToCart}
          disabled={isSoldOut}
          className={`w-[220px] md:w-[240px] py-2.5 font-sans text-[9px] font-bold uppercase tracking-[0.25em]
                      transition-all duration-300 border
                      ${isSoldOut
                        ? 'border-[#6B1E2E]/20 text-[#6B1E2E]/30 cursor-not-allowed'
                        : added
                          ? 'bg-[#6B1E2E] border-[#6B1E2E] text-[#F5EDE2]'
                          : 'border-[#C8A24A]/50 text-[#6B1E2E] hover:border-[#C8A24A] hover:bg-[#C8A24A]/10'
                      }`}
        >
          {isSoldOut ? 'Sold Out' : adding ? 'Adding…' : added ? '✓ Added to Cart' : '+ Add to Cart'}
        </button>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT — WishlistPage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const WishlistPage = () => {
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    document.title = 'My Wishlist | Aishka';
    window.scrollTo(0, 0);
  }, []);

  // Normalise: wishlist items are either { product: {...} } or product objects directly
  const products = wishlist.map(item => item.product || item).filter(p => p && p.id);
  const count = products.length;

  return (
    <div className="min-h-screen bg-white">

      {/* ━━━ PAGE HERO STRIP ━━━ */}
      <div className="bg-white border-b border-gray-150">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-10 md:py-14">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-sans text-[10px] text-[#6B1E2E]/45 uppercase tracking-[0.2em] mb-6">
            <Link to="/" className="hover:text-[#C8A24A] transition-colors">Home</Link>
            <span className="text-[#C8A24A]/40">›</span>
            <span className="text-[#6B1E2E]">Wishlist</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-[#C8A24A] mb-2">
                ✦ Saved Pieces ✦
              </span>
              <h1
                className="font-serif text-[#6B1E2E] text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
              >
                My Wishlist
                {count > 0 && (
                  <span className="font-sans text-lg text-[#6B1E2E]/45 ml-3 font-normal tracking-normal">
                    ({count} {count === 1 ? 'item' : 'items'})
                  </span>
                )}
              </h1>
              <p className="font-sans text-sm text-[#6B1E2E]/55 font-light mt-1.5">
                Your saved Aishka pieces
              </p>
            </div>

            {/* Share button — only show when wishlist has items */}
            {count > 0 && <ShareWishlistBtn wishlist={wishlist} />}
          </div>
        </div>
      </div>

      {/* ━━━ CONTENT ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">

        {count === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Top action bar */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-sans text-xs text-[#6B1E2E]/50">
                {count} {count === 1 ? 'piece' : 'pieces'} saved
              </p>
              <button
                onClick={() => products.forEach(p => toggleWishlist(p))}
                className="font-sans text-[10px] text-[#6B1E2E]/45 hover:text-red-600
                           uppercase tracking-[0.2em] transition-colors underline underline-offset-4"
              >
                Clear All
              </button>
            </div>

            {/* Product grid — standard design */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 pt-10 border-t border-gray-150 flex flex-col sm:flex-row items-center justify-center gap-5">
              <span className="font-sans text-sm text-[#6B1E2E]/55">
                Looking for something else?
              </span>
              <Link
                to="/collections"
                className="inline-flex items-center gap-2 px-7 py-3 bg-[#C8A24A] text-[#6B1E2E]
                           font-sans text-[10px] font-bold uppercase tracking-[0.3em]
                           hover:bg-[#E8C766] transition-all duration-300"
                style={{ clipPath: CLIP }}
              >
                Browse All Jewellery →
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default WishlistPage;
