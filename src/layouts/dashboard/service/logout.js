import api from 'src/api/apiClient';

export const LogOut = async () => {
  const url = `/api/log/out/`;

  const response = await api.post(
    url,
    { data: '' },
  );

  return response.data;
};
