import axios from 'axios';
import { OnRun } from './OnRun';
import { setCookie, getCookie } from './cookie';

const api = axios.create({
  baseURL: OnRun,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

let navigationFunction = null;

export const setNavigationFunction = (navigate) => {
  navigationFunction = navigate;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      setCookie('accessApi', '', 0);
      if (navigationFunction) {
        navigationFunction('/login');
      }
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = getCookie('accessApi');

      if (!token && !config.url.includes('/login')) {
        if (navigationFunction) {
          navigationFunction('/login');
        }
        return Promise.reject(new Error('لطفا ابتدا وارد شوید'));
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
