import { mockBackendHandler } from './mockBackend';

const createMockResponse = (data, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
});

const executeMockRequest = async (method, url, data = null, config = {}) => {
  const params = config?.params || {};
  try {
    const result = await mockBackendHandler(method.toLowerCase(), url, data, params);
    if (result && result.success === false && result.message === 'Product not found') {
      const err = new Error(result.message);
      err.response = createMockResponse(result, 404);
      throw err;
    }
    return createMockResponse(result, 200);
  } catch (err) {
    if (err.response) throw err;
    const errorResponse = createMockResponse({ success: false, message: err.message }, 500);
    const customErr = new Error(err.message);
    customErr.response = errorResponse;
    throw customErr;
  }
};

const api = function (config) {
  if (typeof config === 'string') {
    return executeMockRequest('get', config);
  }
  const method = config.method || 'get';
  const url = config.url || '';
  const data = config.data || null;
  return executeMockRequest(method, url, data, config);
};

api.get = (url, config) => executeMockRequest('get', url, null, config);
api.post = (url, data, config) => executeMockRequest('post', url, data, config);
api.put = (url, data, config) => executeMockRequest('put', url, data, config);
api.delete = (url, config) => executeMockRequest('delete', url, null, config);
api.patch = (url, data, config) => executeMockRequest('patch', url, data, config);

api.defaults = {
  baseURL: '',
  headers: {
    common: {},
  },
};

api.interceptors = {
  request: {
    use: (fn) => fn,
    eject: () => {},
  },
  response: {
    use: (fn) => fn,
    eject: () => {},
  },
};

export default api;
