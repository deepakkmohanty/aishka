import { products } from '../data/products';
import { categories } from '../data/categories';
import { mockProfile, mockOrders } from '../data/account';

// Assets for banners & instagram
import heroImg from '../assets/hero_realistic_model.png';
import slide1 from '../assets/hero_slide_1.png';
import slide2 from '../assets/hero_slide_2.png';
import slide3 from '../assets/hero_slide_3.png';
import offerImg from '../assets/offer_model.png';
import craftsmanshipImg from '../assets/craftsmanship.png';
import braceletsImg from '../assets/bracelets.png';
import necklacesImg from '../assets/necklaces.png';
import ringsImg from '../assets/rings.png';
import earringsImg from '../assets/earrings.png';

// Storage helper
const getStored = (key, fallback) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn(`Could not save to localStorage: ${key}`, err);
  }
};

const initialAddresses = [
  {
    id: 1,
    label: 'Home',
    name: 'Priya Sharma',
    address_line: 'Flat 402, Saheed Nagar, Near KIIT Square',
    address: 'Flat 402, Saheed Nagar, Near KIIT Square',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751007',
    phone: '+91 98765 43210',
    is_default: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'Priya Sharma',
    address_line: '12, Janpath Road, Connaught Place',
    address: '12, Janpath Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 98765 43210',
    is_default: false,
  },
];

// Seed initial demo orders if empty
if (!localStorage.getItem('aishka_orders')) {
  setStored('aishka_orders', mockOrders.map(o => ({
    ...o,
    id: o.id,
    order_id: `ORD-${o.id}`,
    total: o.total,
    total_amount: o.total,
    status: o.status,
    order_status: o.status.toLowerCase(),
    delivery_status: o.status.toLowerCase(),
    created_at: o.date
  })));
}

// Seed addresses if empty
if (!localStorage.getItem('aishka_addresses')) {
  setStored('aishka_addresses', initialAddresses);
}

// Seed profile if empty
if (!localStorage.getItem('aishka_profile')) {
  setStored('aishka_profile', mockProfile);
}

