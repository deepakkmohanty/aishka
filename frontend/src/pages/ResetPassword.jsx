import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate matching passwords here
    if (formData.password === formData.confirmPassword) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-20 px-6">
      <div className="max-w-md w-full relative">
        
        {/* Subtle decorative brackets */}
        <div className="absolute -top-10 -left-10 w-8 h-8 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A] opacity-50 hidden sm:block"></div>
        <div className="absolute -bottom-10 -right-10 w-8 h-8 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A] opacity-50 hidden sm:block"></div>

        <div className="text-center mb-12">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] mb-4">
            Account Recovery
          </span>
          <h1 className="text-3xl sm:text-4xl text-[#6B1E2E] font-serif tracking-tight mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Create New <span className="italic text-[#C8A24A]">Key</span>
          </h1>
          <p className="text-[#6B1E2E]/70 font-sans text-[13px] leading-relaxed">
            Please enter your new private key below.
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
            <div className="relative group">
              <label htmlFor="password" className="block font-sans text-[9px] uppercase tracking-[0.3em] text-[#C8A24A] font-semibold mb-3 transition-colors duration-500 group-focus-within:text-[#6B1E2E] text-center">
                New Password
              </label>
              <input 
                type="password" 
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-transparent border-0 border-b-[0.5px] border-[#E8C766]/50 text-[#6B1E2E] font-serif text-xl px-0 pb-3 focus:ring-0 focus:outline-none focus:border-[#6B1E2E] transition-colors duration-500 placeholder:text-[#6B1E2E]/20 placeholder:italic placeholder:font-serif text-center"
                placeholder="Secure your account"
              />
            </div>

            <div className="relative group">
              <label htmlFor="confirmPassword" className="block font-sans text-[9px] uppercase tracking-[0.3em] text-[#C8A24A] font-semibold mb-3 transition-colors duration-500 group-focus-within:text-[#6B1E2E] text-center">
                Confirm New Password
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-transparent border-0 border-b-[0.5px] border-[#E8C766]/50 text-[#6B1E2E] font-serif text-xl px-0 pb-3 focus:ring-0 focus:outline-none focus:border-[#6B1E2E] transition-colors duration-500 placeholder:text-[#6B1E2E]/20 placeholder:italic placeholder:font-serif text-center"
                placeholder="Verify new key"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center px-10 py-4 border-[0.5px] border-[#6B1E2E] text-[#F5EDE2] font-sans text-[11px] uppercase tracking-[0.25em] bg-[#6B1E2E] hover:bg-transparent hover:text-[#6B1E2E] transition-all duration-500 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A24A]"
              >
                Update Password
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 border-[0.5px] border-[#C8A24A]/30 bg-white/30">
            <h3 className="text-xl text-[#6B1E2E] font-serif tracking-wide italic mb-4">Password Updated</h3>
            <Link to="/login" className="inline-flex items-center justify-center px-8 py-3 border border-[#C8A24A] text-[#1A070B] font-sans text-[10px] uppercase tracking-[0.25em] bg-[#C8A24A] hover:bg-transparent hover:text-[#C8A24A] transition-all duration-500 font-bold shadow-[0_0_20px_rgba(200,162,74,0.3)]">
              Sign In Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
