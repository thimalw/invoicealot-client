import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/v1'; // TODO: get from env var

var api = axios.create();

if (localStorage.hasOwnProperty('_apitoken')) {
  api.interceptors.request.use(
    config => {
      config.headers.authorization = `bearer ${localStorage.getItem('_apitoken')}`;
      return config;
    },
    error => Promise.reject(error)
  );
}

export default api;
