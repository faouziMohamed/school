import {
  requestLoggerInterceptor,
  responseLoggerInterceptor,
} from '@/config/interceptors/logger.interceptor';
import axios from 'axios';

export const baseRequestConfig = {
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

/**
 * @returns {AxiosInstance}
 */
export default function httpClient() {
  const instance = axios.create({ ...baseRequestConfig });
  instance.interceptors.request.use(requestLoggerInterceptor, (error) => {
    console.error('Request error:', { error: error.message });
    return Promise.reject(error);
  });
  instance.interceptors.response.use(
    responseLoggerInterceptor,
    /**
     * @param { AxiosError } error
     */
    (error) => {
      let message = '';
      try {
        message = JSON.stringify(error.response?.data);
      } catch {
        message = error.response?.data ?? '';
      }
      console.error('Response error:', { error: error.message, message });
      return Promise.reject(error);
    },
  );
  return instance;
}
