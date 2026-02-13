import axios from 'axios';

const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  'https://house-price-predictor-13vu.onrender.com/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// API service object
const api = {
    // Health check
    healthCheck: async () => {
        try {
            const response = await apiClient.get('/health/');
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Get model information
    getModelInfo: async () => {
        try {
            const response = await apiClient.get('/model-info/');
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Predict house price
    predictPrice: async (houseData) => {
        try {
            const response = await apiClient.post('/predict/', houseData);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },

    // Get prediction history
    getPredictionHistory: async (limit = 10) => {
        try {
            const response = await apiClient.get(`/history/?limit=${limit}`);
            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    },
};

// Error handler
const handleError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data.error || 'Server error occurred',
      details: error.response.data.details || '',
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server. Please check if the backend is running.',
      details: 'Connection error',
      status: 0,
    };
  } else {
    // Error in request setup
    return {
      message: 'Request error occurred',
      details: error.message,
      status: 0,
    };
  }
};

export default api;
