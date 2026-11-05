import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useToast } from './ui/Toast';

const ProductInfo = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { addToast } = useToast();

  let variants = [];
  if (product.variants) {
    variants = typeof product.variants === 'string' ? JSON.parse(product.variants) : product.variants;
  }

  const [selectedVariant, setSelectedVariant] = useState(variants.length > 0 ? variants[0].name : null);

  const handleAddToCart = async () => {
    const activeVariant = variants.find(v => v.name === selectedVariant) || null;
    try {
      await addToCart(product, 1, activeVariant);
      addToast(`${product.name} has been added to your shopping bag.`, 'success');
    } catch (err) {
      addToast('Failed to add piece to shopping bag.', 'error');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  const activeVariantData = variants.find(v => v.name === selectedVariant);
  const displayPrice = activeVariantData ? activeVariantData.price : product.price;

  return (
    <div className="w-full flex flex-col justify-center py-4 lg:py-0 relative z-10 lg:pl-4">
      
      {/* Category / Collection Tag */}
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E]/80 mb-4">
        {product.Category ? product.Category.name : 'Signature Collection'}
      </span>

      {/* Product Title */}
      <h1 className="text-4xl lg:text-5xl xl:text-[3.5rem] text-[#6B1E2E] font-serif tracking-tight leading-[1.1] mb-6">
        {product.name}
      </h1>

      {/* Price */}
      <span className="font-serif text-xl lg:text-2xl tracking-[0.1em] text-[#6B1E2E]/80 mb-8 italic">
        {formatPrice(displayPrice)}
      </span>

      {/* Description */}
      <p className="text-[#6B1E2E]/90 font-sans text-sm md:text-[15px] leading-[1.8] font-medium max-w-lg mb-10 whitespace-pre-line">
        {product.description}
      </p>

      {/* Certificate of Authenticity Block */}
      <div className="relative border-[0.5px] border-[#C8A24A]/40 bg-white p-6 mb-12 max-w-lg group">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
        
        <div className="flex items-center space-x-3 mb-6">
          <svg className="w-4 h-4 text-[#6B1E2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#6B1E2E]">
            Certificate of Authenticity
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
          <div>
            <span className="block font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B1E2E]/70 mb-1.5">Base Metal</span>
            <span className="block font-sans text-[11px] font-semibold text-[#6B1E2E]">{product.material || '925 Sterling Silver'}</span>
          </div>
          {product.gemstoneType && (
            <div>
              <span className="block font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B1E2E]/70 mb-1.5">Gemstones</span>
              <span className="block font-sans text-[11px] font-semibold text-[#6B1E2E]">{product.gemstoneType}</span>
            </div>
          )}
          <div>
            <span className="block font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B1E2E]/70 mb-1.5">Purity Mark</span>
            <span className="block font-sans text-[11px] font-semibold text-[#6B1E2E]">BIS Hallmarked</span>
          </div>
          <div>
            <span className="block font-sans text-[9px] uppercase tracking-[0.1em] text-[#6B1E2E]/70 mb-1.5">Craftsmanship</span>
            <span className="block font-sans text-[11px] font-semibold text-[#6B1E2E]">Handmade</span>
          </div>
        </div>
      </div>

      {/* Variant Selector */}
      {variants.length > 0 && (
        <div className="mb-12">
          <span className="block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#6B1E2E] mb-5">
            Select Option: <span className="text-[#C8A24A] ml-2">{selectedVariant}</span>
          </span>
          <div className="flex flex-wrap gap-4">
            {variants.map((v) => (
              <button
                key={v.name}
                onClick={() => setSelectedVariant(v.name)}
                className={`px-6 py-3 rounded-sm font-sans text-[10px] uppercase tracking-[0.15em] transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EDE2]
                  ${selectedVariant === v.name 
                    ? 'border-[0.5px] border-[#6B1E2E] bg-[#6B1E2E] text-[#F5EDE2]' 
                    : 'border-[0.5px] border-[#C8A24A]/40 text-[#6B1E2E] hover:border-[#6B1E2E]'
                  }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart Actions */}
      <div className="max-w-lg flex items-center space-x-4">
        <button 
          onClick={handleAddToCart}
          className="flex-grow py-4 lg:py-5 bg-[#6B1E2E] border-[0.5px] border-[#6B1E2E] text-[#F5EDE2] font-sans text-[11px] uppercase tracking-[0.25em] font-semibold hover:bg-transparent hover:text-[#6B1E2E] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EDE2]"
        >
          Add to Cart
        </button>
        <button className="w-[52px] h-[52px] lg:w-[60px] lg:h-[60px] flex items-center justify-center border-[0.5px] border-[#C8A24A]/50 text-[#C8A24A] hover:bg-[#C8A24A]/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EDE2] rounded-sm" aria-label="Add to Wishlist">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* Shipping micro-copy */}
      <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#6B1E2E]/80 mt-6 flex items-center">
        <svg className="w-3 h-3 mr-3 text-[#C8A24A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
        Complimentary fully-insured shipping worldwide
      </p>

    </div>
  );
};

export default ProductInfo;
