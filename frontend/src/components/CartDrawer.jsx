import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import productsService from '../services/products.service';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, updateCart, removeFromCart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showCoupon, setShowCoupon] = useState(false);

  const cartItems = cart.items || [];
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isEmpty = cartItems.length === 0;

  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Fetch 'You May Also Like' when cart opens
  useEffect(() => {
    if (isOpen && suggestedProducts.length === 0) {
      const fetchSuggested = async () => {
        try {
          const res = await productsService.getProducts({ isFeatured: true, limit: 4 });
          if (res.success) setSuggestedProducts(res.data.products);
        } catch (err) {
          console.error(err);
        }
      };
      fetchSuggested();
    }
  }, [isOpen, suggestedProducts.length]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  return (
    <>
      {/* ━━━ OVERLAY ━━━ */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-400 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white border-l-2 border-[#C8A24A] z-[110] shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ━━━ HEADER ━━━ */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C8A24A]/30">
          <h2 className="font-sans text-[13px] font-bold uppercase tracking-[0.2em] text-[#6B1E2E]">
            YOUR CART ({itemCount})
          </h2>
          <button 
            onClick={onClose}
            className="text-[#6B1E2E] hover:text-[#C8A24A] transition-colors p-1"
            aria-label="Close cart"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ━━━ MAIN CONTENT AREA ━━━ */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          
          {isEmpty ? (
            /* ━━━ EMPTY STATE ━━━ */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="1.5" className="mb-6 animate-pulse">
                <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"></path>
              </svg>
              <h3 className="font-serif text-[#6B1E2E] text-2xl italic tracking-wide mb-6">
                Your bag is empty
              </h3>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/collections');
                }}
                className="px-8 py-3 border border-[#C8A24A] text-[#6B1E2E] font-sans text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#C8A24A] hover:text-white transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* ━━━ CART ITEMS LIST ━━━ */
            <div className="flex-1 p-6 space-y-6">
              {cartItems.map((item) => {
                const activePrice = Number(item.product.discount_price || item.product.price);
                const itemPrice = activePrice + Number(item.variant?.additional_price || 0);

                return (
                  <div key={item.id} className="flex gap-5 group">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.slug}`} onClick={onClose} className="w-[80px] h-[100px] flex-shrink-0 relative focus-visible:outline-[#C8A24A]" style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}>
                      <div className="absolute inset-0 bg-white"></div>
                      <img 
                        src={item.product.image || (item.product.images && item.product.images[0])} 
                        alt={item.product.name}
                        className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <Link to={`/product/${item.product.slug}`} onClick={onClose} className="font-serif text-lg text-[#6B1E2E] leading-tight hover:text-[#C8A24A] transition-colors">
                            {item.product.name}
                          </Link>
                        </div>
                        {item.product.audience && (
                          <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[#C8A24A] mt-1">
                            {item.product.audience}
                          </p>
                        )}
                        <p className="font-serif text-lg text-[#C8A24A] mt-1">
                          {formatPrice(itemPrice)}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-[#C8A24A]/40 bg-white h-8">
                          <button 
                            onClick={() => updateCart(item.id, item.quantity - 1)}
                            className="w-8 h-full flex items-center justify-center text-[#6B1E2E] hover:text-[#C8A24A] hover:bg-white transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 h-full flex items-center justify-center font-sans text-xs text-[#6B1E2E] font-medium border-x border-[#C8A24A]/40">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCart(item.id, item.quantity + 1)}
                            className="w-8 h-full flex items-center justify-center text-[#6B1E2E] hover:text-[#C8A24A] hover:bg-white transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="font-sans text-[10px] text-[#6B1E2E] hover:text-[#C8A24A] uppercase tracking-wider hover:underline underline-offset-4"
                        >
                          Remove ×
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ━━━ YOU MAY ALSO LIKE ━━━ */}
          <div className="px-6 py-8 bg-white border-t border-[#C8A24A]/20">
            <h3 className="font-serif text-xl text-[#6B1E2E] mb-4">You May Also Like</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 scrollbar-hide snap-x">
              {suggestedProducts.map(product => {
                const price = Number(product.discount_price || product.price);
                return (
                  <div key={product.id} className="w-[140px] flex-shrink-0 snap-start group">
                    <Link 
                      to={`/product/${product.slug}`} 
                      onClick={onClose} 
                      className="block w-full aspect-square relative mb-3 bg-white border border-[#C8A24A]/20 overflow-hidden focus-visible:outline-[#C8A24A]"
                      style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}
                    >
                      <img src={product.images[0]} alt={product.name} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    <Link to={`/product/${product.slug}`} onClick={onClose} className="font-serif text-[14px] text-[#6B1E2E] leading-tight block mb-1 hover:text-[#C8A24A] transition-colors truncate">
                      {product.name}
                    </Link>
                    <p className="font-serif text-[#C8A24A] text-sm mb-2">{formatPrice(price)}</p>
                    <button 
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-1.5 border border-[#C8A24A]/50 text-[#6B1E2E] font-sans text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-[#C8A24A] hover:text-white transition-colors"
                    >
                      ADD
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ━━━ FOOTER ━━━ */}
        {!isEmpty && (
          <div className="p-6 bg-white border-t border-[#C8A24A]/30">
            
            {/* Coupon Toggle */}
            <div className="mb-4">
              <button 
                onClick={() => setShowCoupon(!showCoupon)}
                className="flex items-center text-[#6B1E2E] font-sans text-[10px] uppercase font-bold tracking-wider hover:text-[#C8A24A] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.44 11.05l-9.19 9.19a2 2 0 01-2.83 0l-5.66-5.66a2 2 0 010-2.83l9.19-9.19a2 2 0 011.41-.58h6.16a2 2 0 012 2v6.16a2 2 0 01-.58 1.41z" />
                  <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor" />
                </svg>
                ADD A COUPON
              </button>
              {showCoupon && (
                <div className="flex mt-3">
                  <input type="text" placeholder="Gift card or discount code" className="flex-1 border border-[#C8A24A] bg-transparent px-3 py-2 text-sm text-[#6B1E2E] focus:outline-none focus:ring-1 focus:ring-[#C8A24A]" />
                  <button className="bg-[#C8A24A] text-[#6B1E2E] px-4 py-2 font-sans text-[10px] uppercase font-bold tracking-wider hover:bg-[#E8C766] transition-colors">Apply</button>
                </div>
              )}
            </div>

            {/* Subtotal */}
            <div className="flex items-end justify-between mb-2">
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-[#6B1E2E]">Subtotal:</span>
              <span className="font-serif text-[22px] text-[#C8A24A] leading-none">
                {formatPrice(cart.subtotal)}
              </span>
            </div>
            <p className="font-sans text-[10px] text-[#6B1E2E]/60 mb-5">
              Taxes and shipping calculated at checkout
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
                className="w-full bg-[#C8A24A] text-[#6B1E2E] font-sans text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-[#E8C766] transition-colors shadow-sm"
              >
                PROCEED TO CHECKOUT
              </button>
              <button 
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
                className="w-full border border-[#C8A24A] text-[#6B1E2E] font-sans text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-[#C8A24A] hover:text-white transition-colors"
              >
                VIEW CART
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
