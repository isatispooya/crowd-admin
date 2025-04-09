import api from 'src/api/apiClient';

export const fetchCity = async () => {
  const response = await api.get(`/api/city/report/admin/`, {});

  return response.data;
};
