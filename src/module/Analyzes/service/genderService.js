import api from 'src/api/apiClient';

export const fetchGender = async () => {
  const response = await api.get(`/api/gender/report/admin/`, {});

  return response.data;
};
