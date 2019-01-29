import api from './api';

const login = async (email, password) => {
  return await api.post('/user/login', {
    email,
    password
  });
};

const signup = async (user) => {
  return await api.post('/user', user);
};

export default {
  login,
  signup
}
