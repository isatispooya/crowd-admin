import api from 'src/api/apiClient';

export const fetchUser = async () => {
  const response = await api.get(`/api/listuser/admin/`, {

  });

  return response.data;
};
