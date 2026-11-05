import React, { useState } from 'react';
import api from '../utils/api';

const CLIP_PATH = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

const STATUS_FLOW = [
  { key: 'placed', title: 'Order Placed', desc: 'Your order has been successfully placed.' },
  { key: 'processing', title: 'Processing', desc: 'Order confirmed and is being processed.' },
  { key: 'packed', title: 'Packed', desc: 'Your items have been packed.' },
  { key: 'shipped', title: 'Shipped', desc: 'Handed over to our courier partner.' },
  { key: 'out_for_delivery', title: 'Out for Delivery', desc: 'Package is out for delivery.' },
  { key: 'delivered', title: 'Delivered', desc: 'Delivered to your address.' }
];

const TrackOrderPage = () => {
  const [query, setQuery] = useState('');
  const [orderInfo, setOrderInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setOrderInfo(null);
    try {
      const isOrderId = query.trim().startsWith('ORD-') || !isNaN(query.trim());
      const param = isOrderId ? `order_id=${query.trim()}` : `awb=${query.trim()}`;
      const res = await api.get(`/orders/track?${param}`);
      setOrderInfo(res.data.data.order);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Order not found. Please check your tracking details.');
    } finally {
      setLoading(false);
    }
  };

  // Compute steps dynamically
  let steps = [];
  let progressPercent = 0;

  if (orderInfo) {
    if (orderInfo.order_status === 'cancelled') {
      steps = [
        { title: 'Cancelled', desc: 'This order was cancelled.', date: new Date(orderInfo.date).toLocaleString(), status: 'active' }
      ];
    } else {
      const dbStatus = orderInfo.order_status.toLowerCase();
      let currentStatusIndex = STATUS_FLOW.findIndex(s => s.key === dbStatus);
      if (currentStatusIndex === -1) currentStatusIndex = 0;

      steps = STATUS_FLOW.map((s, idx) => {
        let statusState = 'pending';
        if (idx < currentStatusIndex) statusState = 'completed';
        if (idx === currentStatusIndex) statusState = 'active';
        if (dbStatus === 'delivered') statusState = 'completed';

        return {
          title: s.title,
          desc: s.desc,
          date: idx === 0 ? new Date(orderInfo.date).toLocaleString() : null,
          status: statusState
        };
      });
      progressPercent = dbStatus === 'delivered' ? 100 : (currentStatusIndex / (STATUS_FLOW.length - 1)) * 100;
    }
  }

  return (
    <div className="min-h-screen bg-white py-16 px-6 md:px-12 flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        
        {/* ━━━ HEADER SECTION ━━━ */}
        <div className="text-center mb-12">
          <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#C8A24A] block mb-4 animate-pulse">
            ✦ Real-Time Status ✦
          </span>
          <h1
            className="font-serif text-[#6B1E2E] text-4xl md:text-5xl font-normal tracking-wide mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Track Your Order
          </h1>
          <p className="font-sans text-sm text-[#6B1E2E]/65 max-w-md mx-auto leading-relaxed">
            Enter your Order ID or AWB number to view your delivery roadmap.
          </p>
        </div>

        {/* ━━━ TRACKING CARD ━━━ */}
        <div 
          className="w-full max-w-xl bg-white p-8 md:p-10 mb-10 transition-all duration-500 shadow-xl border border-[#C8A24A]/20"
          style={{ clipPath: CLIP_PATH }}
        >
          <form onSubmit={handleTrack} className="flex flex-col space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder=" "
                className="w-full bg-transparent font-sans text-sm text-[#6B1E2E] py-3.5 border-b border-[#C8A24A]/30 focus:border-[#C8A24A] focus:outline-none transition-colors peer placeholder-shown:border-[#C8A24A]/30"
                id="trackingInput"
                required
              />
              <label 
                htmlFor="trackingInput"
                className="absolute left-0 top-3.5 font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[#6B1E2E]/50 pointer-events-none transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:text-[#6B1E2E]/50 peer-focus:top-[-10px] peer-focus:text-[10px] peer-focus:text-[#C8A24A] peer-[:not(:placeholder-shown)]:top-[-10px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#C8A24A]"
              >
                Enter Order ID or AWB Number
              </label>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-xs font-semibold uppercase tracking-wider">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-all duration-300 relative overflow-hidden flex items-center justify-center"
              style={{ clipPath: 'polygon(0 8%, 4% 0, 96% 0, 100% 8%, 100% 92%, 96% 100%, 4% 100%, 0 92%)' }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-[#6B1E2E]" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching...</span>
                </div>
              ) : 'TRACK ORDER'}
            </button>
          </form>

          {/* Partner Tracking */}
          {orderInfo && orderInfo.tracking_url && (
            <div className="mt-8 pt-6 border-t border-[#C8A24A]/25 text-center">
              <p className="font-sans text-[11px] text-[#6B1E2E]/60 uppercase tracking-widest mb-4">
                Or track directly via our shipping partner:
              </p>
              <a
                href={orderInfo.tracking_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#C8A24A]/50 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B1E2E] hover:bg-[#C8A24A]/10 hover:border-[#C8A24A] transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                Track via Carrier
              </a>
            </div>
          )}
        </div>

        {/* ━━━ TIMELINE SECTION (RESULTS) ━━━ */}
        {orderInfo && (
          <div className="w-full bg-white p-8 md:p-12 shadow-xl border border-[#C8A24A]/20 transition-all duration-500 animate-fade-in" style={{ clipPath: CLIP_PATH }}>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#C8A24A]/20 pb-6 mb-10 gap-4">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A24A] mb-1">Order ID</p>
                <h3 className="font-serif text-[#6B1E2E] text-xl font-medium tracking-wide">#{orderInfo.id}</h3>
              </div>
              <div className="sm:text-right">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A24A] mb-1">AWB Number</p>
                <p className="font-sans text-xs text-[#6B1E2E] font-semibold">{orderInfo.awb_number || 'Pending'}</p>
              </div>
            </div>

            {/* Desktop Horizontal Stepper (hidden on mobile) */}
            <div className="hidden md:flex justify-between items-start relative w-full mb-6">
              
              {/* Stepper bar line */}
              <div className="absolute left-[8%] right-[8%] top-[14px] h-[2px] bg-[#6B1E2E]/10 z-0">
                <div 
                  className="h-full bg-[#6B1E2E] transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {steps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';

                return (
                  <div key={idx} className="flex flex-col items-center text-center relative z-10 w-[15%]">
                    
                    {/* Circle Indicator */}
                    <div 
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[#6B1E2E] text-[#F5EDE2]' 
                          : isActive 
                            ? 'bg-[#C8A24A] text-[#F5EDE2] shadow-[0_0_12px_rgba(200,162,74,0.6)] animate-pulse' 
                            : 'bg-white border-2 border-gray-400 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>

                    {/* Step Content */}
                    <h4 className={`font-sans text-[11px] font-bold uppercase tracking-wider mt-4 ${isActive ? 'text-[#C8A24A]' : 'text-[#6B1E2E]'}`}>
                      {step.title}
                    </h4>
                    {step.date && (
                      <span className="block font-sans text-[9px] text-[#6B1E2E]/50 mt-1">{step.date}</span>
                    )}
                    <p className="font-sans text-[10px] text-[#6B1E2E]/60 mt-2 max-w-[120px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Stepper (hidden on desktop) */}
            <div className="md:hidden flex flex-col relative w-full space-y-8 pl-8">
              
              {/* Stepper bar line */}
              <div className="absolute left-[14px] top-4 bottom-4 w-[2px] bg-[#6B1E2E]/10 z-0">
                <div 
                  className="w-full bg-[#6B1E2E] transition-all duration-1000"
                  style={{ height: `${progressPercent}%` }}
                />
              </div>

              {steps.map((step, idx) => {
                const isCompleted = step.status === 'completed';
                const isActive = step.status === 'active';

                return (
                  <div key={idx} className="flex gap-6 items-start relative z-10">
                    
                    {/* Circle Indicator */}
                    <div 
                      className={`absolute left-[-26px] w-[20px] h-[20px] rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted 
                          ? 'bg-[#6B1E2E] text-[#F5EDE2]' 
                          : isActive 
                            ? 'bg-[#C8A24A] text-[#F5EDE2] shadow-[0_0_8px_rgba(200,162,74,0.6)] animate-pulse' 
                            : 'bg-white border-2 border-gray-400 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <span className="w-1 h-1 rounded-full bg-current" />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between mb-1">
                        <h4 className={`font-sans text-xs font-bold uppercase tracking-wider ${isActive ? 'text-[#C8A24A]' : 'text-[#6B1E2E]'}`}>
                          {step.title}
                        </h4>
                        {step.date && (
                          <span className="font-sans text-[9px] text-[#6B1E2E]/50">{step.date}</span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-[#6B1E2E]/60 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrderPage;

