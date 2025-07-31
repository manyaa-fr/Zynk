// API Configuration for both development and production
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://zynk-d1b9.onrender.com' 
  : '';

export default API_BASE_URL; 