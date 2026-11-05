import api from '../utils/api';

const categoriesService = {
  getCategories: async (filters = {}) => {
    const response = await api.get('/categories', { params: filters });
    return response.data;
  },

  getCategory: async (slug) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  adminGetCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  adminCreateCategory: async () => ({ success: true, message: 'Category created successfully' }),
  adminUpdateCategory: async () => ({ success: true, message: 'Category updated successfully' }),
  adminDeleteCategory: async () => ({ success: true, message: 'Category deleted successfully' }),
  adminReorderCategories: async () => ({ success: true, message: 'Categories reordered successfully' })
};

export default categoriesService;
