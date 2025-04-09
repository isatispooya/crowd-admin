import api from 'src/api/apiClient';

export const fetchAge = async () => {
  const response = await api.get(`/api/age/report/admin/`, {});

  return response.data;
};
