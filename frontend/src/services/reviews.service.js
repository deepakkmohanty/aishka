import api from '../utils/api';

const reviewsService = {
  /**
   * Get paginated approved reviews for a specific product
   * @param {string} productId 
   * @param {number} page 
   * @param {number} limit 
   * @returns {Promise<Object>} The response data
   */
  getProductReviews: async (productId, page = 1, limit = 10) => {
    try {
      const response = await api.get(`/reviews/product/${productId}?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  /**
   * Submit a new review for a product (Requires authentication)
   * @param {string} productId 
   * @param {Object} reviewData { rating, title, body }
   * @returns {Promise<Object>}
   */
  submitReview: async (productId, reviewData) => {
    try {
      const response = await api.post(`/reviews/product/${productId}`, reviewData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default reviewsService;
