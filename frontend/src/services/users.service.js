import api from '../utils/api';

const usersService = {
  // Profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (data) => {
    const response = await api.put('/users/change-password', data);
    return response.data;
  },

  // Addresses
  getAddresses: async () => {
    const response = await api.get('/users/addresses');
    return response.data;
  },

  addAddress: async (data) => {
    const response = await api.post('/users/addresses', data);
    return response.data;
  },

  updateAddress: async (id, data) => {
    const response = await api.put(`/users/addresses/${id}`, data);
    return response.data;
  },

  deleteAddress: async (id) => {
    const response = await api.delete(`/users/addresses/${id}`);
    return response.data;
  }
};

export default usersService;
