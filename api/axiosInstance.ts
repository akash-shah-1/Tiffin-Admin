
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Generic base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
