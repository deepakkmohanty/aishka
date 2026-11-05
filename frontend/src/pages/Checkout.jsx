import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../utils/api';
import usersService from '../services/users.service';
import { useToast } from '../components/ui/Toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Checkout = () => {
  const { user, login, register } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Loading & Error States
  const [isAddressesLoading, setIsAddressesLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authFormData, setAuthFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [authError, setAuthError] = useState('');

  // Shipping States
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    is_default: false
  });

  // Coupon States
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount, type, value, description }
  const [couponError, setCouponError] = useState('');
  const [isCouponLoading, setIsCouponLoading] = useState(false);

  // Dynamically load Razorpay Checkout Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Fetch addresses when user is logged in
  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    setIsAddressesLoading(true);
    try {
      const res = await usersService.getAddresses();
      const fetchedAddresses = res.data || [];
      setAddresses(fetchedAddresses);
      
      // Auto-select default or first address
      if (fetchedAddresses.length > 0) {
        const defaultAddr = fetchedAddresses.find(a => a.is_default);
        setSelectedAddressId(defaultAddr ? defaultAddr.id : fetchedAddresses[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch addresses', err);
    } finally {
      setIsAddressesLoading(false);
    }
  };

  // Inline Auth Handler
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsSubmitLoading(true);
    try {
      if (authMode === 'login') {
        await login(authFormData.email, authFormData.password);
        addToast('Welcome back. Your session has been restored.', 'success');
      } else {
        await register(
          authFormData.name,
          authFormData.email,
          authFormData.password,
          authFormData.phone
        );
        addToast('Account created successfully.', 'success');
      }
    } catch (err) {
      setAuthError(err.response?.data?.message || 'Authentication failed. Please verify your details.');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Add New Address Handler
  const handleAddAddress = async (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);
    try {
      const res = await usersService.addAddress({ ...newAddress, name: user.name, phone: user.phone });
      addToast('New delivery destination registered.', 'success');
      setNewAddress({
        label: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        is_default: false
      });
      setShowNewAddressForm(false);
      await fetchAddresses();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to register address.', 'error');
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // Real Coupon Validation via API
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    setIsCouponLoading(true);
    try {
      const res = await api.post('/orders/validate-coupon', {
        coupon_code: code,
        subtotal: cart.subtotal || 0,
      });
      const data = res.data.data;
      setAppliedCoupon(data);
      addToast(`Coupon applied! You save ₹${data.discount.toLocaleString('en-IN')}`, 'success');
    } catch (err) {
      const msg = err.response?.data?.message || 'This coupon code is invalid or has expired.';
      setCouponError(msg);
      setAppliedCoupon(null);
    } finally {
      setIsCouponLoading(false);
    }
  };

  // Calculate pricing metrics
  const subtotal = cart.subtotal || 0;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const shippingFee = subtotal > 1999 ? 0 : 99;
  const total = subtotal + shippingFee - discountAmount;

  // Format INR Pricing
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  // Submit Order & Invoke Razorpay
  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      addToast('Please select or specify a delivery address.', 'error');
      return;
    }

    setIsSubmitLoading(true);
    try {
      const orderContextData = {
        address_id: selectedAddressId,
        coupon_code: appliedCoupon ? appliedCoupon.code : null
      };

      // 1. Create Razorpay order without creating DB order
      const payRes = await api.post('/orders/create-razorpay-order', orderContextData);
      const paymentData = payRes.data.data;

      // Bypass Razorpay popup if it is a mock order
      if (paymentData.razorpay_order_id.startsWith('order_mock_')) {
        try {
          const verifyRes = await api.post('/orders/verify-payment', {
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: `pay_mock_${Date.now()}`,
            razorpay_signature: 'mock_signature',
            orderData: orderContextData
          });
          const newOrderId = verifyRes.data.data.order_id;
          clearCart();
          addToast('Order placed successfully (Mock Payment).', 'success');
          navigate(`/order-confirmation/${newOrderId}?status=paid`);
        } catch (verifyErr) {
          console.error('Mock payment verification failure:', verifyErr);
          addToast('Failed to place order.', 'error');
          setIsSubmitLoading(false);
        }
        return;
      }

      // Load Razorpay SDK dynamically
      const loadRazorpay = () => new Promise(resolve => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
      const loaded = await loadRazorpay();
      if (!loaded) {
        addToast('Payment service unavailable. Please check your internet connection.', 'error');
        setIsSubmitLoading(false);
        return;
      }

      const options = {
        key: paymentData.key_id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: 'Aishka',
        description: `Order Payment`,
        order_id: paymentData.razorpay_order_id,
        handler: async function (response) {
          try {
            // 2. Verify payment and create DB order
            const verifyRes = await api.post('/orders/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderData: orderContextData
            });
            
            const newOrderId = verifyRes.data.data.order_id;
            
            clearCart();
            addToast('Payment processed and order placed successfully.', 'success');
            navigate(`/order-confirmation/${newOrderId}?status=paid`);
          } catch (verifyErr) {
            console.error('Payment verification failure:', verifyErr);
            addToast('Payment verification failed. Please contact support.', 'error');
            setIsSubmitLoading(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ''
        },
        theme: {
          color: '#6B1E2E'
        },
        modal: {
          ondismiss: function() {
            addToast('Payment cancelled.', 'info');
            setIsSubmitLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        addToast('Payment failed. Please try again.', 'error');
        setIsSubmitLoading(false);
      });
      rzp.open();
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to initiate checkout.', 'error');
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24">
      {/* Decorative layout border lines */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] mb-3">
            Secure Atelier
          </span>
          <h1 className="text-4xl sm:text-5xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Checkout <span className="italic text-[#C8A24A]">Details</span>
          </h1>
        </div>

        {cart.items.length === 0 ? (
          <div className="text-center py-20 border-[0.5px] border-[#C8A24A]/30 bg-white/40 backdrop-blur-sm p-12">
            <p className="text-2xl text-[#6B1E2E] font-serif italic mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Your shopping bag is empty. Explore our pieces to selection items.
            </p>
            <Link to="/collections">
              <Button variant="primary">Explore Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Delivery and Account Details */}
            <div className="lg:col-span-7 space-y-12">
              
              {/* Account Check / Authentication Form */}
              {!user ? (
                <div className="border-[0.5px] border-[#C8A24A]/40 bg-white/50 backdrop-blur-sm p-8 sm:p-10 relative">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
                  
                  <div className="flex justify-between items-center mb-10 border-b-[0.5px] border-[#C8A24A]/20 pb-4">
                    <h2 className="text-xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                      {authMode === 'login' ? 'Sign In to Finalize Order' : 'Create Customer Account'}
                    </h2>
                    <button 
                      onClick={() => {
                        setAuthMode(authMode === 'login' ? 'register' : 'login');
                        setAuthError('');
                      }}
                      className="text-[10px] uppercase tracking-wider text-[#C8A24A] hover:text-[#6B1E2E] transition-colors font-sans underline underline-offset-4"
                    >
                      {authMode === 'login' ? 'Or Create Account' : 'Or Sign In'}
                    </button>
                  </div>

                  {authError && (
                    <div className="mb-6 p-4 bg-red-50 border-l-2 border-red-600 text-red-700 text-xs font-sans">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleAuthSubmit} className="space-y-8">
                    {authMode === 'register' && (
                      <Input
                        type="text"
                        id="name"
                        label="Full Name"
                        required
                        value={authFormData.name}
                        onChange={(e) => setAuthFormData({...authFormData, name: e.target.value})}
                        placeholder="Your full name"
                        disabled={isSubmitLoading}
                      />
                    )}

                    <Input
                      type="email"
                      id="email"
                      label="Email Address"
                      required
                      value={authFormData.email}
                      onChange={(e) => setAuthFormData({...authFormData, email: e.target.value})}
                      placeholder="email@example.com"
                      disabled={isSubmitLoading}
                    />

                    {authMode === 'register' && (
                      <Input
                        type="tel"
                        id="phone"
                        label="Phone Number"
                        required
                        value={authFormData.phone}
                        onChange={(e) => setAuthFormData({...authFormData, phone: e.target.value})}
                        placeholder="10-digit mobile number"
                        disabled={isSubmitLoading}
                      />
                    )}

                    <Input
                      type="password"
                      id="password"
                      label="Password"
                      required
                      value={authFormData.password}
                      onChange={(e) => setAuthFormData({...authFormData, password: e.target.value})}
                      placeholder="Password"
                      disabled={isSubmitLoading}
                    />

                    <div className="pt-4">
                      <Button type="submit" isLoading={isSubmitLoading} className="w-full">
                        {authMode === 'login' ? 'Authenticate' : 'Register & Continue'}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                
                /* Address selection section */
                <div className="border-[0.5px] border-[#C8A24A]/40 bg-white/50 backdrop-blur-sm p-8 sm:p-10 relative">
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
                  
                  <div className="flex justify-between items-center mb-8 border-b-[0.5px] border-[#C8A24A]/20 pb-4">
                    <h2 className="text-xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                      Delivery <span className="italic text-[#C8A24A]">Destination</span>
                    </h2>
                    {!showNewAddressForm && (
                      <button 
                        onClick={() => setShowNewAddressForm(true)}
                        className="text-[10px] uppercase tracking-wider text-[#C8A24A] hover:text-[#6B1E2E] transition-colors font-sans underline underline-offset-4"
                      >
                        + Add Address
                      </button>
                    )}
                  </div>

                  {isAddressesLoading ? (
                    <div className="py-12 text-center text-[#6B1E2E]/60 text-sm font-sans tracking-wide">
                      Retrieving delivery directories...
                    </div>
                  ) : showNewAddressForm ? (
                    
                    /* New address form */
                    <form onSubmit={handleAddAddress} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Input
                          id="addrLabel"
                          label="Address Label (e.g. Home, Work)"
                          required
                          value={newAddress.label}
                          onChange={(e) => setNewAddress({...newAddress, label: e.target.value})}
                          placeholder="Home"
                          disabled={isSubmitLoading}
                        />
                        <Input
                          id="addrPincode"
                          label="Pincode / ZIP"
                          required
                          value={newAddress.pincode}
                          onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                          placeholder="400001"
                          disabled={isSubmitLoading}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Input
                          id="addrLine1"
                          label="Address Line 1"
                          required
                          value={newAddress.line1}
                          onChange={(e) => setNewAddress({...newAddress, line1: e.target.value})}
                          placeholder="Flat 101, Signature Heights"
                          disabled={isSubmitLoading}
                        />
                        <Input
                          id="addrLine2"
                          label="Address Line 2 (Opt)"
                          value={newAddress.line2}
                          onChange={(e) => setNewAddress({...newAddress, line2: e.target.value})}
                          placeholder="Landmark, Area"
                          disabled={isSubmitLoading}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <Input
                          id="addrCity"
                          label="City"
                          required
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                          placeholder="Mumbai"
                          disabled={isSubmitLoading}
                        />
                        <Input
                          id="addrState"
                          label="State"
                          required
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                          placeholder="Maharashtra"
                          disabled={isSubmitLoading}
                        />
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          id="addrDefault"
                          checked={newAddress.is_default}
                          onChange={(e) => setNewAddress({...newAddress, is_default: e.target.checked})}
                          className="h-4 w-4 border-[#C8A24A]/50 text-[#6B1E2E] focus:ring-[#C8A24A]"
                        />
                        <label htmlFor="addrDefault" className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#6B1E2E]/80">
                          Set as default delivery destination
                        </label>
                      </div>

                      <div className="flex space-x-4 pt-4">
                        <Button type="submit" isLoading={isSubmitLoading} className="flex-1">
                          Save Address
                        </Button>
                        <Button 
                          type="button" 
                          variant="secondary" 
                          onClick={() => setShowNewAddressForm(false)} 
                          className="flex-1"
                          disabled={isSubmitLoading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : addresses.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-[#6B1E2E]/80 mb-6 font-sans">
                        No delivery destinations registered. Please specify your address to place the order.
                      </p>
                      <Button variant="gold" size="sm" onClick={() => setShowNewAddressForm(true)}>
                        Create Delivery Address
                      </Button>
                    </div>
                  ) : (
                    
                    /* Address selector cards */
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
                      {addresses.map((addr) => {
                        const isSelected = selectedAddressId === addr.id;
                        return (
                          <div 
                            key={addr.id}
                            onClick={() => setSelectedAddressId(addr.id)}
                            className={`p-6 border transition-all duration-500 cursor-pointer relative group ${
                              isSelected 
                                ? 'border-[#6B1E2E] bg-[#6B1E2E]/5 shadow-sm' 
                                : 'border-[#C8A24A]/30 bg-white hover:border-[#6B1E2E]/50'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-[#6B1E2E] flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            )}

                            <div className="flex items-center space-x-3 mb-2.5">
                              <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#6B1E2E] bg-[#C8A24A]/25 px-2.5 py-1 rounded-sm">
                                {addr.label}
                              </span>
                              {addr.is_default && (
                                <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-[#C8A24A] font-semibold">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="font-sans text-sm text-[#6B1E2E] leading-relaxed pr-8">
                              {addr.line1} {addr.line2 && <><br/>{addr.line2}</>}
                            </p>
                            <p className="font-sans text-xs text-[#6B1E2E]/80 tracking-wide mt-1">
                              {addr.city}, {addr.state} — {addr.pincode}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Side: Order Summary & Coupon code */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Cart Items Summary */}
              <div className="border-[0.5px] border-[#C8A24A]/40 bg-white/50 backdrop-blur-sm p-8 sm:p-10 relative">
                <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
                
                <h2 className="text-xl text-[#6B1E2E] font-serif tracking-wide mb-8 border-b-[0.5px] border-[#C8A24A]/20 pb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                  Order <span className="italic text-[#C8A24A]">Summary</span>
                </h2>

                {/* Items List */}
                <div className="space-y-6 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar border-b-[0.5px] border-[#C8A24A]/20 pb-6 mb-8">
                  {cart.items.map((item) => {
                    const activePrice = Number(item.product.discount_price || item.product.price);
                    const additionalPrice = Number(item.variant?.additional_price || 0);
                    const itemPrice = activePrice + additionalPrice;
                    
                    return (
                      <div key={item.id} className="flex space-x-4 items-center">
                        <div className="w-14 h-18 bg-gray-50 border-[0.5px] border-[#C8A24A]/20 relative overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image || 'https://via.placeholder.com/150'} 
                            alt={item.product.name} 
                            className="absolute inset-0 w-full h-full object-cover" 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm text-[#6B1E2E] truncate" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {item.product.name}
                          </h4>
                          <p className="font-sans text-[10px] text-[#6B1E2E]/60 uppercase tracking-widest mt-0.5">
                            Qty: {item.quantity} {item.variant && `| Size: ${item.variant.size}`}
                          </p>
                        </div>

                        <span className="font-sans text-xs text-[#6B1E2E] font-medium">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code Form */}
                <form onSubmit={handleApplyCoupon} className="mb-8 flex space-x-3 items-end">
                  <div className="flex-1">
                    <Input
                      id="couponCode"
                      label="Promo Code / Coupon"
                      value={couponCode}
                      onChange={(e) => {
                        setCouponCode(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="e.g. AISHKA10"
                      disabled={isSubmitLoading || !!appliedCoupon}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="secondary" 
                    size="sm"
                    disabled={isSubmitLoading || isCouponLoading || !couponCode.trim() || !!appliedCoupon}
                    className="mb-1"
                  >
                    {isCouponLoading ? '...' : 'Apply'}
                  </Button>
                </form>

                {couponError && (
                  <p className="text-red-600 text-xs font-sans mb-4 -mt-2">{couponError}</p>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-[#C8A24A]/10 border border-[#C8A24A]/30 p-3 mb-6 font-sans text-xs">
                    <span className="text-[#6B1E2E] font-medium">
                      ✦ <span className="font-bold text-[#C8A24A]">{appliedCoupon.coupon_code}</span> — {appliedCoupon.description} applied!
                    </span>
                    <button 
                      type="button" 
                      onClick={() => { setAppliedCoupon(null); setCouponCode(''); }}
                      className="text-red-700 font-semibold uppercase hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Calculations Breakdown */}
                <div className="space-y-4 text-sm font-sans border-b-[0.5px] border-[#C8A24A]/20 pb-6 mb-6">
                  <div className="flex justify-between text-[#6B1E2E]/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-700 font-medium">
                      <span>Discount ({appliedCoupon.description})</span>
                      <span>−{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#6B1E2E]/80">
                    <span>Complimentary Shipping</span>
                    <span>{shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center mb-8">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#6B1E2E] font-semibold">Total Amount</span>
                  <span className="font-serif text-2xl text-[#6B1E2E] tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Place Order Trigger */}
                <Button 
                  onClick={handlePlaceOrder}
                  isLoading={isSubmitLoading} 
                  disabled={!user || isAddressesLoading}
                  className="w-full"
                >
                  Place Secure Order
                </Button>
                
                {!user && (
                  <p className="text-center text-[10px] text-[#6B1E2E]/60 uppercase tracking-widest mt-4">
                    * Authentication required to complete checkout
                  </p>
                )}
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
