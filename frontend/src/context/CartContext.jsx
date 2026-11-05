import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const localCart = JSON.parse(localStorage.getItem('guestCart') || '{"items":[],"subtotal":0}');
      setCart(localCart);
    } catch {
      setCart({ items: [], subtotal: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  const recalculateCart = (items) => {
    let subtotal = 0;
    items.forEach(item => {
      const activePrice = Number(item.product?.discount_price || item.product?.price || 0);
      const additionalPrice = Number(item.variant?.additional_price || 0);
      subtotal += (activePrice + additionalPrice) * item.quantity;
    });
    const newCart = { items, subtotal };
    setCart(newCart);
    localStorage.setItem('guestCart', JSON.stringify(newCart));
  };

  const addToCart = (product, quantity = 1, variant = null) => {
    let items = [...cart.items];
    const variantId = variant ? variant.id : null;
    const index = items.findIndex(
      i => i.product.id === product.id && 
      (!variantId || (i.variant && i.variant.id === variantId))
    );

    if (index > -1) {
      items[index].quantity += quantity;
    } else {
      items.push({
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: Number(product.price),
          discount_price: product.discount_price ? Number(product.discount_price) : null,
          image: product.images?.[0] || product.image || '',
          stock: product.stock
        },
        variant: variant ? {
          id: variant.id,
          size: variant.name,
          additional_price: Number(variant.price || product.price) - Number(product.discount_price || product.price),
          stock: variant.stock
        } : null,
        quantity
      });
    }
    recalculateCart(items);
  };

  const updateCart = (cartItemId, quantity) => {
    let items = [...cart.items];
    const index = items.findIndex(i => i.id === cartItemId);
    if (index > -1) {
      if (quantity <= 0) {
        items = items.filter(i => i.id !== cartItemId);
      } else {
        items[index].quantity = quantity;
      }
      recalculateCart(items);
    }
  };

  const removeFromCart = (cartItemId) => {
    const items = cart.items.filter(i => i.id !== cartItemId);
    recalculateCart(items);
  };

  const clearCart = () => {
    setCart({ items: [], subtotal: 0 });
    localStorage.removeItem('guestCart');
  };

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
