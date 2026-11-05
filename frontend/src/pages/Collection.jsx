import React, { useState } from 'react';
import ShopHeader from '../components/ShopHeader';
import ShopFilters from '../components/ShopFilters';
import ProductGrid from '../components/ProductGrid';

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('All Pieces');
  const [activeSort, setActiveSort] = useState('Newest Arrivals');

  return (
    <>
      <ShopHeader />
      <ShopFilters 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        activeSort={activeSort}
        setActiveSort={setActiveSort}
      />
      <ProductGrid 
        activeCategory={activeCategory} 
        activeSort={activeSort} 
      />
    </>
  );
};

export default Collection;
