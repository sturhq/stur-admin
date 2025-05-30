import {toast} from '@/hooks/use-toast';
import axios, {
  RawAxiosRequestHeaders,
  AxiosInstance,
  AxiosError,
} from 'axios';

// create an axios instance
export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  } as RawAxiosRequestHeaders,
});

// Create a separate axios instance for logout to prevent recursion
const logoutApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
});

// Track logout state
let isLoggingOut = false;
// Debounce health check

const debounce = (fn, delay: number) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let timeoutId: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Modified health check logic
let isCheckingHealth = false;

const checkHealth = debounce(async () => {
  if (isCheckingHealth) return;
  isCheckingHealth = true;

  try {
    await axios.get('/health-check', {timeout: 5000});
  } catch {
    toast({
      title: 'Network Error',
      description: 'Server is unreachable',
      variant: 'destructive',
    });
    // Don't call handleLogout here
  } finally {
    isCheckingHealth = false;
  }
}, 5000);

// Modified handleLogout
const handleLogout = async () => {
  if (isLoggingOut) return;

  try {
    isLoggingOut = true;
    // Don't make logout API call if we're having network issues
    if (window.navigator.onLine) {
      try {
        await logoutApi.put('/auth/logout');
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }
  } finally {
    window.localStorage.clear();
    isLoggingOut = false;
    // Use replace instead of href to prevent history stack issues
    window.location.replace('/auth/login');
  }
};

// request interceptor
api.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// response interceptor
api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (isLoggingOut) {
      return Promise.reject(error);
    }

    if (error.code === 'ERR_NETWORK') {
      console.error('Network Error:', error);
      checkHealth();
      return Promise.reject(error);
    }

    switch (error.response?.status) {
      case 401:
        console.error('Unauthorized Access', error);
        if (error.config.url !== '/auth/login') handleLogout();
        break;
      case 403:
        console.error('Forbidden Access', error);
        break;
      case 404:
        console.error('Resource Not Found', error);
        break;
      case 500:
      default:
        console.error('Request Error', error);
    }

    return Promise.reject(error);
  }
);

// Global error handler
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled Promise Rejection:', event.reason);
});

export default api;
