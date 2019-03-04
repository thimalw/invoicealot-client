import api from './api';

const create = async (organization) => {
  return await api.post('/organizations', organization);
};

const list = async () => {
  return await api.get('/organizations');
};

const get = async (organizationId) => {
  return await api.get(`/organizations/${organizationId}`);
};

const listPlans = async () => {
  return await api.get('/organizations/plans');
};

export default {
  create,
  list,
  get,
  listPlans
}
