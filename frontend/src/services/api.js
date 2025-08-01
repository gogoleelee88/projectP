import axios from 'axios';
import toast from 'react-hot-toast';

// API Base Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        params: config.params,
      });
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    // Handle common error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          toast.error(data.message || '잘못된 요청입니다.');
          break;
        case 401:
          toast.error('인증이 필요합니다.');
          // Redirect to login if needed
          // window.location.href = '/login';
          break;
        case 403:
          toast.error('접근 권한이 없습니다.');
          break;
        case 404:
          toast.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 429:
          toast.error('너무 많은 요청입니다. 잠시 후 다시 시도해주세요.');
          break;
        case 500:
          toast.error('서버 오류가 발생했습니다.');
          break;
        default:
          toast.error(data.message || '알 수 없는 오류가 발생했습니다.');
      }
    } else if (error.request) {
      // Network error
      toast.error('네트워크 연결을 확인해주세요.');
    } else {
      // Something else happened
      toast.error('요청 처리 중 오류가 발생했습니다.');
    }
    
    return Promise.reject(error);
  }
);

// API helper functions
export const apiHelper = {
  /**
   * GET request
   */
  get: async (url, params = {}) => {
    try {
      const response = await api.get(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * POST request
   */
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * PUT request
   */
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * PATCH request
   */
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * DELETE request
   */
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload file
   */
  upload: async (url, formData, onUploadProgress = null) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      if (onUploadProgress) {
        config.onUploadProgress = onUploadProgress;
      }
      
      const response = await api.post(url, formData, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Download file
   */
  download: async (url, filename) => {
    try {
      const response = await api.get(url, {
        responseType: 'blob',
      });
      
      // Create download link
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

// API endpoints
export const endpoints = {
  // Authentication
  auth: {
    login: '/users/auth',
    register: '/users',
    me: '/users/me',
  },
  
  // Users
  users: {
    list: '/users',
    create: '/users',
    get: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
    updateStatus: (id) => `/users/${id}/status`,
    search: '/users/search',
    withProjects: '/users/with-projects',
    stats: '/users/stats',
    init: '/users/init',
  },
  
  // Projects
  projects: {
    list: '/projects',
    create: '/projects',
    get: (id) => `/projects/${id}`,
    update: (id) => `/projects/${id}`,
    delete: (id) => `/projects/${id}`,
    userProjects: (userId) => `/projects/user/${userId}`,
    public: '/projects/public',
    search: '/projects/search',
    byCategory: (category) => `/projects/category/${category}`,
    byStatus: (status) => `/projects/status/${status}`,
    recent: '/projects/recent',
    stats: '/projects/stats',
    changeStatus: (id) => `/projects/${id}/status`,
  },
  
  // Search
  search: {
    all: '/search',
    projects: '/search/projects',
    users: '/search/users',
    byCategory: (category) => `/search/category/${category}`,
    forUser: (userId) => `/search/user/${userId}`,
    status: '/search/status',
    popular: '/search/popular',
    stats: '/search/stats',
    suggest: '/search/suggest',
    quick: '/search/quick',
  },
};

// Error handling utilities
export const handleApiError = (error, customMessage = null) => {
  if (customMessage) {
    toast.error(customMessage);
  } else if (error.response?.data?.message) {
    toast.error(error.response.data.message);
  } else {
    toast.error('처리 중 오류가 발생했습니다.');
  }
  
  console.error('API Error:', error);
};

// Success message utility
export const showSuccessMessage = (message) => {
  toast.success(message);
};

// Loading state utility
export const createLoadingState = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  
  const withLoading = async (asyncFn) => {
    try {
      setLoading(true);
      const result = await asyncFn();
      return result;
    } finally {
      setLoading(false);
    }
  };
  
  return { loading, withLoading };
};

export default api;