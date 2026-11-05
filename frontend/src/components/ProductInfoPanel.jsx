import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { useToast } from './ui/Toast';

const ProductInfoPanel = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Parse variants if stored as string
  let variants = [];
  if (product.variants) {
    variants = typeof product.variants === 'string' ? JSON.parse(product.variants) : product.variants;
  }

  // Set default sizes if variants are empty
  const isRing = product.type?.toLowerCase() === 'rings' || product.audience?.includes('RINGS');
  const defaultSizes = isRing ? ['6', '7', '8', '9', '10'] : ['S', 'M', 'L'];
  const hasVariants = variants.length > 0;
  
  const [selectedSize, setSelectedSize] = useState(
    hasVariants ? variants[0].name : defaultSizes[0]
  );

  const price = Number(product.price);
  const discountPrice = product.discount_price ? Number(product.discount_price) : null;
  const hasDiscount = discountPrice && discountPrice < price;
  const savings = hasDiscount ? price - discountPrice : 0;

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amt).replace('.00', '');
  };

  const handleAddToCart = () => {
    const activeVariant = hasVariants ? variants.find(v => v.name === selectedSize) : null;
    addToCart(product, quantity, activeVariant);
    addToast(`${product.name} (Size: ${selectedSize}) added to bag.`, 'success');
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const activeVariant = hasVariants ? variants.find(v => v.name === selectedSize) : null;
    addToCart(product, quantity, activeVariant);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    const inWishlist = isInWishlist(product.id);
    addToast(
      inWishlist 
        ? `${product.name} removed from wishlist.` 
        : `${product.name} added to wishlist.`, 
      'success'
    );
  };

  const handleScrollToReviews = (e) => {
    e.preventDefault();
    const tabEl = document.getElementById('product-tabs') || document.querySelector('[role="tablist"]');
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this gorgeous ${product.name} from Aishka!`;
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      addToast('Link copied to clipboard!', 'success');
    } else if (platform === 'instagram') {
      window.open('https://instagram.com', '_blank');
      addToast('Instagram opened. Paste link in your story or bio!', 'info');
    }
  };

  // Determine category for breadcrumbs
  const categoryName = product.Category?.name || product.type || 'Jewellery';

  // Kids products safety check
  const isKidsProduct = product.audience?.toLowerCase().includes('kids') || product.forParam === 'kids' || product.for === 'kids';

  // Format price helper
  const formatPriceVal = (amt) => {
    return 'Rs. ' + new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amt);
  };

  // Delivery date estimator
  const getDeliveryDates = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date1 = new Date();
    date1.setDate(date1.getDate() + 4);
    const date2 = new Date();
    date2.setDate(date2.getDate() + 7);
    return {
      start: date1.toLocaleDateString('en-US', options),
      end: date2.toLocaleDateString('en-US', options)
    };
  };
  const deliveryDates = getDeliveryDates();

  const [isDescOpen, setIsDescOpen] = useState(true);

  return (
    <div className="w-full flex flex-col py-4 lg:py-0 relative z-10 lg:pl-4 text-left">
      {/* ━━━ PRODUCT NAME ━━━ */}
      <h1 
        className="text-3xl md:text-4xl text-gray-900 font-sans font-medium tracking-tight leading-tight mb-4"
      >
        {product.name}
      </h1>

      {/* ━━━ PRICE ━━━ */}
      <div className="mb-2">
        <span className="text-2xl text-gray-900 font-sans font-medium">
          {formatPriceVal(hasDiscount ? discountPrice : price)}
        </span>
        {hasDiscount && (
          <span className="text-lg text-gray-400 font-sans line-through ml-3">
            {formatPriceVal(price)}
          </span>
        )}
      </div>

      {/* ━━━ SHIPPING TEXT ━━━ */}
      <p className="text-sm text-gray-500 font-sans mb-6">
        Shipping calculated at checkout.
      </p>

      {/* ━━━ WISHLIST & ENQUIRY ROW ━━━ */}
      <div className="flex items-center gap-6 mb-6">
        <button 
          onClick={handleWishlistToggle} 
          className="flex items-center gap-2 text-xs font-sans text-gray-700 hover:text-black transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <span className="hover:underline">Add to Wishlist</span>
        </button>

        <button 
          onClick={() => window.open(`https://wa.me/919938883677?text=Hi, I am interested in ${encodeURIComponent(product.name)}`, '_blank')}
          className="flex items-center gap-2 text-xs font-sans text-gray-700 hover:text-black transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="hover:underline">Enquiry</span>
        </button>
      </div>

      {/* ━━━ VARIANT SELECTOR ━━━ */}
      {(hasVariants || product.type?.toLowerCase() === 'rings') && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.15em] text-gray-700">
              SELECT SIZE
            </span>
            <button 
              onClick={() => setIsSizeGuideOpen(true)}
              className="font-sans text-[10px] uppercase tracking-widest text-[#C8A24A] hover:text-[#E8C766] transition-colors font-bold underline underline-offset-4"
            >
              Size Guide
            </button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {(hasVariants ? variants.map(v => v.name) : defaultSizes).map(size => {
              const isActive = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 font-sans text-xs font-semibold tracking-wider transition-all duration-300 rounded-sm border focus:outline-none ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-transparent text-gray-800 border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ━━━ QUANTITY & ADD TO CART ROW ━━━ */}
      <div className="flex items-center gap-3 mb-4">
        {/* Quantity Stepper */}
        <div className="flex items-center border border-gray-300 h-12 w-28 select-none bg-white">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors font-sans text-lg"
          >
            −
          </button>
          <span className="flex-1 h-full flex items-center justify-center font-sans text-sm text-gray-800 font-medium">
            {quantity}
          </span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors font-sans text-lg"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-grow h-12 font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
            product.stock === 0
              ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-black text-white border-black hover:bg-transparent hover:text-black'
          }`}
        >
          {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
        </button>
      </div>

      {/* ━━━ BUY IT NOW ━━━ */}
      <button 
        onClick={handleBuyNow}
        disabled={product.stock === 0}
        className={`w-full py-4 mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${
          product.stock === 0
            ? 'bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-[#7A1515] text-white border-[#7A1515] hover:bg-transparent hover:text-[#7A1515]'
        }`}
      >
        BUY IT NOW
      </button>

      {/* ━━━ ESTIMATED DELIVERY ━━━ */}
      <div className="flex items-center gap-2.5 text-xs text-gray-600 font-sans mb-8">
        <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15 15" />
        </svg>
        <span>
          Estimated delivery between <strong className="text-gray-900">{deliveryDates.start}</strong> - <strong className="text-gray-900">{deliveryDates.end}</strong>.
        </span>
      </div>

      {/* ━━━ PRODUCT DESCRIPTION ACCORDION ━━━ */}
      <div className="border border-[#F0D59E] rounded-md bg-[#FFFBEA] overflow-hidden mb-6">
        <button 
          onClick={() => setIsDescOpen(!isDescOpen)}
          className="w-full py-4 px-6 flex items-center justify-between text-left text-sm font-semibold text-gray-800 focus:outline-none"
        >
          <span>Product Description</span>
          <span className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold transition-transform duration-300 select-none">
            {isDescOpen ? '−' : '+'}
          </span>
        </button>
        <div className={`transition-all duration-300 overflow-hidden ${isDescOpen ? 'max-h-[1000px] border-t border-[#F0D59E]/40 p-6' : 'max-h-0'}`}>
          <div 
            className="prose prose-sm text-gray-700 max-w-none font-sans leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description || 'No description available for this product.' }}
          />
        </div>
      </div>

      {/* ━━━ WARRANTY SECTION ━━━ */}
      <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-white">
        {/* Color Warranty Header */}
        <div className="flex items-center justify-center gap-2.5 mb-6 border-b border-gray-100 pb-4">
          {/* Gold circular badge */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#F3D580] to-[#C79D3A] flex items-center justify-center text-white font-bold font-sans text-sm shadow-sm shrink-0">
            1
          </div>
          <span className="font-sans font-bold text-base tracking-wider text-[#7A1515] uppercase">
            1 Year Color Warranty*
          </span>
        </div>

        {/* 3 columns feature row */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            {/* Durga eye icon */}
            <div className="w-10 h-10 flex items-center justify-center mb-2 text-gray-700">
              <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
                {/* Durga eye left */}
                <path d="M15,50 C30,30 50,30 50,50 C50,70 30,70 15,50 Z" />
                <circle cx="32" cy="50" r="6" fill="currentColor" />
                {/* Durga eye right */}
                <path d="M50,50 C50,30 70,30 85,50 Z" />
                <path d="M85,50 C70,70 50,70 50,50 Z" fill="none" />
                <circle cx="68" cy="50" r="6" fill="currentColor" />
                {/* Durga forehead bindi */}
                <circle cx="50" cy="25" r="5" fill="#7A1515" />
                {/* Decorative eyebrows */}
                <path d="M15,40 Q32,25 50,42" />
                <path d="M50,42 Q68,25 85,40" />
              </svg>
            </div>
            <span className="font-sans text-[10px] font-medium text-gray-700 leading-tight">
              Proudly made in Bengal
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            {/* Cash on delivery icon */}
            <div className="w-10 h-10 flex items-center justify-center mb-2 text-gray-700">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h.01M15 14h.01" />
              </svg>
            </div>
            <span className="font-sans text-[10px] font-medium text-gray-700 leading-tight">
              Cash on delivery available
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            {/* Easy return package icon */}
            <div className="w-10 h-10 flex items-center justify-center mb-2 text-gray-700">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3 3 3m-3-3v12" />
              </svg>
            </div>
            <span className="font-sans text-[10px] font-medium text-gray-700 leading-tight">
              Easy return and exchange
            </span>
          </div>
        </div>

        {/* Small Note */}
        <p className="font-sans text-[9px] text-[#7A1515] italic mt-5 leading-normal text-center border-t border-gray-100 pt-3">
          *Only applicable for bridal collections. For regular wear items (like Noa) we offer 6 months color warranty
        </p>
      </div>

      {/* ━━━ SECURE PAYMENT GUARANTEE CARD ━━━ */}
      <div className="border border-[#CBE3CB] rounded-lg p-4 bg-[#F2FAF2] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: badge + text */}
        <div className="flex items-center gap-2.5">
          <svg className="w-5 h-5 text-[#2E7D32]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
          </svg>
          <span className="font-sans font-bold text-xs text-gray-800">
            100% Secure Payment Guarantee
          </span>
        </div>

        {/* Right: Payment Partner Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* GPay */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-gray-600 font-sans shadow-sm select-none">
            GPay
          </div>
          {/* PhonePe */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-[#5f259f] font-sans shadow-sm select-none">
            PhonePe
          </div>
          {/* Paytm */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-[#00b9f5] font-sans shadow-sm select-none">
            Paytm
          </div>
          {/* Visa */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-[#1a1f71] font-sans shadow-sm select-none">
            VISA
          </div>
          {/* RuPay */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-[#f58220] font-sans shadow-sm select-none">
            RuPay
          </div>
          {/* Mastercard */}
          <div className="bg-white border border-gray-200 rounded px-2 py-1 text-[9px] font-bold text-[#eb001b] font-sans shadow-sm select-none">
            MC
          </div>
        </div>
      </div>

      {/* ━━━ SIZE GUIDE MODAL ━━━ */}
      {isSizeGuideOpen && (
        <div 
          className="fixed inset-0 z-[250] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div 
            className="bg-white border border-[#C8A24A] max-w-md w-full p-6 relative rounded-sm shadow-2xl animate-fade-in text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#6B1E2E] hover:text-[#C8A24A] transition-colors"
              aria-label="Close Size Guide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Modal Heading */}
            <h3 
              className="font-serif text-[#6B1E2E] text-2xl mb-4 border-b border-[#C8A24A]/25 pb-2"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              {isRing ? 'Ring Size Chart' : 'Size Guide'}
            </h3>

            {/* Measurements Table */}
            {isRing ? (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-[#C8A24A]/30 text-[#C8A24A] font-bold tracking-wider">
                      <th className="py-2.5">Indian Size</th>
                      <th className="py-2.5">Inner Diameter (mm)</th>
                      <th className="py-2.5">Circumference (mm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#6B1E2E]/80 divide-y divide-[#C8A24A]/10">
                    <tr>
                      <td className="py-2">6</td>
                      <td className="py-2">14.0 mm</td>
                      <td className="py-2">44.0 mm</td>
                    </tr>
                    <tr>
                      <td className="py-2">7</td>
                      <td className="py-2">14.8 mm</td>
                      <td className="py-2">46.5 mm</td>
                    </tr>
                    <tr>
                      <td className="py-2">8</td>
                      <td className="py-2">15.6 mm</td>
                      <td className="py-2">49.0 mm</td>
                    </tr>
                    <tr>
                      <td className="py-2">9</td>
                      <td className="py-2">16.45 mm</td>
                      <td className="py-2">51.7 mm</td>
                    </tr>
                    <tr>
                      <td className="py-2">10</td>
                      <td className="py-2">17.3 mm</td>
                      <td className="py-2">54.4 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left font-sans text-xs">
                  <thead>
                    <tr className="border-b border-[#C8A24A]/30 text-[#C8A24A] font-bold tracking-wider">
                      <th className="py-2.5">Size</th>
                      <th className="py-2.5">Length (Inches)</th>
                      <th className="py-2.5">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#6B1E2E]/80 divide-y divide-[#C8A24A]/10">
                    <tr>
                      <td className="py-2 font-bold">S</td>
                      <td className="py-2">6"</td>
                      <td className="py-2">15.2 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">M</td>
                      <td className="py-2">7"</td>
                      <td className="py-2">17.8 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">L</td>
                      <td className="py-2">8"</td>
                      <td className="py-2">20.3 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <p className="font-sans text-[10px] text-[#6B1E2E]/60 italic mt-5 leading-normal">
              Note: If your measurement falls between sizes, we recommend ordering the larger size.
            </p>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-6 w-full py-3 bg-[#6B1E2E] text-[#F5EDE2] font-sans text-[10px] font-bold uppercase tracking-wider hover:bg-[#C8A24A] transition-colors rounded-sm"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfoPanel;
