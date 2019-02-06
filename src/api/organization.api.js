import api from './api';

const list = async () => {
  return await api.get('/organizations');
};

const get = async (organizationId) => {
  return await api.get(`/organizations/${organizationId}`);
};

export default {
  list,
  get
}
