import axios from 'axios';
import { history } from '../Router';

axios.defaults.baseURL = 'http://localhost:3000/v1'; // TODO: get from env var

var api = axios.create();

const useToken = () => {
  api.interceptors.request.use(
    config => {
      config.headers.authorization = `bearer ${localStorage.getItem('_apitoken')}`;
      return config;
    },
    error => Promise.reject(error)
  );
};

// add token to all requests
if (localStorage.hasOwnProperty('_apitoken')) {
  useToken();
}

// logout if 401
api.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error.response && (error.response.status === '401' || error.response.status === 401)) {
      history.push('/logout');
    }
    return Promise.reject(error)
  }
);

export {
  useToken
};
export default api;
