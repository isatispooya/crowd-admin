import api from 'src/api/apiClient';

export const getcontract = async (cartId) => {
  const response = await api.get(`/api/setcart/admin/${cartId}/`, {
  });
  return response.data;
};