export const mockBackendHandler = async (method, url, data = null, params = {}) => {
  // Normalize URL
  const cleanUrl = url.replace(/^[a-z]+:\/\/[^/]+/i, '').replace(/^\/api/, '');
  const [path, queryString] = cleanUrl.split('?');

  const queryParams = { ...params };
  if (queryString) {
    const searchParams = new URLSearchParams(queryString);
    for (const [key, value] of searchParams.entries()) {
      queryParams[key] = value;
    }
  }

  // 1. PRODUCTS
  if (path === '/products' || path.startsWith('/products/')) {
    if (path === '/products' || path === '/products/') {
      let filtered = [...products];

      if (queryParams.isNewArrival === 'true' || queryParams.isNewArrival === true) {
        filtered = filtered.filter(p => p.isNewArrival);
      }
      if (queryParams.isBestseller === 'true' || queryParams.isBestseller === true || queryParams.isBestSeller === true) {
        filtered = filtered.filter(p => p.isBestSeller);
      }
      if (queryParams.isFeatured === 'true' || queryParams.isFeatured === true) {
        filtered = filtered.filter(p => p.isFeatured);
      }
      if (queryParams.audience && queryParams.audience !== 'all') {
        filtered = filtered.filter(p => (p.audience || '').toLowerCase().includes(queryParams.audience.toLowerCase()));
      }
      if (queryParams.type && queryParams.type !== 'all') {
        filtered = filtered.filter(p => (p.type || '').toLowerCase() === queryParams.type.toLowerCase());
      }
      if (queryParams.gemstone && queryParams.gemstone !== 'all') {
        filtered = filtered.filter(p => (p.gemstone || '').toLowerCase() === queryParams.gemstone.toLowerCase());
      }
      if (queryParams.minPrice !== undefined && queryParams.minPrice !== '') {
        const min = Number(queryParams.minPrice);
        filtered = filtered.filter(p => Number(p.discount_price || p.price) >= min);
      }
      if (queryParams.maxPrice !== undefined && queryParams.maxPrice !== '') {
        const max = Number(queryParams.maxPrice);
        filtered = filtered.filter(p => Number(p.discount_price || p.price) <= max);
      }
      if (queryParams.inStock === 'true' || queryParams.inStock === true) {
        filtered = filtered.filter(p => (p.stock || 0) > 0);
      }

      // Sort
      const sort = queryParams.sort;
      if (sort === 'price-low-to-high' || sort === 'price-asc') {
        filtered.sort((a, b) => Number(a.discount_price || a.price) - Number(b.discount_price || b.price));
      } else if (sort === 'price-high-to-low' || sort === 'price-desc') {
        filtered.sort((a, b) => Number(b.discount_price || b.price) - Number(a.discount_price || a.price));
      } else {
        // default newest
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      }

      const page = Math.max(1, parseInt(queryParams.page) || 1);
      const limit = Math.max(1, parseInt(queryParams.limit) || 12);
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit) || 1;
      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return {
        success: true,
        data: {
          products: paginated,
          total,
          totalPages,
          page
        }
      };
    }

    if (path.startsWith('/products/search')) {
      const q = (queryParams.q || '').toLowerCase();
      const matched = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q)) ||
        (p.gemstone && p.gemstone.toLowerCase().includes(q))
      );
      return {
        success: true,
        data: {
          products: matched
        }
      };
    }

    if (path.endsWith('/related')) {
      const parts = path.split('/');
      const productId = parts[parts.length - 2];
      const current = products.find(p => String(p.id) === String(productId));
      const related = products
        .filter(p => String(p.id) !== String(productId) && (!current || p.type === current.type || p.audience === current.audience))
        .slice(0, 8);
      return {
        success: true,
        data: {
          products: related.length > 0 ? related : products.slice(0, 6)
        }
      };
    }

    // Single product by slug / id
    const slug = path.replace('/products/', '');
    const product = products.find(p => p.slug === slug || String(p.id) === String(slug));
    if (product) {
      return {
        success: true,
        data: { product }
      };
    } else {
      return {
        success: false,
        message: 'Product not found'
      };
    }
  }

  // 2. CATEGORIES
  if (path === '/categories' || path.startsWith('/categories/')) {
    if (path === '/categories' || path === '/categories/') {
      let filtered = [...categories];
      if (queryParams.audience && queryParams.audience !== 'all') {
        filtered = filtered.filter(c => c.audience === queryParams.audience || c.audience === 'all');
      }
      return {
        success: true,
        data: { categories: filtered }
      };
    }
    const slug = path.replace('/categories/', '');
    const cat = categories.find(c => c.slug === slug || String(c.id) === String(slug));
    return {
      success: true,
      data: { category: cat || categories[0] }
    };
  }

  // 3. CONTENT & SECTIONS
  if (path.startsWith('/content/section/')) {
    const key = path.replace('/content/section/', '');
    const sections = {
      announcement_bar: {
        enabled: true,
        messages: [
          '✦ Flat 10% off on all Silver Jewellery | Use code AKSHAY10 ✦',
          '✦ Free Express Shipping on orders above Rs. 1,999/- ✦',
          '✦ Certified 925 Sterling Silver Hallmark ✦'
        ]
      },
      top_bar: {
        phone: '+91 9106702473',
        email: 'concierge@aishka.com',
        store_timing: 'Mon - Sat: 10:00 AM - 8:00 PM',
        address: 'Rajkot, Gujarat, India',
        facebook_url: 'https://facebook.com',
        instagram_url: 'https://instagram.com/aishkajewels',
        whatsapp_number: '919106702473'
      },
      offer_banner: {
        heading: 'Aishka',
        offer_text: 'get 10% off on your first order',
        promo_code: 'AISHKA10',
        validity_text: 'Offer Valid till 15th May',
        banner_image: offerImg
      },
      hero_section: {
        line1: 'গয়নায় ধরা থাকুক',
        line2: 'শুভ সূচনা,',
        line3: 'অক্ষয় হোক',
        line4: 'আপনার প্রতিটি মুহূর্ত',
        backgroundImage: heroImg
      },
      about_page: {
        header_title: 'ABOUT US',
        header_paragraph_1: 'Welcome to AISHKA, a premium jewellery brand built on a simple promise: beautiful jewellery that fits real, everyday life.',
        header_paragraph_2: 'We specialize in 925 Sterling Silver jewellery as well as imitation and fashion jewellery, giving you the choice between fine silver pieces you can wear for years and trend-led fashion pieces that let you experiment without a heavy price tag.',
        what_we_offer: [
          '925 Hallmark-quality Sterling Silver jewellery: rings, earrings, pendants, chains, bracelets and more',
          'Imitation & fashion jewellery: trend-forward pieces in gold-tone, oxidized, and antique finishes',
          'Every day-wear and occasion-wear collections for women and men',
          'New designs added regularly'
        ],
        our_promise: [
          'Quality-checked pieces before dispatch',
          'Genuine 925 silver purity on all sterling silver products',
          'Secure packaging for safe delivery',
          'Friendly, responsive customer support'
        ],
        contact_text: 'Have a question before you shop? Reach us any time at jewelsamrat@outlook.com or +91 9106702473.'
      }
    };

    return {
      success: true,
      data: { content: sections[key] || {} }
    };
  }

  if (path === '/content/hero-banners') {
    return {
      success: true,
      data: {
        banners: [
          { id: 1, image: slide1, title: 'Akshaya Tritiya Specials', subtitle: 'Purity in every facet' },
          { id: 2, image: slide2, title: '925 Silver Chokers', subtitle: 'Royal heritage modernised' },
          { id: 3, image: slide3, title: 'Bridal Silver Ornaments', subtitle: 'Crafted for timeless memories' }
        ]
      }
    };
  }

  if (path === '/content/trust-points') {
    return {
      success: true,
      data: {
        trustPoints: [
          { id: 1, title: 'Pure 925 Silver', description: 'Certified 925 sterling silver with official hallmark verification.', icon: 'gemstone' },
          { id: 2, title: 'Hallmark Certified', description: 'Every single piece is rigorously tested and certified for purity.', icon: 'hallmark' },
          { id: 3, title: 'Artisan Handcrafted', description: 'Crafted with precision by master silversmiths using heritage techniques.', icon: 'handcrafted' },
          { id: 4, title: 'Trusted Family Heritage', description: 'Decades of trustworthy jewellery craft, bringing beauty to your everyday.', icon: 'family' }
        ]
      }
    };
  }

  if (path === '/content/testimonials') {
    return {
      success: true,
      data: {
        testimonials: [
          { id: 't-1', customer_name: 'Purnima S.', rating: 5, body: 'It is really so beautiful. The shine is extraordinary!' },
          { id: 't-2', customer_name: 'Souvik C.', rating: 5, body: 'Awesome product of Barsaat collection. 925 hallmarked purity.' },
          { id: 't-3', customer_name: 'Suhana', rating: 5, body: 'Very nice product! Packing was premium and safe.' },
          { id: 't-4', customer_name: 'Ila R.', rating: 5, body: 'Khub sundor necklace! Feels solid and looks gorgeous.' },
          { id: 't-5', customer_name: 'Meera R.', rating: 5, body: 'The emerald cut is breathtaking. Filigree band is a masterpiece.' }
        ]
      }
    };
  }

  if (path === '/content/instagram-posts') {
    return {
      success: true,
      data: {
        posts: [
          { id: 1, image_url: braceletsImg, likes: 243, link: 'https://instagram.com' },
          { id: 2, image_url: ringsImg, likes: 582, link: 'https://instagram.com' },
          { id: 3, image_url: necklacesImg, likes: 418, link: 'https://instagram.com' },
          { id: 4, image_url: earringsImg, likes: 329, link: 'https://instagram.com' },
          { id: 5, image_url: craftsmanshipImg, likes: 712, link: 'https://instagram.com' }
        ]
      }
    };
  }

  // 4. AUTH
  if (path.startsWith('/auth/')) {
    if (path === '/auth/login' || path === '/auth/register') {
      const email = data?.email || 'demo@aishka.com';
      const name = data?.name || email.split('@')[0];
      const user = {
        id: 'user_1',
        name,
        email,
        phone: data?.phone || '+91 98765 43210',
        role: 'customer'
      };
      setStored('aishka_user', user);
      localStorage.setItem('accessToken', 'mock_jwt_token_' + Date.now());
      return {
        success: true,
        message: path === '/auth/login' ? 'Login successful' : 'Registration successful',
        data: {
          user,
          accessToken: 'mock_jwt_token_' + Date.now()
        }
      };
    }

    if (path === '/auth/me') {
      const user = getStored('aishka_user', null);
      if (user) {
        return {
          success: true,
          data: { user }
        };
      }
      return {
        success: false,
        message: 'Not authenticated'
      };
    }

    if (path === '/auth/logout') {
      localStorage.removeItem('aishka_user');
      localStorage.removeItem('accessToken');
      return {
        success: true,
        message: 'Logged out successfully'
      };
    }

    if (path === '/auth/refresh') {
      return {
        success: true,
        data: {
          accessToken: 'mock_jwt_token_refreshed_' + Date.now()
        }
      };
    }

    if (path === '/auth/forgot-password' || path === '/auth/reset-password') {
      return {
        success: true,
        message: 'Request processed successfully'
      };
    }
  }

  // 5. USER PROFILE & ADDRESSES
  if (path === '/users/profile') {
    if (method === 'put' || method === 'patch') {
      const current = getStored('aishka_profile', mockProfile);
      const updated = { ...current, ...data };
      setStored('aishka_profile', updated);
      return { success: true, data: updated };
    }
    return {
      success: true,
      data: getStored('aishka_profile', mockProfile)
    };
  }

  if (path === '/users/change-password') {
    return { success: true, message: 'Password updated successfully' };
  }

  if (path === '/users/addresses') {
    if (method === 'post') {
      const addresses = getStored('aishka_addresses', initialAddresses);
      const newAddr = {
        id: Date.now(),
        is_default: false,
        ...data,
        address: data?.address_line || data?.address || ''
      };
      addresses.push(newAddr);
      setStored('aishka_addresses', addresses);
      return { success: true, data: newAddr };
    }
    return {
      success: true,
      data: getStored('aishka_addresses', initialAddresses)
    };
  }

  if (path.startsWith('/users/addresses/')) {
    const addrId = path.replace('/users/addresses/', '');
    let addresses = getStored('aishka_addresses', initialAddresses);
    if (method === 'delete') {
      addresses = addresses.filter(a => String(a.id) !== String(addrId));
      setStored('aishka_addresses', addresses);
      return { success: true, message: 'Address deleted' };
    }
    if (method === 'put') {
      addresses = addresses.map(a => String(a.id) === String(addrId) ? { ...a, ...data } : a);
      setStored('aishka_addresses', addresses);
      return { success: true, data: data };
    }
  }

  // 6. ORDERS
  if (path === '/orders/validate-coupon') {
    const code = (data?.coupon_code || '').trim().toUpperCase();
    const subtotal = Number(data?.subtotal || 0);
    if (code === 'AKSHAY10') {
      const discount = Math.round(subtotal * 0.1);
      return {
        success: true,
        data: {
          code: 'AKSHAY10',
          discount: discount > 0 ? discount : 100,
          description: '10% festival discount applied'
        }
      };
    } else if (code) {
      return {
        success: true,
        data: {
          code,
          discount: Math.min(150, Math.round(subtotal * 0.05)),
          description: '5% promo discount applied'
        }
      };
    }
    return {
      success: false,
      message: 'Invalid coupon code'
    };
  }

  if (path === '/orders/create-razorpay-order') {
    return {
      success: true,
      data: {
        razorpay_order_id: `order_mock_${Date.now()}`,
        key_id: 'rzp_test_mock',
        amount: 100000,
        currency: 'INR'
      }
    };
  }

  if (path === '/orders/verify-payment') {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const ordersList = getStored('aishka_orders', []);
    const guestCart = getStored('guestCart', { items: [], subtotal: 0 });
    const newOrder = {
      id: orderId,
      order_id: orderId,
      date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: 'Processing',
      order_status: 'processing',
      delivery_status: 'processing',
      total: guestCart.subtotal || 2499,
      total_amount: guestCart.subtotal || 2499,
      items: guestCart.items?.length ? guestCart.items.map(i => ({
        name: i.product?.name || 'Silver Jewellery',
        quantity: i.quantity || 1,
        price: i.product?.discount_price || i.product?.price || 1999
      })) : [{ name: 'Amethyst Bloom Ring', quantity: 1, price: 1999 }],
      payment_status: 'paid',
      shipping_address: 'Flat 402, Saheed Nagar, Near KIIT Square, Bhubaneswar, 751007'
    };
    ordersList.unshift(newOrder);
    setStored('aishka_orders', ordersList);
    return {
      success: true,
      data: {
        order_id: orderId,
        order: newOrder
      }
    };
  }

  if (path === '/orders/my-orders') {
    return {
      success: true,
      data: {
        orders: getStored('aishka_orders', mockOrders)
      }
    };
  }

  if (path.startsWith('/orders/track')) {
    const orderId = queryParams.order_id || queryParams.awb;
    const all = getStored('aishka_orders', mockOrders);
    const found = all.find(o => String(o.order_id || o.id).toLowerCase() === String(orderId).toLowerCase());
    const orderData = found || all[0] || {
      order_id: orderId || 'ORD-10482',
      order_status: 'shipped',
      date: new Date().toISOString(),
      items: [{ name: 'Amethyst Bloom Ring', quantity: 1 }]
    };
    return {
      success: true,
      data: { order: orderData }
    };
  }

  if (path.startsWith('/orders/')) {
    const orderId = path.replace('/orders/', '');
    const all = getStored('aishka_orders', mockOrders);
    const found = all.find(o => String(o.order_id || o.id) === String(orderId));
    return {
      success: true,
      data: {
        order: found || {
          id: orderId,
          order_id: orderId,
          date: new Date().toISOString(),
          status: 'Paid',
          order_status: 'processing',
          total: 2499,
          items: [{ name: 'Silver Jewellery Piece', quantity: 1, price: 2499 }]
        }
      }
    };
  }

  // 7. REVIEWS
  if (path.startsWith('/reviews/product/')) {
    const productId = path.replace('/reviews/product/', '');
    const storedReviews = getStored(`aishka_reviews_${productId}`, [
      {
        id: 'rev-1',
        customer_name: 'Pooja M.',
        rating: 5,
        title: 'Authentic 925 Hallmark Quality',
        body: 'Exceeded my expectations! Weight feels premium and polish is top-notch.',
        created_at: '2025-02-15'
      },
      {
        id: 'rev-2',
        customer_name: 'Karan D.',
        rating: 5,
        title: 'Perfect Gift',
        body: 'Gifted this to my wife on our anniversary. She absolutely loved the craftsmanship.',
        created_at: '2025-01-20'
      }
    ]);

    if (method === 'post') {
      const newReview = {
        id: 'rev-' + Date.now(),
        customer_name: data?.name || 'Customer',
        rating: data?.rating || 5,
        title: data?.title || 'Verified Purchase',
        body: data?.body || '',
        created_at: new Date().toISOString().split('T')[0]
      };
      storedReviews.unshift(newReview);
      setStored(`aishka_reviews_${productId}`, storedReviews);
      return {
        success: true,
        message: 'Review submitted successfully',
        data: { review: newReview }
      };
    }

    return {
      success: true,
      data: {
        reviews: storedReviews,
        total: storedReviews.length,
        totalPages: 1,
        page: 1
      }
    };
  }

  // 8. MISC (Contact, Newsletter, Videos)
  if (path === '/newsletter/subscribe' || path === '/contact') {
    return {
      success: true,
      message: 'Thank you! Your submission has been received.'
    };
  }

  if (path === '/videos') {
    return {
      success: true,
      data: {
        videos: [
          {
            id: 'v1',
            title: 'Royal Emerald Choker in Motion',
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-glamorous-jewelry-of-a-woman-41804-large.mp4',
            thumbnailUrl: craftsmanshipImg
          }
        ]
      }
    };
  }

  // Fallback for any other /admin or undefined endpoint
  return {
    success: true,
    data: {}
  };
};
