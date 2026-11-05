import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Mock API call
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
            Reset Your <span className="italic text-[#C8A24A]">Key</span>
          </h1>
          <p className="text-[#6B1E2E]/70 font-sans text-[13px] leading-relaxed">
            Enter the email address associated with your portfolio, and we will send you secure instructions to reset your password.
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
            <div className="relative group">
              <label htmlFor="email" className="block font-sans text-[9px] uppercase tracking-[0.3em] text-[#C8A24A] font-semibold mb-3 transition-colors duration-500 group-focus-within:text-[#6B1E2E] text-center">
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b-[0.5px] border-[#E8C766]/50 text-[#6B1E2E] font-serif text-xl px-0 pb-3 focus:ring-0 focus:outline-none focus:border-[#6B1E2E] transition-colors duration-500 placeholder:text-[#6B1E2E]/20 placeholder:italic placeholder:font-serif text-center"
                placeholder="Where should we send the link?"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center px-10 py-4 border-[0.5px] border-[#6B1E2E] text-[#F5EDE2] font-sans text-[11px] uppercase tracking-[0.25em] bg-[#6B1E2E] hover:bg-transparent hover:text-[#6B1E2E] transition-all duration-500 font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A24A]"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 border-[0.5px] border-[#C8A24A]/30 bg-white/30">
            <h3 className="text-xl text-[#6B1E2E] font-serif tracking-wide italic mb-2">Check your inbox</h3>
            <p className="text-[#6B1E2E]/70 font-sans text-[12px]">
              If an account exists for {email}, you will receive a reset link shortly.
            </p>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link to="/login" className="font-sans text-[10px] text-[#6B1E2E]/60 uppercase tracking-[0.2em] hover:text-[#C8A24A] transition-colors underline underline-offset-4">
            Return to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
