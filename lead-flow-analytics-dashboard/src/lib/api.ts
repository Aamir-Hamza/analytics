export const API_BASE_URL = 'https://analytics-kqwp.onrender.com';

export const apiConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`; 