// API Configuration for both development and production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://zynk-d1b9.onrender.com' 
  : 'http://localhost:8080';

export default API_BASE_URL; 