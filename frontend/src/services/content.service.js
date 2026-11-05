import api from '../utils/api';

const contentService = {
  // Public Methods
  getHeroBanners: () => api.get('/content/hero-banners'),
  getTrustPoints: () => api.get('/content/trust-points'),
  getTestimonials: () => api.get('/content/testimonials'),
  getInstagramPosts: () => api.get('/content/instagram-posts'),
  getSectionContent: (key) => api.get(`/content/section/${key}`),

  // Admin Methods
  adminGetHeroBanners: () => api.get('/content/hero-banners'),
  adminCreateBanner: (data) => api.post('/content/hero-banners', data),
  adminUpdateBanner: (id, data) => api.put(`/content/hero-banners/${id}`, data),
  adminDeleteBanner: (id) => api.delete(`/content/hero-banners/${id}`),
  adminReorderBanners: (order) => api.patch('/content/hero-banners/reorder', { order }),

  adminGetTrustPoints: () => api.get('/content/trust-points'),
  adminCreateTrustPoint: (data) => api.post('/content/trust-points', data),
  adminUpdateTrustPoint: (id, data) => api.put(`/content/trust-points/${id}`, data),
  adminDeleteTrustPoint: (id) => api.delete(`/content/trust-points/${id}`),
  adminReorderTrustPoints: (order) => api.patch('/content/trust-points/reorder', { order }),

  adminGetTestimonials: () => api.get('/content/testimonials'),
  adminCreateTestimonial: (data) => api.post('/content/testimonials', data),
  adminUpdateTestimonial: (id, data) => api.put(`/content/testimonials/${id}`, data),
  adminDeleteTestimonial: (id) => api.delete(`/content/testimonials/${id}`),
  adminApproveTestimonial: (id) => api.patch(`/content/testimonials/${id}/approve`),

  adminGetInstagramPosts: () => api.get('/content/instagram-posts'),
  adminCreateInstagramPost: (data) => api.post('/content/instagram-posts', data),
  adminUpdateInstagramPost: (id, data) => api.put(`/content/instagram-posts/${id}`, data),
  adminDeleteInstagramPost: (id) => api.delete(`/content/instagram-posts/${id}`),

  adminGetSection: (key) => api.get(`/content/section/${key}`),
  adminUpdateSection: (key, content) => api.put(`/content/section/${key}`, { content })
};

export default contentService;
