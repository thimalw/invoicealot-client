import api from './api';

const create = async (invoice, organizationId) => {
  return await api.post(`/organizations/${organizationId}/invoices`, invoice);
};

const list = async (organizationId) => {
  return await api.get(`/organizations/${organizationId}/invoices`);
};

const get = async (organizationId, invoiceId) => {
  return await api.get(`/organizations/${organizationId}/invoices/${invoiceId}`);
};

export default {
  create,
  list,
  get
}
