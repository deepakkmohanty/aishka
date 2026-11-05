import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import categoriesService from '../services/categories.service';
import contentService from '../services/content.service';
import Logo from './Logo';

const Navbar = ({ onCartClick, onSearchClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileCollectionsOpen, setIsMobileCollectionsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const [announcementFade, setAnnouncementFade] = useState(true);
  const [categories, setCategories] = useState([]);
  const [metadata, setMetadata] = useState(null);

  const location = useLocation();
  const megaMenuRef = useRef(null);

  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  useEffect(() => {
    const fetchNavbarCategories = async () => {
      try {
        const response = await categoriesService.getCategories();
        if (response.success && response.data?.categories) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error('Navbar failed to load categories:', err.message);
      }
    };
    const fetchMetadata = async () => {
      try {
        const [annRes, topBarRes] = await Promise.all([
          contentService.getSectionContent('announcement_bar'),
          contentService.getSectionContent('top_bar')
        ]);

        const newMetadata = {};
        if (annRes?.data?.success && annRes.data?.data?.content) {
          newMetadata.announcement_bar = annRes.data.data.content;
        }
        if (topBarRes?.data?.success && topBarRes.data?.data?.content) {
          newMetadata.top_bar = topBarRes.data.data.content;
        }
        setMetadata(newMetadata);
      } catch (err) {
        console.error('Navbar failed to load metadata:', err.message);
      }
    };
    fetchNavbarCategories();
    fetchMetadata();
  }, []);

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;
  const accountPath = user ? '/account' : '/login';

  const announcements = metadata?.announcement_bar?.messages || [
    "✦ New Collection Arrived — Gemstone Studded Silver for Everyone ✦",
    "✦ 925 Sterling Silver · BIS Hallmarked · Handcrafted in Odisha ✦",
    "✦ Safe for Sensitive Skin · Nickel-Free · Authentic Gemstones ✦"
  ];

  // Auto-carousel for Layer 2 Announcement Bar (every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementFade(false);
      setTimeout(() => {
        setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
        setAnnouncementFade(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  // Scroll event listener to add box shadow to Layer 3
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setIsMobileCollectionsOpen(false);
  }, [location]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mega menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMegaMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLinkActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Our Collections', path: '#', hasMegaMenu: true },
    { label: 'All Products', path: '/collections' },
    { label: 'Bestsellers', path: '/collections?sort=bestselling' },
    { label: 'New Arrivals', path: '/collections?sort=newest' },
    { label: 'Size Chart', path: '/size-chart' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const contactPhone = metadata?.top_bar?.phone || "+91 9106702473";
  const contactEmail = metadata?.top_bar?.email || "jewelsamrat@outlook.com";
  const facebookUrl = metadata?.top_bar?.facebook_url || "https://facebook.com";
  const instagramUrl = metadata?.top_bar?.instagram_url || "https://instagram.com";
  const youtubeUrl = metadata?.top_bar?.youtube_url || "https://youtube.com";
  const whatsappNumber = metadata?.top_bar?.whatsapp_number || "919106702473";
  const whatsappLink = whatsappNumber ? (whatsappNumber.startsWith('http') ? whatsappNumber : `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`) : "https://wa.me/919106702473";

  const renderNavLink = (link) => {
    const active = isLinkActive(link.path);

    if (link.hasMegaMenu) {
      return (
        <div
          key={link.label}
          className="py-1"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <button
            onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
            className={`group relative flex items-center font-sans text-[13px] tracking-wider font-semibold py-1 focus-visible:outline-2 focus-visible:outline-[#7A1213] focus-visible:outline-offset-2 rounded cursor-pointer transition-colors duration-300
              ${active ? 'text-[#7A1213]' : 'text-gray-800 hover:text-[#7A1213]'}
            `}
          >
            <span>{link.label}</span>
            <svg className={`w-3 h-3 ml-1 transform transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180 text-[#7A1213]' : 'text-gray-800'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mega Menu Dropdown Panel */}
          <div
            ref={megaMenuRef}
            className={`absolute left-0 right-0 mx-auto top-full w-[800px] xl:w-[960px] bg-white border-t-2 border-[#7A1213] shadow-2xl p-6 z-50 flex flex-col gap-4 transition-all duration-300 origin-top
              ${isMegaMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto visible translate-y-0' : 'opacity-0 scale-y-95 pointer-events-none invisible -translate-y-2'}
            `}
          >
            {/* Invisible bridge to prevent mouseleave gap */}
            <div className="absolute -top-[30px] left-0 right-0 h-[30px] bg-transparent"></div>
            <div className="text-left">
              {/* Column 1 — Jewellery Types */}
              <div>
                <h3 className="font-sans uppercase text-[10px] tracking-[0.25em] font-bold text-[#7A1213] border-b border-gray-100 pb-2.5 mb-4">
                  Shop By Category
                </h3>
                <ul className="columns-3 gap-x-8 space-y-2">
                  {categories
                    .filter((c) => c.type === 'jewellery_type')
                    .map((subLink) => (
                      <li key={subLink.id} className="break-inside-avoid">
                        <Link
                          to={`/collections?type=${subLink.slug}`}
                          className="group/item flex items-center font-sans text-xs text-gray-800 hover:text-[#7A1213] transition-all duration-200 py-0.5"
                          onClick={() => setIsMegaMenuOpen(false)}
                        >
                          <span className="w-0 opacity-0 group-hover/item:w-3.5 group-hover/item:opacity-100 transition-all duration-300 ease-out inline-block mr-1 text-[#7A1213]">✦</span>
                          <span>{subLink.name}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* Wide Banner Image Area */}
            <Link
              to="/collections"
              onClick={() => setIsMegaMenuOpen(false)}
              className="w-full relative h-[80px] overflow-hidden group/banner block focus-visible:outline-2 focus-visible:outline-[#7A1213]"
              style={{ clipPath: 'polygon(0 4%, 4% 0, 96% 0, 100% 4%, 100% 96%, 96% 100%, 4% 100%, 0 96%)' }}
            >
              <img src="/images/mega-menu-banner.png" alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#7A1213]/70 via-[#7A1213]/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 text-white z-10">
                <span className="font-sans text-[8px] uppercase tracking-[0.35em] text-[#F5D061] mb-1 font-bold">LIMITED TIME OFFERS</span>
                <h4 className="font-serif text-xl tracking-wider mb-2 font-medium">Explore The Signature Gemstone Collections</h4>
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-semibold border-b border-white pb-0.5 group-hover/banner:text-[#F5D061] group-hover/banner:border-[#F5D061] transition-colors">
                  Discover Heritage Artistry
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.path}
        className={`group relative font-sans text-[13px] tracking-wider font-semibold py-1 focus-visible:outline-2 focus-visible:outline-offset-2 rounded transition-colors duration-300 whitespace-nowrap
          ${active ? 'text-[#7A1213]' : 'text-gray-800 hover:text-[#7A1213]'}
        `}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="w-full flex flex-col z-50 relative bg-white">



      {/* ━━━ LAYER 2: MAROON INFO BAR ━━━ */}
      <div className="w-full bg-[#7A1213] text-white py-2 px-6 text-xs flex justify-between items-center border-b border-[#7A1213]/10">
        {/* Left Side: Contact Info */}
        <div className="hidden md:flex items-center space-x-6 font-sans">
          <a href={"tel:" + contactPhone} className="flex items-center hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-1.25.75-2.25 1.875-2.25h1.38c.48 0 .89.34.98.81l.7 3.5c.08.38-.08.77-.4 1l-1.4 1.05a11.16 11.16 0 005.6 5.6l1.05-1.4c.23-.32.62-.48 1-.4l3.5.7c.47.09.81.5.81.98v1.38c0 1.125-1 1.875-2.25 1.875a15.75 15.75 0 01-15.75-15.75z" />
            </svg>
            {contactPhone}
          </a>
          <a href={"mailto:" + contactEmail} className="flex items-center hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {contactEmail}
          </a>
        </div>

        {/* Center: Offer text */}
        <div className="w-full md:w-auto text-center font-sans uppercase tracking-[0.15em] font-bold text-[10px] sm:text-xs">
          ✦ 925 STERLING & FINE FASHION JEWELLERY ✦
        </div>

        {/* Right Side: Social links */}
        <div className="hidden md:flex items-center space-x-4">
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded" aria-label="Facebook">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
            </svg>
          </a>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded" aria-label="Instagram">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded" aria-label="YouTube">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.519 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.869.508 9.388.508 9.388.508s7.519 0 9.388-.508a3.002 3.002 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5D061] transition-colors focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2 p-0.5 rounded" aria-label="WhatsApp">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.011 11.966.011c3.182.001 6.176 1.24 8.43 3.496 2.253 2.257 3.491 5.254 3.491 8.438 0 6.568-5.337 11.907-11.91 11.907-2.005-.001-3.978-.508-5.733-1.47L0 24zm6.59-4.846c1.6.95 3.197 1.48 4.78 1.48 5.176 0 9.384-4.208 9.386-9.385.002-2.507-.972-4.865-2.748-6.643a9.297 9.297 0 00-6.634-2.745c-5.18 0-9.39 4.21-9.393 9.388 0 1.708.455 3.376 1.32 4.887l-.99 3.615 3.7-.972zM17.43 14.19c-.3-.15-1.78-.88-2.06-.98-.28-.1-.49-.15-.69.15-.2.3-.77.98-.95 1.18-.18.2-.35.23-.65.08-1.02-.51-1.74-.83-2.47-1.46-.57-.49-.95-1.09-1.07-1.29-.12-.2-.01-.31.14-.46.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.69-1.67-.95-2.29-.25-.61-.51-.53-.69-.53-.18 0-.38-.02-.58-.02s-.53.07-.81.38c-.28.3-1.07 1.05-1.07 2.56s1.09 2.97 1.24 3.18c.15.2 2.15 3.29 5.22 4.61.73.31 1.3.5 1.74.64.74.23 1.41.2 1.94.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.29.17-1.42-.08-.13-.28-.2-.58-.35z" />
            </svg>
          </a>
        </div>
      </div>

      {/* ━━━ LAYER 3: MAIN NAVBAR ━━━ */}
      <nav
        className={`w-full sticky top-0 z-50 bg-white border-b border-gray-100 transition-all duration-500 py-1.5 lg:py-2 px-6 lg:px-12
          ${isScrolled ? 'shadow-md bg-white/95 backdrop-blur-md' : 'shadow-none'}
        `}
      >
        <div className="max-w-[1400px] mx-auto w-full flex items-center justify-between">
          {/* Left: Brand Logo (Left-aligned) */}
          <div className="flex-shrink-0 flex items-center">
            {/* Hamburger toggle (Mobile Only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden hover:text-[#7A1213] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 p-2 mr-2 rounded cursor-pointer"
              aria-label="Open navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link
              to="/"
              className="group focus-visible:outline-2 focus-visible:outline-[#7A1213] focus-visible:outline-offset-4 rounded p-1 transition-transform duration-300 hover:scale-[1.02] inline-block bg-transparent"
              aria-label="Aishka Home"
            >
              <Logo className="h-10 lg:h-12" />
            </Link>
          </div>

          {/* Center: Centered Navigation links (Desktop Only) */}
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 flex-grow px-6">
            {navLinks.map((link) => renderNavLink(link))}
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 text-gray-800 z-10">
            {/* Search Icon */}
            <button
              onClick={onSearchClick}
              className="hover:text-[#7A1213] hover:scale-105 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 p-2 rounded cursor-pointer"
              aria-label="Open Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            {/* Account Icon */}
            <Link
              to={accountPath}
              className="hover:text-[#7A1213] hover:scale-105 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 p-2 rounded inline-block"
              aria-label="Account Portal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>

            {/* Wishlist Icon with count badge */}
            <Link
              to="/wishlist"
              className="hover:text-[#7A1213] hover:scale-105 transition-all duration-300 relative focus-visible:outline-2 focus-visible:outline-offset-2 p-2 rounded inline-block"
              aria-label={`View Wishlist (${wishlistCount} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#7A1213] text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-sans font-bold border border-white shadow-sm select-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with count badge */}
            <button
              onClick={onCartClick}
              className="hover:text-[#7A1213] hover:scale-105 transition-all duration-300 relative focus-visible:outline-2 focus-visible:outline-offset-2 p-2 rounded cursor-pointer"
              aria-label={`Open Cart (${cartCount} items)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#7A1213] text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-sans font-bold border border-white shadow-sm select-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ━━━ MOBILE MENU OVERLAY (Full Screen) ━━━ */}
      <div
        className={`fixed inset-0 bg-white z-[100] flex flex-col justify-between transition-all duration-500 ease-in-out lg:hidden
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-6 pointer-events-none'}
        `}
      >
        {/* Soft layout borders inside mobile menu */}
        <div className="absolute inset-4 border border-[#C8A24A]/10 pointer-events-none rounded"></div>

        {/* Top Header */}
        <div className="flex justify-between items-center px-8 pt-8 z-10">
          <Logo className="h-10" />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[#6B1E2E] hover:text-[#C8A24A] focus-visible:outline-2 focus-visible:outline-offset-2 p-2 rounded cursor-pointer"
            aria-label="Close navigation menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links List */}
        <div className="flex-1 flex flex-col justify-center px-8 space-y-6 z-10 overflow-y-auto max-h-[60vh] py-6 scrollbar-hide">
          {navLinks.map((link, index) => {
            const active = isLinkActive(link.path);
            const delayStyle = { transitionDelay: `${index * 50}ms` };

            if (link.hasMegaMenu) {
              return (
                <div
                  key={link.label}
                  className={`w-full transition-all duration-500 transform ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                  style={delayStyle}
                >
                  <button
                    onClick={() => setIsMobileCollectionsOpen(!isMobileCollectionsOpen)}
                    className={`w-full flex items-center justify-between font-serif text-3xl tracking-wider text-left py-1 focus-visible:outline-2 rounded
                      ${active ? 'text-[#C8A24A]' : 'text-[#6B1E2E]'}
                    `}
                  >
                    <span>{link.label}</span>
                    <svg className={`w-6 h-6 transform transition-transform duration-300 ${isMobileCollectionsOpen ? 'rotate-180 text-[#C8A24A]' : 'text-[#6B1E2E]'}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Accordion Content */}
                  <div className={`transition-all duration-500 overflow-hidden ${isMobileCollectionsOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 border-l border-[#C8A24A]/30">
                      <h4 className="font-sans text-[8px] uppercase tracking-[0.3em] font-extrabold text-[#C8A24A] mb-2">Category</h4>
                      <ul className="space-y-2">
                        {categories
                          .filter((c) => c.type === 'jewellery_type')
                          .map((sub) => (
                            <li key={sub.id}>
                              <Link
                                to={`/collections?type=${sub.slug}`}
                                className="font-sans text-xs text-[#6B1E2E] hover:text-[#C8A24A]"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`block font-serif text-3xl tracking-wider transition-all duration-500 transform py-1
                  ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  ${active ? 'text-[#C8A24A]' : 'text-[#6B1E2E] hover:text-[#C8A24A]'}
                `}
                style={delayStyle}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Footer */}
        <div className="p-8 z-10 border-t border-[#C8A24A]/25 bg-white flex flex-col items-center text-center gap-4">
          <div className="flex flex-col gap-1 text-[11px] font-sans text-[#6B1E2E]">
            <a href="tel:+919106702473" className="hover:text-[#C8A24A]">+91 9106702473</a>
            <a href="mailto:jewelsamrat@outlook.com" className="hover:text-[#C8A24A]">jewelsamrat@outlook.com</a>
          </div>
          <div className="flex items-center space-x-6 text-[#6B1E2E]">
            <a href="https://facebook.com" className="hover:text-[#C8A24A] p-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg></a>
            <a href="https://instagram.com" className="hover:text-[#C8A24A] p-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" /></svg></a>
            <a href="https://youtube.com" className="hover:text-[#C8A24A] p-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg></a>
            <a href="https://wa.me/919106702473" className="hover:text-[#C8A24A] p-1"><svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 21l1.9-5.7a8.5 8.5 0 113.8 3.8z" /></svg></a>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <svg width="14" height="14" viewBox="0 0 16 16" className="text-[#C8A24A] animate-pulse"><path d="M8 0 L8.8 7.2 L16 8 L8.8 8.8 L8 16 L7.2 8.8 L0 8 L7.2 7.2 Z" fill="currentColor" /></svg>
            <span className="font-sans text-[#C8A24A] text-[9px] uppercase tracking-[0.25em] font-extrabold">AISHKA ATELIER</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
