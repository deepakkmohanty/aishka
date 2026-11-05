import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsService from '../services/products.service';
import ProductGrid from '../components/ProductGrid';
import QuickViewModal from '../components/QuickViewModal';
import FilterSidebar from '../components/FilterSidebar';
import ShopCategoryRow from '../components/ShopCategoryRow';
import bannerBgImg from '../assets/hero_slide_1.png';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Read URL params
  const forParam = searchParams.get('for') || 'all';
  const typeParam = searchParams.get('type') || 'all';
  const budgetParam = searchParams.get('budget') || '';
  const gemstoneParam = searchParams.get('gemstone') || '';
  const minPriceParam = searchParams.get('minPrice');
  const maxPriceParam = searchParams.get('maxPrice');
  const inStockParam = searchParams.get('inStock') === 'true';
  const onSaleParam = searchParams.get('onSale') === 'true';
  const sortParam = searchParams.get('sort') || 'newest';
  const pageParam = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      window.scrollTo(0, 0);
      try {
        const filters = {
          page: pageParam,
          limit: 12,
          sort: sortParam,
          inStock: inStockParam ? 'true' : undefined,
          gemstone: gemstoneParam || undefined,
        };

        if (forParam && forParam !== 'all') filters.audience = forParam;
        if (typeParam && typeParam !== 'all') filters.type = typeParam;

        if (budgetParam) {
          if (budgetParam === 'under-999') filters.maxPrice = 999;
          if (budgetParam === 'under-1999') filters.maxPrice = 1999;
          if (budgetParam === 'under-2999') filters.maxPrice = 2999;
          if (budgetParam === 'under-4999') filters.maxPrice = 4999;
          if (budgetParam === 'under-9999') filters.maxPrice = 9999;
          if (budgetParam === 'above-10000') filters.minPrice = 10000;
        } else {
          if (minPriceParam) filters.minPrice = minPriceParam;
          if (maxPriceParam) filters.maxPrice = maxPriceParam;
        }
        
        // Note: onSale doesn't have a direct backend filter in the prompt, but we can assume the backend would need it or we map it to maxPrice or ignore.
        
        const response = await productsService.getProducts(filters);
        if (response.success) {
          setProducts(response.data.products);
          setTotalProductsCount(response.data.total);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        console.error('Failed to fetch shop products', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchParams]);



  // State helper to update search params
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'All' || value === 'false') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (sortParam !== 'newest') newParams.set('sort', sortParam);
    setSearchParams(newParams);
  };

  // Determine active dynamic banner headers & breadcrumbs
  const getBannerInfo = () => {
    if (forParam && forParam !== 'all') {
      let subtext = "Explore elegant silver pieces";
      if (forParam === 'women') subtext = "Rings, Necklaces & Earrings";
      if (forParam === 'men') subtext = "Chains, Kada & Rings";
      if (forParam === 'kids') subtext = "Delicate Everyday Pieces";
      if (forParam === 'gifts') subtext = "For Every Occasion";

      return {
        heading: `FOR ${forParam.toUpperCase()}`,
        subtext,
        breadcrumb: `Home > Collections > ${forParam.charAt(0).toUpperCase() + forParam.slice(1)}`
      };
    }
    if (budgetParam) {
      let label = "Budget Pick";
      if (budgetParam === 'under-999') label = "Under ₹999";
      if (budgetParam === 'under-1999') label = "Under ₹1,999";
      if (budgetParam === 'under-2999') label = "Under ₹2,999";
      if (budgetParam === 'under-4999') label = "Under ₹4,999";
      if (budgetParam === 'under-9999') label = "Under ₹9,999";
      if (budgetParam === 'above-10000') label = "Above ₹10,000";
      
      return {
        heading: "BUDGET PICKS",
        subtext: "Great pieces within your budget",
        breadcrumb: `Home > Collections > ${label}`
      };
    }
    if (typeParam && typeParam !== 'all') {
      let label = typeParam.charAt(0).toUpperCase() + typeParam.slice(1);
      if (typeParam === 'necklaces-chains') label = "Necklaces & Chains";
      if (typeParam === 'kada-bracelets') label = "Kada & Bracelets";
      if (typeParam === 'sets-combos') label = "Sets & Combos";

      return {
        heading: label.toUpperCase(),
        subtext: `Explore our premium collection of ${label.toLowerCase()}`,
        breadcrumb: `Home > Collections > ${label}`
      };
    }
    if (gemstoneParam) {
      let label = gemstoneParam.charAt(0).toUpperCase() + gemstoneParam.slice(1);
      return {
        heading: `GEMSTONE: ${label.toUpperCase()}`,
        subtext: `Sought-after 925 silver set with authentic ${label.toLowerCase()}`,
        breadcrumb: `Home > Collections > ${label}`
      };
    }
    return {
      heading: "ALL JEWELLERY",
      subtext: "Explore our complete collection of gemstone silver pieces",
      breadcrumb: "Home > Collections > All"
    };
  };

  const banner = getBannerInfo();

  const hasActiveFilters = 
    (forParam && forParam !== 'all') || 
    (typeParam && typeParam !== 'all') || 
    budgetParam || 
    gemstoneParam || 
    minPriceParam || 
    maxPriceParam || 
    inStockParam || 
    onSaleParam;

  return (
    <div className="bg-white min-h-screen pb-16">
      
      {/* ━━━ CATEGORY SLIDER ━━━ */}
      <ShopCategoryRow 
        activeType={typeParam} 
        onSelectType={(type) => updateFilter('type', type)} 
      />

      {/* ━━━ BREADCRUMBS ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-6 text-xs text-gray-500 font-sans">
        Home | Shop All
      </div>

      {/* ━━━ MAIN CONTAINER ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* ━━━ DESKTOP SIDEBAR FILTERS (260px) ━━━ */}
          <div className="hidden lg:block">
            <FilterSidebar totalProductsCount={totalProductsCount} />
          </div>

          {/* ━━━ PRODUCT GRID & HEADER BAR ━━━ */}
          <main className="flex-1">
            
            {/* ━━━ SORT BAR & ITEM COUNT ━━━ */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C8A24A]/25 pb-4 mb-6">
              
              {/* Piece Counter */}
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#6B1E2E]/70">
                Showing {totalProductsCount} pieces
              </span>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-[#6B1E2E] text-[#F5EDE2] px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest clip-gemstone focus-visible:outline-none hover:bg-[#C8A24A] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filters & Sort
                </button>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#6B1E2E]/50">Sort:</span>
                  <select
                    value={sortParam}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="bg-transparent border border-[#C8A24A]/70 text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 focus-visible:outline-none clip-gemstone cursor-pointer hover:border-[#C8A24A] transition-colors"
                  >
                    <option value="newest" className="bg-white text-[#6B1E2E]">Newest First</option>
                    <option value="bestselling" className="bg-white text-[#6B1E2E]">Bestsellers</option>
                    <option value="price_asc" className="bg-white text-[#6B1E2E]">Price: Low to High</option>
                    <option value="price_desc" className="bg-white text-[#6B1E2E]">Price: High to Low</option>
                    <option value="popular" className="bg-white text-[#6B1E2E]">Most Popular</option>
                  </select>
                </div>
              </div>

            </div>

            <ProductGrid
              products={products}
              onQuickView={(p) => setQuickViewProduct(p)}
              onClearFilters={clearAllFilters}
              isLoading={isLoading}
              paginationType="pages"
              totalPages={totalPages}
              currentPage={pageParam}
              onPageChange={(page) => updateFilter('page', page)}
            />

          </main>

        </div>
      </div>

      {/* ━━━ MOBILE SLIDING FILTER DRAWER ━━━ */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay backdrop */}
          <div 
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col p-6 overflow-y-auto animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#6B1E2E]/10 pb-4 mb-6">
              <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#6B1E2E]">Filters & Sort</span>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-[#6B1E2E] hover:text-[#C8A24A]"
                aria-label="Close filters menu"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1">
              <FilterSidebar 
                totalProductsCount={totalProductsCount} 
                onApplyMobileFilters={() => setIsMobileFilterOpen(false)} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Standalone QuickView Modal for products on this page */}
      <QuickViewModal
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />

    </div>
  );
};

export default ShopPage;
