import api from '../utils/api';

const productsService = {
  getProducts: async (filters = {}) => {
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        cleanFilters[key] = filters[key];
      }
    });
    const params = new URLSearchParams(cleanFilters);
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  getProduct: async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  getRelatedProducts: async (id) => {
    const response = await api.get(`/products/${id}/related`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  adminGetProducts: async (filters = {}) => {
    const cleanFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== null) {
        cleanFilters[key] = filters[key];
      }
    });
    const params = new URLSearchParams(cleanFilters);
    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  adminCreateProduct: async () => ({ success: true, message: 'Product created successfully' }),
  adminUpdateProduct: async () => ({ success: true, message: 'Product updated successfully' }),
  adminDeleteProduct: async () => ({ success: true, message: 'Product deleted successfully' }),
  adminToggleStatus: async () => ({ success: true, message: 'Product status updated' })
};

export default productsService;
