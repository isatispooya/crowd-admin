import api from 'src/api/apiClient';

export const oneTimeLogin = async (data) => {
  const response = await api.post('/api/onetime/login/', data);
  return response.data;
};
