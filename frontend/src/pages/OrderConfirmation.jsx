import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Button from '../components/ui/Button';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get('status') || 'pending';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data.data?.order || null);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price).replace('.00', '');
  };

  // Generate a mock estimated delivery date (e.g., 5-7 days from now)
  const getDeliveryEstimate = () => {
    const today = new Date();
    const estimateStart = new Date(today);
    estimateStart.setDate(today.getDate() + 5);
    const estimateEnd = new Date(today);
    estimateEnd.setDate(today.getDate() + 7);

    const options = { month: 'short', day: 'numeric' };
    return `${estimateStart.toLocaleDateString('en-US', options)} – ${estimateEnd.toLocaleDateString('en-US', options)}`;
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full border-[0.5px] border-[#C8A24A]/40 bg-white/60 backdrop-blur-sm p-8 sm:p-12 relative">
        {/* Subtle decorative corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>

        {/* Header Icon */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A] flex items-center justify-center text-[#C8A24A] mx-auto mb-6 bg-[#C8A24A]/5">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] mb-3">
            Heritage Preserved
          </span>
          <h1 className="text-3xl sm:text-4xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Order Confirmed
          </h1>
          <p className="font-sans text-xs text-[#6B1E2E]/60 uppercase tracking-widest mt-4">
            Confirmation Reference: <span className="font-bold text-[#6B1E2E]">#JHM-{id}</span>
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-[#6B1E2E]/60 font-sans text-sm tracking-wide">
            Retrieving commission invoice details...
          </div>
        ) : error || !order ? (
          
          /* Fallback view for database offline or error */
          <div className="space-y-8 border-t-[0.5px] border-b-[0.5px] border-[#C8A24A]/20 py-8 my-8 text-center">
            <p className="font-sans text-sm text-[#6B1E2E] leading-relaxed max-w-md mx-auto">
              Your order has been registered in our books. An email confirmation has been sent to your inbox.
            </p>
            <div className="bg-[#C8A24A]/10 border border-[#C8A24A]/30 p-4 font-sans text-xs max-w-sm mx-auto rounded-sm">
              <p className="text-[#6B1E2E] font-medium uppercase tracking-wider mb-1">Payment Status</p>
              <p className="text-[#6B1E2E] font-bold text-sm uppercase tracking-widest">
                {paymentStatus === 'paid' ? 'Authenticated & Settled' : 'Pending Verification'}
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/account">
                <Button variant="secondary" size="sm">Manage Orders</Button>
              </Link>
              <Link to="/">
                <Button variant="primary" size="sm">Return Home</Button>
              </Link>
            </div>
          </div>
        ) : (
          
          /* Detailed order view */
          <div className="space-y-8 border-t-[0.5px] border-b-[0.5px] border-[#C8A24A]/20 py-8 my-8">
            
            {/* Meta status details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#C8A24A]/5 border-[0.5px] border-[#C8A24A]/20 p-6 font-sans text-xs">
              <div>
                <p className="text-[#C8A24A] font-bold uppercase tracking-wider mb-1">Delivery Estimate</p>
                <p className="text-[#6B1E2E] font-semibold text-sm">{getDeliveryEstimate()}</p>
              </div>
              <div>
                <p className="text-[#C8A24A] font-bold uppercase tracking-wider mb-1">Payment Verification</p>
                <p className="text-[#6B1E2E] font-bold text-sm uppercase tracking-widest">
                  {order.payment_status === 'paid' ? 'Settled' : 'Pending Validation'}
                </p>
              </div>
            </div>

            {/* Destination Snapshot */}
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C8A24A] mb-3">
                Shipping Destination
              </h3>
              <p className="font-serif text-lg text-[#6B1E2E]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {order.name_snapshot}
              </p>
              <p className="font-sans text-xs text-[#6B1E2E]/80 mt-1 leading-relaxed">
                {order.address_line}, {order.city}, {order.state} — {order.pincode}
              </p>
              <p className="font-sans text-[10px] uppercase tracking-wider text-[#6B1E2E]/60 mt-1.5">
                Contact: {order.phone_snapshot}
              </p>
            </div>

            {/* Items table */}
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#C8A24A] mb-4">
                Acquisitions
              </h3>
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm font-sans">
                    <div className="flex items-center space-x-3">
                      {item.image_snapshot && (
                        <div className="w-10 h-14 bg-gray-50 border-[0.5px] border-[#C8A24A]/20 overflow-hidden relative flex-shrink-0">
                          <img src={item.image_snapshot} alt={item.name_snapshot} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="text-[#6B1E2E] font-serif" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                          {item.name_snapshot}
                        </p>
                        <p className="text-[10px] text-[#6B1E2E]/60 uppercase tracking-widest mt-0.5">
                          Qty: {item.quantity} {item.variant_label && `| ${item.variant_label}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[#6B1E2E] font-medium">
                      {formatPrice(Number(item.price_snapshot) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Details */}
            <div className="pt-4 border-t-[0.5px] border-[#C8A24A]/10 space-y-3 font-sans text-xs text-[#6B1E2E]/80">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(Number(order.subtotal))}</span>
              </div>
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount Applied ({order.coupon_code})</span>
                  <span>-{formatPrice(Number(order.discount))}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping & Insurance</span>
                <span>{Number(order.shipping_fee) === 0 ? 'Complimentary' : formatPrice(Number(order.shipping_fee))}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#6B1E2E] pt-2 border-t-[0.5px] border-[#C8A24A]/10">
                <span>Grand Total</span>
                <span className="text-base font-serif font-bold text-[#6B1E2E]">{formatPrice(Number(order.total))}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/account">
                <Button variant="secondary" size="sm">Manage Orders</Button>
              </Link>
              <Link to="/">
                <Button variant="primary" size="sm">Continue Browsing</Button>
              </Link>
            </div>

          </div>
        )}

        {/* Footer Microcopy */}
        <p className="text-center font-sans text-[9px] text-[#C8A24A] tracking-widest uppercase">
          A receipt details overview has been dispatched to your email snapshot address
        </p>

      </div>
    </div>
  );
};

export default OrderConfirmation;
