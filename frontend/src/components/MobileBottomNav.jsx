import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';

const MobileBottomNav = ({ onCartClick, onSearchClick }) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const cartCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const wishlistCount = wishlist?.length || 0;
  const accountPath = user ? '/account' : '/login';

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/80 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-50 px-4 py-2 flex items-center justify-around">
      {/* HOME */}
      <Link
        to="/"
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
          isActive('/') ? 'text-[#7A1213]' : 'text-gray-600 hover:text-[#7A1213]'
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider">HOME</span>
      </Link>

      {/* ACCOUNT */}
      <Link
        to={accountPath}
        className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors duration-200 ${
          isActive('/account') || isActive('/login') || isActive('/register') ? 'text-[#7A1213]' : 'text-gray-600 hover:text-[#7A1213]'
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider">ACCOUNT</span>
      </Link>

      {/* WISHLIST */}
      <Link
        to="/wishlist"
        className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors duration-200 ${
          isActive('/wishlist') ? 'text-[#7A1213]' : 'text-gray-600 hover:text-[#7A1213]'
        }`}
      >
        <div className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#7A1213] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              {wishlistCount}
            </span>
          )}
        </div>
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider">WISHLIST</span>
      </Link>

      {/* CART */}
      <button
        onClick={onCartClick}
        className="flex flex-col items-center justify-center flex-1 py-1 relative text-gray-600 hover:text-[#7A1213] cursor-pointer"
      >
        <div className="relative">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#7A1213] text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider">CART</span>
      </button>

      {/* SEARCH */}
      <button
        onClick={onSearchClick}
        className="flex flex-col items-center justify-center flex-1 py-1 text-gray-600 hover:text-[#7A1213] cursor-pointer"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-0.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className="text-[9px] font-sans font-bold uppercase tracking-wider">SEARCH</span>
      </button>
    </div>
  );
};

export default MobileBottomNav;
