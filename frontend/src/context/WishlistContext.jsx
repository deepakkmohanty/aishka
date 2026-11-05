import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize product into the stored shape { id, product: {...} }
  const toItem = (product) => ({
    id: `wish-${product.id}-${Date.now()}`,
    product: {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      discount_price: product.discount_price ? Number(product.discount_price) : null,
      image: product.images?.[0] || product.image || '',
      audience: product.audience || '',
    },
  });

  const resolveId = (item) => item?.product?.id ?? item?.id ?? null;

  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('aishka_wishlist') || '[]');
      setWishlist(local);
    } catch {
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleWishlist = (product) => {
    if (!product) return;
    const productId = product.id;
    const alreadyIn = wishlist.some(item => resolveId(item) === productId);

    const updated = alreadyIn
      ? wishlist.filter(item => resolveId(item) !== productId)
      : [...wishlist, toItem(product)];

    setWishlist(updated);
    try {
      localStorage.setItem('aishka_wishlist', JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save wishlist locally:', err);
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some(item => resolveId(item) === productId);

  return (
    <WishlistContext.Provider value={{ wishlist, loading, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
