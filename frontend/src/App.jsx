import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Bespoke from './pages/Bespoke';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrderPage from './pages/TrackOrderPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsOfService from './pages/TermsOfService';
import CancellationPolicy from './pages/CancellationPolicy';
import PaymentOptions from './pages/PaymentOptions';
import CareGuide from './pages/CareGuide';
import Disclaimer from './pages/Disclaimer';
import FAQPage from './pages/FAQPage';
import SearchOverlay from './components/SearchOverlay';
import DesignSystem from './pages/DesignSystem';
import SizeChart from './pages/SizeChart';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastProvider } from './components/ui/Toast';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen bg-white flex flex-col pb-16 lg:pb-0">
          <Navbar onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/collections" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/wishlist"
                element={
                  <ProtectedRoute>
                    <Wishlist />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/bespoke" element={<Bespoke />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
              <Route path="/track-order" element={<TrackOrderPage />} />
              <Route path="/size-chart" element={<SizeChart />} />
              <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/policies/refund-policy" element={<RefundPolicy />} />
              <Route path="/policies/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/policies/terms-of-service" element={<TermsOfService />} />
              <Route path="/policies/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/policies/payment-options" element={<PaymentOptions />} />
              <Route path="/care-guide" element={<CareGuide />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/faqs" element={<FAQPage />} />
              <Route path="/design-system" element={<DesignSystem />} />
            </Routes>
          </main>
          <Footer />
          <MobileBottomNav onCartClick={() => setIsCartOpen(true)} onSearchClick={() => setIsSearchOpen(true)} />
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-20 right-4 z-40 w-11 h-11 rounded-full bg-[#8C5E28] hover:bg-[#7A1213] text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none cursor-pointer"
              aria-label="Scroll to top"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5 12 12 5 19 12"></polyline>
              </svg>
            </button>
          )}
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

