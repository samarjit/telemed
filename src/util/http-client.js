import axios from 'axios';
import VanillaToasts from 'vanillatoasts';
import 'vanillatoasts/vanillatoasts.css';
// import history from './history';

const TIMEOUT = 4000;
const isHandlerEnabled = (config = {}) => (!(config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled));

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // request.headers['X-traceId'] = '';
    console.log('request interceptor');
  }
  return request;
};

const errorHandler = (error) => {
  if (isHandlerEnabled(error.config)) {
    console.log('error occurred');
    VanillaToasts.create({
      title: `Request failed: ${error.response.status}`,
      text: `Unfortunately error happened during request: ${error.config.url}`,
      type: 'warning',
      timeout: TIMEOUT
    });
    if (error && error.response.status === 401) {
      // history.push('/login');
      location.href = '/login'
    }
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ ...error });
};

const successHandler = (response) => {
  if (isHandlerEnabled(response.config)) {
    console.log('api response success', response.config.url);
  }
  return response;
};

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://remotedoc.herokuapp.com/'
});

// Add interceptors
axiosInstance.interceptors.request.use(
  (request) => requestHandler(request)
);

axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);


export default axiosInstance;
