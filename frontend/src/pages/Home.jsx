import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoryIconRow from '../components/CategoryIconRow';
import NewArrivals from '../components/NewArrivals';
import ShopByBudget from '../components/ShopByBudget';
import OfferBanner from '../components/OfferBanner';
import VideoShowcase from '../components/VideoShowcase';
import FeaturedCollections from '../components/FeaturedCollections';
import BestSellers from '../components/BestSellers';
import Testimonials from '../components/Testimonials';
import InstagramShop from '../components/InstagramShop';
import QuickViewModal from '../components/QuickViewModal';

const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <>
      <HeroBanner />
      <CategoryIconRow />
      <NewArrivals onQuickView={(product) => setQuickViewProduct(product)} />
      <ShopByBudget />
      <OfferBanner />
      {/* <FeaturedCollections /> */}

      <VideoShowcase />
      <BestSellers onQuickView={(product) => setQuickViewProduct(product)} />
      <InstagramShop />
      <Testimonials />

      {/* Global QuickView Modal */}
      <QuickViewModal
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </>
  );
};

export default Home;
