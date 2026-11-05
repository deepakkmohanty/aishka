import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import Logo from '../components/Logo';
import heroImg  from '../assets/hero_realistic_model.png';

// ━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED UTILS (local copy — same as LoginPage)
// ━━━━━━━━━━━━━━━━━━━━━━━━
const CLIP = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

const Sparkle = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
    className={`text-[#C8A24A] ${className}`} aria-hidden="true">
    <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
  </svg>
);

// Gold underline field with optional show/hide password toggle
const LineField = ({ id, label, type = 'text', required, value, onChange, placeholder, disabled }) => {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 group">
      <label
        htmlFor={id}
        className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B1E2E]/55 group-focus-within:text-[#C8A24A] transition-colors duration-300"
      >
        {label}{required && <span className="text-[#C8A24A] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={isPassword ? 'new-password' : undefined}
          className="w-full bg-transparent border-0 border-b border-[#C8A24A]/30 focus:border-[#C8A24A] outline-none py-2.5 pr-8 font-sans text-sm text-[#6B1E2E] placeholder-[#6B1E2E]/25 transition-colors duration-300 disabled:opacity-50"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(v => !v)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-[#6B1E2E]/40 hover:text-[#C8A24A] transition-colors focus-visible:outline-none"
            tabIndex={-1}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━
// RIGHT PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━
const RightPanel = () => (
  <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#1A070B]">
    <img
      src={heroImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-85"
    />
    <div
      className="absolute inset-0"
      style={{ background: 'linear-gradient(135deg, rgba(107,30,46,0.82) 0%, rgba(26,7,11,0.75) 100%)' }}
    />

    {/* Chamfered inset border */}
    <div className="absolute inset-4 pointer-events-none">
      <svg className="w-full h-full stroke-[#C8A24A]/30 fill-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points="0,4 4,0 96,0 100,4 100,96 96,100 4,100 0,96"
          vectorEffect="non-scaling-stroke" style={{ strokeWidth: '0.8px' }} />
      </svg>
    </div>

    <Sparkle size={12} className="absolute top-10 right-10 opacity-50 animate-pulse" />
    <Sparkle size={8}  className="absolute top-24 left-10 opacity-35 animate-pulse" style={{ animationDelay: '1.1s' }} />
    <Sparkle size={10} className="absolute bottom-20 right-14 opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />

    <div className="absolute bottom-14 left-12 right-12 z-10">
      <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-[#C8A24A] mb-4 opacity-80">
        Heritage & Craft
      </span>
      <p
        className="text-[#F5EDE2] font-serif text-xl md:text-2xl tracking-wide leading-relaxed italic"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        "Begin your journey into a world of timeless Indian silver."
      </p>
      <div className="w-10 h-px bg-[#C8A24A]/60 mt-6" />
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━
// PASSWORD STRENGTH METER
// ━━━━━━━━━━━━━━━━━━━━━━━━
const getStrength = (pw) => {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
};

const PasswordStrength = ({ password }) => {
  const s = getStrength(password);
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colours = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-green-500'];
  if (!password) return null;
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex gap-1 flex-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${i <= s ? colours[s] : 'bg-[#6B1E2E]/15'}`} />
        ))}
      </div>
      <span className="font-sans text-[9px] text-[#6B1E2E]/50 w-10 text-right">{labels[s]}</span>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━
// REGISTER PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━
const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name    = 'Please enter your full name.';
    if (!form.email.trim()) e.email   = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password)     e.password = 'Please create a password.';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
    else if (!/\d/.test(form.password)) e.password = 'Password must contain at least one number.';
    if (!form.confirm)      e.confirm  = 'Please confirm your password.';
    else if (form.confirm !== form.password) e.confirm = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setApiError('');
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      addToast('Account created successfully!', 'success');
      navigate('/account');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(msg);
      addToast(msg, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* ━━━ LEFT: FORM ━━━ */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-14 md:px-20 py-14 relative overflow-y-auto">

        {/* Corner accents */}
        <div className="absolute top-8 left-8 w-10 h-10 border-t border-l border-[#C8A24A]/35 hidden sm:block" />
        <div className="absolute bottom-8 right-8 w-10 h-10 border-b border-r border-[#C8A24A]/35 hidden sm:block" />

        <div className="max-w-md w-full mx-auto">

          {/* Logo */}
          <div className="flex justify-center mb-10">
            <Link to="/">
              <Logo className="h-12" />
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-9">
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-3">
              ✦ Join Aishka ✦
            </span>
            <h1
              className="font-serif text-[#6B1E2E] text-3xl md:text-4xl leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              Create Your Account
            </h1>
            <p className="font-sans text-sm text-[#6B1E2E]/60 font-light">
              Save your wishlist, track orders and unlock member-only pieces.
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 font-sans text-xs leading-relaxed text-center">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {/* Full Name */}
            <div>
              <LineField
                id="reg-name" label="Full Name" required
                value={form.name} onChange={set('name')}
                placeholder="Your full name" disabled={isLoading}
              />
              {errors.name && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <LineField
                id="reg-email" label="Email Address" type="email" required
                value={form.email} onChange={set('email')}
                placeholder="you@example.com" disabled={isLoading}
              />
              {errors.email && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <LineField
                id="reg-password" label="Password" type="password" required
                value={form.password} onChange={set('password')}
                placeholder="Min. 8 characters" disabled={isLoading}
              />
              <PasswordStrength password={form.password} />
              {errors.password && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <LineField
                id="reg-confirm" label="Confirm Password" type="password" required
                value={form.confirm} onChange={set('confirm')}
                placeholder="Re-enter your password" disabled={isLoading}
              />
              {errors.confirm && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.confirm}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{ clipPath: CLIP }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity=".3"/><path d="M12 2a10 10 0 0 1 10 10"/>
                  </svg>
                  Creating Account…
                </>
              ) : 'Create Account →'}
            </button>

            {/* Privacy note */}
            <p className="font-sans text-[10px] text-[#6B1E2E]/40 text-center leading-relaxed -mt-1">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="hover:text-[#C8A24A] transition-colors underline underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="hover:text-[#C8A24A] transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>.
            </p>
          </form>

          {/* Switch to login */}
          <p className="text-center font-sans text-xs text-[#6B1E2E]/60 mt-7">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#C8A24A] font-bold hover:underline underline-offset-4 transition-colors"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

      {/* ━━━ RIGHT: BRAND VISUAL ━━━ */}
      <RightPanel />
    </div>
  );
};

export default RegisterPage;
