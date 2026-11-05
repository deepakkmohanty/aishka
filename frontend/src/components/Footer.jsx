import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Logo from './Logo';

const Footer = () => {
  const [nlEmail, setNlEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);
  const [nlError, setNlError] = useState('');
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    const fetchFooterMetadata = async () => {
      try {
        const response = await api.get('/content/section/top_bar');
        if (response?.data?.success && response.data?.data?.content) {
          setMetadata(response.data.data.content);
        }
      } catch (err) {
        console.error('Footer failed to load metadata:', err.message);
      }
    };
    fetchFooterMetadata();
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!nlEmail.trim()) return;
    setNlLoading(true);
    setNlError('');
    try {
      await api.post('/newsletter/subscribe', { email: nlEmail.trim() });
      setNlSuccess(true);
      setNlEmail('');
      setTimeout(() => setNlSuccess(false), 5000);
    } catch (err) {
      setNlError(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setNlLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#7A1213] text-[#F5EDE2] font-sans pt-16 pb-6 px-6 md:px-12 lg:px-20 relative">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ━━━ TOP 4-COLUMN LAYOUT ━━━ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start">
            {/* Real Logo */}
            <div className="mb-6 select-none bg-white/95 p-3 rounded-lg max-w-[240px] shadow-sm">
              <Logo className="h-10" />
            </div>

            <p className="text-xs sm:text-[13px] text-[#F5EDE2]/85 leading-relaxed mb-6 font-light">
              Welcome to AISHKA, a premium jewellery brand specializing in 925 Sterling Silver as well as handcrafted and fashion jewellery. We promise beautiful, quality-checked jewellery that fits real, everyday life.
            </p>

            <div className="text-xs sm:text-[13px] text-[#F5EDE2]/90 space-y-1.5 font-sans">
              <p className="leading-relaxed">
                <span className="font-semibold text-[#EDE0CB]">Address:</span>{" "}
                {metadata?.address || "Office No. 2, Nidhay Complex, Pushkardham Road, Opp. Pushkardham Society, University Road, Rajkot, Gujarat - 360005"}
              </p>
              <p><span className="font-semibold text-[#EDE0CB]">Phone:</span> {metadata?.phone || "+91 9106702473"}</p>
              <p><span className="font-semibold text-[#EDE0CB]">Email:</span> {metadata?.email || "jewelsamrat@outlook.com"}</p>
            </div>
          </div>

          {/* Column 2: Our Company */}
          <div className="flex flex-col items-start lg:pl-10">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#EDE0CB] mb-6">
              OUR COMPANY
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#F5EDE2]/80 font-light">
              <li><Link to="/" className="hover:text-white hover:underline underline-offset-4 transition-colors">Home</Link></li>
              <li><Link to="/collections" className="hover:text-white hover:underline underline-offset-4 transition-colors">Shop</Link></li>
              <li><Link to="/about" className="hover:text-white hover:underline underline-offset-4 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline underline-offset-4 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col items-start">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#EDE0CB] mb-6">
              CUSTOMER SERVICE
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-[#F5EDE2]/80 font-light">
              <li><Link to="/policies/privacy-policy" className="hover:text-white hover:underline underline-offset-4 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/policies/refund-policy" className="hover:text-white hover:underline underline-offset-4 transition-colors">Return & Refund Policy</Link></li>
              <li><Link to="/policies/shipping-policy" className="hover:text-white hover:underline underline-offset-4 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/policies/cancellation-policy" className="hover:text-white hover:underline underline-offset-4 transition-colors">Cancellation Policy</Link></li>
              <li><Link to="/policies/terms-of-service" className="hover:text-white hover:underline underline-offset-4 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/policies/payment-options" className="hover:text-white hover:underline underline-offset-4 transition-colors">Payment Options</Link></li>
              <li><Link to="/care-guide" className="hover:text-white hover:underline underline-offset-4 transition-colors">Jewellery Care Guide</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white hover:underline underline-offset-4 transition-colors">Product Disclaimer</Link></li>
              <li><Link to="/faqs" className="hover:text-white hover:underline underline-offset-4 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col items-start">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#EDE0CB] mb-6">
              SUBSCRIBE TO AISHKA
            </h4>
            <p className="text-xs sm:text-[13px] text-[#F5EDE2]/80 leading-relaxed mb-6 font-light">
              Get updates on new launches, exclusive deals, and styling tips delivered to your inbox. Stay stylish, golden.
            </p>

            {/* Form */}
            {nlSuccess ? (
              <p className="text-[#EDE0CB] text-xs font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="w-full flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  disabled={nlLoading}
                  required
                  className="w-full bg-transparent border border-[#EDE0CB]/40 rounded px-4 py-2 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={nlLoading}
                  className="bg-white text-[#7A1213] font-sans font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded hover:bg-white transition-colors self-start cursor-pointer disabled:opacity-50"
                >
                  {nlLoading ? '...' : 'SUBSCRIBE'}
                </button>
              </form>
            )}

            {/* Social Icons */}
            <div className="flex items-center space-x-5 mt-6">
              {metadata?.facebook_url && (
                <a href={metadata.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-[#F5EDE2]/80 hover:text-white transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
              )}
              {metadata?.instagram_url && (
                <a href={metadata.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#F5EDE2]/80 hover:text-white transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {metadata?.youtube_url && (
                <a href={metadata.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-[#F5EDE2]/80 hover:text-white transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {metadata?.whatsapp_number && (
                <a 
                  href={metadata.whatsapp_number.startsWith('http') ? metadata.whatsapp_number : `https://wa.me/${metadata.whatsapp_number.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="WhatsApp" 
                  className="text-[#F5EDE2]/80 hover:text-white transition-colors"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.957.01c3.178.001 6.165 1.24 8.41 3.487 2.245 2.246 3.482 5.232 3.48 8.411-.004 6.557-5.34 11.895-11.901 11.895-2.008-.001-3.978-.508-5.714-1.478L0 24zm6.305-1.654c1.656.982 3.456 1.498 5.603 1.499h.005c5.449 0 9.882-4.433 9.885-9.883.002-2.641-1.026-5.124-2.893-6.993A9.824 9.824 0 0011.959 2.05c-5.45 0-9.884 4.434-9.887 9.885-.001 2.096.547 4.142 1.588 5.945l-.998 3.648 3.741-.982z"/></svg>
                </a>
              )}
            </div>
          </div>

        </div>



        {/* ━━━ BOTTOM COPYRIGHT & SCROLL TO TOP ━━━ */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-[11px] sm:text-xs text-[#F5EDE2]/70 font-light font-sans tracking-wide">
            © 2026 Aishka. All Rights Reserved.
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#C8A24A]/90 text-white flex items-center justify-center shadow-lg hover:bg-[#C8A24A] transition-all duration-300 transform hover:scale-105 cursor-pointer"
            aria-label="Scroll to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
