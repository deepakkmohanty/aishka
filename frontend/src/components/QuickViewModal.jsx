import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const QuickViewModal = ({ isOpen, onClose, product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Default');
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Reset states when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setQuantity(1);
      setSelectedSize(product.sizes?.[0] || 'Default');
    }
  }, [product]);

  // Handle Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];
  const currentImage = images[activeImage] || 'https://via.placeholder.com/400';
  
  const price = Number(product.price);
  const discountPrice = product.discount_price ? Number(product.discount_price) : null;
  const hasDiscount = discountPrice && discountPrice < price;

  const formatPrice = (amt) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amt).replace('.00', '');
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.slug}`);
  };

  // Dummy sizes if none provided by product
  const sizes = product.sizes || ['S', 'M', 'L'];
  const shortDesc = product.shortDescription || "Experience the timeless beauty of handcrafted silver with this exquisite piece, designed for everyday elegance and festive celebrations alike.";

  return (
    <>
      {/* ━━━ OVERLAY ━━━ */}
      <div 
        className="fixed inset-0 bg-black/60 z-[200] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300"
        onClick={onClose}
      >
        {/* ━━━ MODAL PANEL ━━━ */}
        <div 
          className="relative w-full max-w-[800px] bg-white rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
          onClick={e => e.stopPropagation()} // Prevent clicks inside from closing
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-[#6B1E2E] hover:text-[#C8A24A] bg-white backdrop-blur-sm rounded-full p-1.5 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* LEFT: Image Gallery (45%) */}
          <div className="w-full md:w-[45%] bg-white p-6 flex flex-col items-center justify-start overflow-y-auto custom-scrollbar">
            {/* Main Image */}
            <div 
              className="w-full aspect-[4/5] bg-white relative mb-4"
              style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}
            >
              <img 
                src={currentImage} 
                alt={product.name} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            
            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex gap-2 w-full justify-center">
                {images.slice(0, 4).map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-20 relative overflow-hidden transition-all ${
                      activeImage === idx 
                        ? 'border border-[#C8A24A] opacity-100' 
                        : 'border border-transparent opacity-60 hover:opacity-100'
                    }`}
                    style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}
                  >
                    <img src={img} alt="" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply bg-white" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info (55%) */}
          <div className="w-full md:w-[55%] p-8 flex flex-col overflow-y-auto custom-scrollbar">
            {/* Audience Tag */}
            {product.audience && (
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A24A] mb-2">
                {product.audience}
              </p>
            )}

            {/* Title */}
            <h2 className="font-serif text-[#6B1E2E] text-2xl leading-tight mb-3">
              {product.name}
            </h2>

            {/* Price & Rating Row */}
            <div className="flex items-center justify-between mb-4">
              <div className="font-serif flex items-baseline gap-3">
                <span className="text-[#C8A24A] text-xl">
                  {formatPrice(hasDiscount ? discountPrice : price)}
                </span>
                {hasDiscount && (
                  <span className="text-[#6B1E2E]/50 text-sm line-through">
                    {formatPrice(price)}
                  </span>
                )}
              </div>
              
              {/* Star Rating */}
              <div className="flex text-[#C8A24A]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="ml-0.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
            </div>

            {/* Short Description */}
            <p className="font-sans text-[13px] text-[#6B1E2E]/80 leading-relaxed mb-6">
              {shortDesc}
            </p>

            <hr className="border-[#C8A24A]/20 mb-6" />

            {/* Size Selector */}
            {product.audience?.includes('RINGS') && (
              <div className="mb-6">
                <p className="font-sans text-[10px] uppercase font-bold tracking-wider text-[#6B1E2E] mb-3">
                  Select Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-1.5 font-sans text-xs border transition-colors ${
                        selectedSize === size 
                          ? 'border-[#C8A24A] bg-[#C8A24A] text-[#F5EDE2]' 
                          : 'border-[#C8A24A]/50 text-[#6B1E2E] hover:border-[#C8A24A]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mb-8">
              <p className="font-sans text-[10px] uppercase font-bold tracking-wider text-[#6B1E2E] mb-3">
                Quantity
              </p>
              <div className="inline-flex items-center border border-[#C8A24A]/50 bg-white/50 h-9">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-[#6B1E2E] hover:text-[#C8A24A] transition-colors focus:outline-none"
                >
                  −
                </button>
                <span className="w-12 h-full flex items-center justify-center font-sans text-[13px] text-[#6B1E2E] font-medium border-x border-[#C8A24A]/40">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-[#6B1E2E] hover:text-[#C8A24A] transition-colors focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6 mt-auto">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#C8A24A] text-[#6B1E2E] border border-[#C8A24A] font-sans text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-transparent hover:text-[#C8A24A] active:bg-transparent active:text-[#C8A24A] transition-all duration-300 shadow-sm"
              >
                ADD TO CART
              </button>
              <button 
                className="w-full border border-[#C8A24A] text-[#6B1E2E] font-sans text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-[#C8A24A] hover:text-[#F5EDE2] transition-colors"
              >
                ADD TO WISHLIST ♡
              </button>
            </div>

            {/* View Full Details Link */}
            <button 
              onClick={handleViewFullDetails}
              className="font-sans text-[11px] text-[#6B1E2E] hover:text-[#C8A24A] underline underline-offset-4 tracking-wide text-center"
            >
              View Full Details →
            </button>

          </div>
        </div>
      </div>
    </>
  );
};

export default QuickViewModal;
