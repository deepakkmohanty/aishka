import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';

const Cart = () => {
  const { cart, updateCart, removeFromCart, clearCart } = useContext(CartContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Coupon States
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: '', discountPercent: 0 }
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cartItems = cart.items || [];
  const isEmpty = cartItems.length === 0;

  // Coupon Lookup (Simulating backend validation checks)
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'SILVER10') {
      setAppliedCoupon({ code: 'SILVER10', discountPercent: 10 });
      addToast('Promo code SILVER10 applied: 10% discount.', 'success');
    } else if (code === 'WELCOME20') {
      setAppliedCoupon({ code: 'WELCOME20', discountPercent: 20 });
      addToast('Promo code WELCOME20 applied: 20% discount.', 'success');
    } else {
      setCouponError('This coupon code is invalid or has expired.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon code removed.', 'info');
  };

  // Calculate pricing metrics
  const subtotal = cart.subtotal || 0;
  const discountPercent = appliedCoupon ? appliedCoupon.discountPercent : 0;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal > 1999 ? 0 : (isEmpty ? 0 : 99);
  const total = subtotal + shippingFee - discountAmount;

  // Format INR Pricing
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  const handleCheckoutRedirect = () => {
    navigate('/checkout', { state: { coupon: appliedCoupon } });
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Title / Header */}
        <div className="text-center mb-16">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] mb-3">
            Your Selection
          </span>
          <h1 className="text-4xl sm:text-5xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Shopping <span className="italic text-[#C8A24A]">Bag</span>
          </h1>
        </div>

        {isEmpty ? (
          <div className="text-center py-20 border-[0.5px] border-gray-200 bg-white p-12 max-w-2xl mx-auto relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
            
            <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A]/50 flex items-center justify-center text-[#C8A24A] mx-auto mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            
            <p className="text-2xl text-[#6B1E2E] font-serif italic mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Your atelier box is awaiting its first treasure.
            </p>
            <Link to="/collections">
              <Button variant="primary">Explore Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Items list */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-[0.5px] border-gray-200 bg-white p-6 sm:p-8 relative">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
                
                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-6 border-b-[0.5px] border-[#C8A24A]/30 text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#6B1E2E]">
                  <div className="col-span-6">Item details</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Items */}
                <div className="divide-y-[0.5px] divide-[#C8A24A]/20">
                  {cartItems.map((item) => {
                    const activePrice = Number(item.product.discount_price || item.product.price);
                    const additionalPrice = Number(item.variant?.additional_price || 0);
                    const itemPrice = activePrice + additionalPrice;
                    const rowTotal = itemPrice * item.quantity;

                    return (
                      <div key={item.id} className="py-6 md:grid md:grid-cols-12 md:gap-4 md:items-center flex flex-col md:flex-row group">
                        
                        {/* Detail Info */}
                        <div className="col-span-6 flex space-x-6">
                          <div className="w-20 h-26 bg-white relative overflow-hidden border-[0.5px] border-gray-150 flex-shrink-0">
                            <img 
                              src={item.product.image || 'https://via.placeholder.com/150'} 
                              alt={item.product.name} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                          </div>
                          <div className="flex-grow flex flex-col justify-between py-1">
                            <div>
                              <h3 className="text-lg text-[#6B1E2E] font-serif tracking-wide leading-tight mb-1" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                                {item.product.name}
                              </h3>
                              {item.variant && (
                                <span className="font-sans text-[9px] uppercase tracking-[0.1em] text-[#C8A24A] block mb-1">
                                  Size: {item.variant.size}
                                </span>
                              )}
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="w-fit font-sans text-[9px] uppercase tracking-[0.15em] text-red-800 hover:text-[#6B1E2E] transition-colors underline underline-offset-4 mt-2"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price (Mobile is inline, Desktop is cell) */}
                        <div className="col-span-2 text-left md:text-center mt-4 md:mt-0 font-sans text-xs text-[#6B1E2E]/80">
                          <span className="inline md:hidden text-[#C8A24A] font-semibold mr-2 uppercase text-[9px] tracking-wider">Price:</span>
                          {formatPrice(itemPrice)}
                        </div>

                        {/* Quantity (Mobile is inline, Desktop is cell) */}
                        <div className="col-span-2 text-left md:text-center mt-4 md:mt-0 flex items-center md:justify-center">
                          <span className="inline md:hidden text-[#C8A24A] font-semibold mr-4 uppercase text-[9px] tracking-wider">Qty:</span>
                          <div className="flex items-center border-[0.5px] border-[#C8A24A]/50 bg-white shadow-sm">
                            <button 
                              onClick={() => updateCart(item.id, item.quantity - 1)}
                              className="px-2.5 py-0.5 text-[#6B1E2E] hover:text-[#C8A24A] transition-colors focus:outline-none"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-3 py-0.5 font-sans text-[10px] text-[#6B1E2E] border-x-[0.5px] border-[#C8A24A]/50 font-semibold min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateCart(item.id, item.quantity + 1)}
                              className="px-2.5 py-0.5 text-[#6B1E2E] hover:text-[#C8A24A] transition-colors focus:outline-none"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total (Mobile is inline, Desktop is cell) */}
                        <div className="col-span-2 text-left md:text-right mt-4 md:mt-0 font-sans text-sm font-semibold text-[#6B1E2E]">
                          <span className="inline md:hidden text-[#C8A24A] font-semibold mr-2 uppercase text-[9px] tracking-wider">Subtotal:</span>
                          {formatPrice(rowTotal)}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-between items-center pt-4">
                <Link to="/collections" className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#6B1E2E] hover:text-[#C8A24A] transition-colors underline underline-offset-4 font-bold">
                  ← Continue Shopping
                </Link>
                <button 
                  onClick={() => {
                    clearCart();
                    addToast('All pieces cleared from shopping bag.', 'info');
                  }}
                  className="text-[9px] font-sans uppercase tracking-[0.2em] text-red-800 hover:text-red-600 transition-colors border-[0.5px] border-red-800/30 hover:border-red-600 px-5 py-2.5"
                >
                  Clear Shopping Bag
                </button>
              </div>
            </div>

            {/* Right Side: Order Summary */}
            <div className="lg:col-span-4 space-y-8">
              <div className="border-[0.5px] border-gray-200 bg-white p-8 relative">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
                
                <h2 className="text-xl text-[#6B1E2E] font-serif tracking-wide mb-8 border-b-[0.5px] border-[#C8A24A]/20 pb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Order <span className="italic text-[#C8A24A]">Summary</span>
                </h2>

                <div className="space-y-6 pb-6 border-b-[0.5px] border-[#C8A24A]/20">
                  <div className="flex justify-between text-[11px] font-sans text-[#6B1E2E]/80 tracking-wider">
                    <span>Atelier Box Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {appliedCoupon && (
                    <div className="flex justify-between text-[11px] font-sans text-green-800 tracking-wider">
                      <div className="flex items-center gap-1.5">
                        <span>Promo Code ({appliedCoupon.code})</span>
                        <button 
                          onClick={handleRemoveCoupon}
                          className="text-[8px] uppercase tracking-normal bg-[#6B1E2E]/10 text-[#6B1E2E] px-1.5 py-0.5 rounded hover:bg-red-800 hover:text-white transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[11px] font-sans text-[#6B1E2E]/80 tracking-wider">
                    <span>Insured Delivery</span>
                    <span>{shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}</span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-[9px] font-sans text-[#C8A24A] tracking-wider italic leading-normal">
                      Enjoy complimentary delivery on purchases above ₹1,999.
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center py-6">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B1E2E] font-bold">Total Est.</span>
                  <span className="font-serif text-2xl text-[#6B1E2E] tracking-wide font-medium" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="pt-4 border-t-[0.5px] border-[#C8A24A]/20">
                  <label className="block font-sans text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-bold mb-3">
                    Apply Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. WELCOME20" 
                      value={couponCode} 
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={!!appliedCoupon}
                      className="flex-grow bg-white border-[0.5px] border-[#C8A24A]/40 text-[#6B1E2E] font-sans text-xs px-3 py-2.5 rounded-none focus:outline-none focus:border-[#6B1E2E] placeholder:text-[#6B1E2E]/40"
                    />
                    <button 
                      type="submit" 
                      disabled={!!appliedCoupon}
                      className="px-4 py-2 border-[0.5px] border-[#6B1E2E] bg-[#6B1E2E] text-[#F5EDE2] font-sans text-[9px] uppercase tracking-widest font-semibold hover:bg-transparent hover:text-[#6B1E2E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-red-800 text-[10px] font-sans mt-2 tracking-wider">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <p className="text-green-800 text-[10px] font-sans mt-2 tracking-wider">Coupon applied successfully!</p>
                  )}
                </form>

                {/* Checkout Button */}
                <div className="mt-8 pt-4">
                  <Button 
                    onClick={handleCheckoutRedirect} 
                    className="w-full"
                  >
                    Proceed to Secure Checkout
                  </Button>
                </div>

                {/* Micro Copy */}
                <p className="text-center font-sans text-[8px] text-[#6B1E2E]/60 mt-6 tracking-widest uppercase leading-normal">
                  Insured Shipping • Safe & Encrypted • 7-day Exchange
                </p>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
