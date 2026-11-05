import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import offerModelImgDefault from '../assets/offer_model.png';

const OfferBanner = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await api.get('/content/section/offer_banner');
        if (res?.data?.success && res.data?.data?.content) {
          setData(res.data.data.content);
        }
      } catch (err) {
        console.error('OfferBanner: failed to load:', err.message);
      }
    };
    fetchOffer();
  }, []);

  const heading = data?.heading || 'Aishka';
  const offerText = data?.offer_text || 'get 10% off on your first order';
  const promoCode = data?.promo_code || 'AISHKA10';
  const validityText = data?.validity_text || 'Offer Valid till 15th May';
  const bannerImage = data?.banner_image || offerModelImgDefault;

  return (
    <section className="w-full bg-white py-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto overflow-hidden rounded-xl shadow-lg flex flex-col md:flex-row min-h-[340px] md:min-h-[400px]">
        
        {/* ━━━ LEFT COLUMN: PROMO INFO ━━━ */}
        <div className="flex-1 bg-gradient-to-br from-[#3D1A10] via-[#5C2B1C] to-[#2D120B] p-8 md:p-12 flex flex-col items-center justify-center text-center text-white relative">
          
          {/* Subtle Silk Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100 via-amber-900 to-black" />

          {/* Ornate Gold Scroll Top */}
          <div className="mb-2 select-none text-[#C8A24A]/70 flex items-center justify-center gap-1 text-xs">
            <span>✦ ━━━━</span>
            <span className="font-serif italic text-sm">✦</span>
            <span>━━━━ ✦</span>
          </div>

          {/* Brand Heading */}
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-wide text-white font-medium mb-1">
            {heading}
          </h3>
          
          {/* Decorative Divider */}
          <div className="w-16 h-[1px] bg-[#C8A24A]/40 mb-4" />

          {/* Offer Subtitle */}
          <p className="font-serif italic text-[#C8A24A] text-lg md:text-xl lg:text-2xl mb-6 font-light">
            {offerText}
          </p>

          {/* Promo Code Badge */}
          <div className="relative border border-[#C8A24A]/50 rounded-[20px] px-8 py-4 mb-6 max-w-[280px] bg-black/10 select-all">
            {/* Double Border Detail */}
            <div className="absolute inset-0.5 border border-[#C8A24A]/25 rounded-[18px] pointer-events-none" />
            
            <span className="block font-sans text-[10px] uppercase tracking-[0.25em] text-[#C8A24A]/80 mb-1">
              USE CODE
            </span>
            <span className="block font-serif text-3xl font-bold tracking-widest text-[#DFBA73] mb-1">
              {promoCode}
            </span>
            <span className="block font-sans text-[9px] uppercase tracking-[0.2em] text-[#C8A24A]/80">
              AT CHECKOUT
            </span>
          </div>

          {/* Shop Now Button */}
          <Link
            to="/collections"
            className="bg-gradient-to-r from-[#DFBA73] via-[#F6E7C1] to-[#A07A2B] text-[#3D1A10] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 mb-6"
          >
            SHOP NOW
          </Link>

          {/* Bottom Validity Text */}
          <div className="text-[11px] text-[#C8A24A]/90 font-light flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-[#C8A24A]/30"></span>
            <span>{validityText}</span>
            <span className="h-[1px] w-6 bg-[#C8A24A]/30"></span>
          </div>

        </div>

        {/* ━━━ RIGHT COLUMN: MODEL IMAGE ━━━ */}
        <div className="flex-1 relative min-h-[300px] md:min-h-full">
          <img
            src={bannerImage}
            alt="Aishka Elegant Model Collection"
            className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_15%]"
          />
          {/* Subtle shadow gradient overlay to blend into the left columns */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/20 to-transparent pointer-events-none hidden md:block" />
        </div>

      </div>
    </section>
  );
};

export default OfferBanner;
