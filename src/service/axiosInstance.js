import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.80:3000', // Your backend URL
  proxy: {
    host: 'proxy-server',
    port: 3000,
  },
});

// Set the default Authorization header for all requests
export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;