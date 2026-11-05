import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productsService from '../services/products.service';
import ProductGallery from '../components/ProductGallery';
import ProductInfoPanel from '../components/ProductInfoPanel';
import RelatedProducts from '../components/RelatedProducts';
import ProductReviews from '../components/ProductReviews';
import ShopCategoryRow from '../components/ShopCategoryRow';
import { CartContext } from '../context/CartContext';
import { useToast } from '../components/ui/Toast';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { addToast } = useToast();

  const [showStickyCta, setShowStickyCta] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyCta(true);
      } else {
        setShowStickyCta(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await productsService.getProduct(slug);
        if (response.success && response.data?.product) {
          setProduct(response.data.product);
        } else {
          setError('Product not found.');
        }
      } catch (err) {
        setError('Product not found.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full bg-white min-h-[70vh] flex items-center justify-center">
        <span className="font-serif text-[#6B1E2E] text-2xl italic tracking-wider animate-pulse">Loading Details...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="w-full bg-white min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="font-serif text-[#6B1E2E] text-4xl">Product Not Found</h1>
        <Link to="/collections" className="text-[#C8A24A] font-sans text-xs uppercase tracking-widest border-b border-[#C8A24A] pb-1">Return to Collections</Link>
      </div>
    );
  }

  let productImages = product.images || [];

  return (
    <div className="w-full bg-white min-h-screen relative pb-16">

      {/* ━━━ TOP SECTION: Gallery + Info ━━━ */}
      <div className="pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-10 lg:pb-20 px-6 md:px-12 lg:px-24">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-sans text-gray-800 mb-8 max-w-[1400px] mx-auto">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="text-gray-400">|</span>
          <Link to="/collections" className="hover:underline">Shop All</Link>
          <span className="text-gray-400">|</span>
          <span className="text-gray-500 font-medium truncate max-w-[200px] md:max-w-md">{product.name}</span>
        </nav>

        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Side: Product Gallery Component */}
          <ProductGallery images={productImages} productName={product.name} />

          {/* Right Side: Product Info Component */}
          <div className="w-full lg:w-[50%] lg:sticky lg:top-24 h-fit">
            <ProductInfoPanel product={product} />
          </div>
        </div>

      </div>

      {/* ━━━ RELATED PRODUCTS ━━━ */}
      <RelatedProducts
        currentProduct={product}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* ━━━ CUSTOMER REVIEWS ━━━ */}
      <ProductReviews product={product} />

      {/* Sticky Bottom CTA Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-3 px-6 shadow-lg flex items-center justify-between transition-transform duration-300 ${showStickyCta ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex items-center gap-3">
          <img src={productImages[0]} alt={product.name} className="w-12 h-12 object-cover border border-gray-200 rounded" />
          <span className="font-sans text-sm font-semibold text-gray-800 hidden sm:inline-block max-w-xs truncate">{product.name}</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-gray-300 h-10 w-24 select-none">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors font-sans text-sm">-</button>
            <span className="flex-1 h-full flex items-center justify-center font-sans text-xs text-gray-800">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors font-sans text-sm">+</button>
          </div>
          <button 
            onClick={() => {
              addToCart(product, qty);
              addToast(`${product.name} added to cart!`, 'success');
            }}
            disabled={product.stock === 0}
            className={`bg-[#801818] text-white hover:bg-white hover:text-[#801818] border border-[#801818] font-sans text-xs font-bold uppercase tracking-wider h-10 px-6 transition-all`}
          >
            {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProductDetail;
