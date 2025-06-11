import { QueryClient } from '@tanstack/react-query';
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'react-toastify';

// Create a query client with optimized settings
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  }
});

// Create axios instance with optimized settings
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data'
  },
  timeout: 30000 // 30 seconds
});

export interface ApiClientRequestConfig<T = unknown> extends AxiosRequestConfig<T> {
  // If true (default), the error will be shown as a toast
  showError?: boolean;
  // If true, the request will be cached
  cache?: boolean;
  // Cache expiration time in milliseconds
  cacheTime?: number;
}

// Request cache
const requestCache = new Map<string, { data: any; timestamp: number }>();

export default async function fetch(config: ApiClientRequestConfig) {
  // Generate cache key if caching is enabled
  const cacheKey = config.cache
    ? `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`
    : null;

  // Check cache
  if (cacheKey && requestCache.has(cacheKey)) {
    const cachedData = requestCache.get(cacheKey);
    const cacheExpiration = config.cacheTime || 1000 * 60 * 5; // Default 5 minutes

    if (cachedData && Date.now() - cachedData.timestamp < cacheExpiration) {
      return { data: cachedData.data, cached: true };
    }
  }

  // Make the request
  try {
    const response = await apiClient(config);

    // Cache the response if caching is enabled
    if (cacheKey) {
      requestCache.set(cacheKey, {
        data: response.data,
        timestamp: Date.now()
      });
    }

    return response;
  } catch (error) {
    // Let the interceptor handle the error
    throw error;
  }
}

// Request interceptor for logging and authentication
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig<unknown>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
  }
  return config;
});

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Response:', extractResponseForLog(response));
    }
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Response Error:',
        error.message,
        error.response && extractResponseForLog(error.response)
      );
    }

    if ((error.config as ApiClientRequestConfig)?.showError !== false) {
      const errorMessage =
        // @ts-expect-error one of these will be defined
        error?.response?.data?.message ?? error?.response?.data?.error ?? error?.message;

      toast(errorMessage, {
        type: 'error',
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    }

    return Promise.reject(error);
  }
);

function extractResponseForLog(response: AxiosResponse): unknown {
  return {
    status: response.status,
    statusText: response.statusText,
    url: response.config.url,
    ...response.data
  };
}
