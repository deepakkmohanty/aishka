import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import Logo from '../components/Logo';
import heroImg   from '../assets/hero_realistic_model.png';
import craftsmanshipImg from '../assets/craftsmanship.png';

// ━━━━━━━━━━━━━━━━━━━━━━━━
// SHARED UTILS
// ━━━━━━━━━━━━━━━━━━━━━━━━
const CLIP = 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)';

const Sparkle = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
    className={`text-[#C8A24A] ${className}`} aria-hidden="true">
    <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z" />
  </svg>
);

// Gold underline field
const LineField = ({ id, label, type = 'text', required, value, onChange, placeholder, disabled, rightLabel }) => {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type;

  return (
    <div className="flex flex-col gap-1.5 group">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B1E2E]/55 group-focus-within:text-[#C8A24A] transition-colors duration-300"
        >
          {label}{required && <span className="text-[#C8A24A] ml-0.5">*</span>}
        </label>
        {rightLabel}
      </div>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={isPassword ? 'current-password' : undefined}
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

// Google icon
const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━
// RIGHT PANEL — shared
// ━━━━━━━━━━━━━━━━━━━━━━━━
const RightPanel = ({ quote, eyebrow }) => (
  <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#1A070B]">
    {/* Photo */}
    <img
      src={heroImg}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover object-[center_30%] opacity-85"
    />
    {/* Overlay */}
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

    {/* Floating sparkles */}
    <Sparkle size={12} className="absolute top-10 right-10 opacity-50 animate-pulse" />
    <Sparkle size={8}  className="absolute top-24 left-10 opacity-35 animate-pulse" style={{ animationDelay: '1s' }} />
    <Sparkle size={10} className="absolute bottom-20 right-14 opacity-40 animate-pulse" style={{ animationDelay: '1.8s' }} />

    {/* Bottom text overlay */}
    <div className="absolute bottom-14 left-12 right-12 z-10">
      <span className="block font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-[#C8A24A] mb-4 opacity-80">
        {eyebrow}
      </span>
      <p
        className="text-[#F5EDE2] font-serif text-xl md:text-2xl tracking-wide leading-relaxed italic"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {quote}
      </p>
      {/* Gold hairline */}
      <div className="w-10 h-px bg-[#C8A24A]/60 mt-6" />
    </div>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━
// LOGIN PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━
const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { login } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.password) e.password = 'Please enter your password.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setApiError('');
    try {
      await login(form.email, form.password);
      addToast('Logged in successfully', 'success');
      const redirect = searchParams.get('redirect') || '/account';
      navigate(redirect);
    } catch (err) {
      const msg = err.response?.data?.message || 'Invalid email or password';
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
          <div className="text-center mb-10">
            <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-[#C8A24A] mb-3">
              ✦ Member Access ✦
            </span>
            <h1
              className="font-serif text-[#6B1E2E] text-3xl md:text-4xl leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
            >
              Welcome Back
            </h1>
            <p className="font-sans text-sm text-[#6B1E2E]/60 font-light">
              Sign in to your Aishka account
            </p>
          </div>

          {/* API Error */}
          {apiError && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-700 font-sans text-xs leading-relaxed text-center">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

            {/* Email */}
            <div>
              <LineField
                id="login-email" label="Email Address" type="email" required
                value={form.email} onChange={set('email')}
                placeholder="you@example.com" disabled={isLoading}
              />
              {errors.email && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <LineField
                id="login-password" label="Password" type="password" required
                value={form.password} onChange={set('password')}
                placeholder="Your password" disabled={isLoading}
                rightLabel={
                  <Link
                    to="/forgot-password"
                    className="font-sans text-[9px] text-[#6B1E2E]/55 hover:text-[#C8A24A] transition-colors uppercase tracking-[0.15em]"
                  >
                    Forgot password?
                  </Link>
                }
              />
              {errors.password && <p className="font-sans text-[10px] text-red-600/75 mt-1">{errors.password}</p>}
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#E8C766] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ clipPath: CLIP }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity=".3"/><path d="M12 2a10 10 0 0 1 10 10"/>
                  </svg>
                  Signing In…
                </>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Switch to register */}
          <p className="text-center font-sans text-xs text-[#6B1E2E]/60 mt-8">
            New here?{' '}
            <Link
              to="/register"
              className="text-[#C8A24A] font-bold hover:underline underline-offset-4 transition-colors"
            >
              Create an account
            </Link>
          </p>

        </div>
      </div>

      {/* ━━━ RIGHT: BRAND VISUAL ━━━ */}
      <RightPanel
        eyebrow="Exclusive Access"
        quote="&ldquo;Curate your collection and discover pieces that speak to your story.&rdquo;"
      />
    </div>
  );
};

export default LoginPage;
