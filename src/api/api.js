import axios from 'axios';
import { history } from '../Router';

axios.defaults.baseURL = 'http://localhost:3000/v1'; // TODO: get from config

var api = axios.create();

/*
 * Insert the token to all requests
 */
const useToken = () => {
  api.interceptors.request.use(
    config => {
      config.headers.authorization = `bearer ${localStorage.getItem('_apitoken')}`;
      return config;
    },
    error => Promise.reject(error)
  );
};

if (localStorage.hasOwnProperty('_apitoken')) {
  useToken();
}

/*
 * Trigger log out if the API returns a status of 401
 */
api.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error.response && (error.response.status === '401' || error.response.status === 401)) {
      return history.push('/logout');
    }
    return Promise.reject(error)
  }
);

export {
  useToken
};
export default api;
