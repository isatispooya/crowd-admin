import api from 'src/api/apiClient';

export const getDashboard = async () => {

  const response = await api.get(`/api/dashboard/admin/`, {
  });
  return response.data;
};
