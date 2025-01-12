import api from 'src/api/apiClient';

export const getUser = async () => {
  const response = await api.get(`/api/listuser/admin/`, {
  });

  return response.data;
};
