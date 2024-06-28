import axios from 'axios';
import {SERVER_URL} from '../../config/config';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  proxy: {
    host: 'proxy-server',
    port: 3000,
  },
});

// Set the default Authorization header for all requests
export const setAuthToken = token => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
