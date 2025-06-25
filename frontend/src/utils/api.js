import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || { message: error.message });
  }
);

export const feedbackService = {
  // Submit new feedback
  async createFeedback(feedback) {
    return await api.post('/feedback', feedback);
  },

  // Get all feedback with optional filtering
  async getFeedback(filters = {}) {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const response = await api.get(`/feedback?${params.toString()}`);
    return response.data;
  },

  // Get feedback statistics
  async getFeedbackStats() {
    const response = await api.get('/feedback/stats');
    return response.data;
  },

  // Health check
  async healthCheck() {
    return await api.get('/health');
  }
};

export default api;