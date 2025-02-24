/**
 * @param {import('axios').InternalAxiosRequestConfig} config
 * @returns {import('axios').InternalAxiosRequestConfig}
 */
export function requestLoggerInterceptor(config) {
  console.debug('Request', {
    method: config.method?.toUpperCase(),
    url: config.url,
  });
  console.debug('Request headers', {
    headers: config.headers,
  });
  console.debug('Request data', { data: config.data });
  return config;
}

/**
 * @param {import('axios').AxiosResponse} response
 * @returns {import('axios').AxiosResponse}
 */
export function responseLoggerInterceptor(response) {
  console.debug('Response from cel', {
    method: response.config.method?.toUpperCase(),
    url: response.config.url,
    status: response.status,
  });
  console.debug('Response headers', {
    headers: response.headers,
  });
  console.debug('Response data', { data: response.data });
  return response;
}
