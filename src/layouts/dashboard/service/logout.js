import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const LogOut = async () => {
  const url = `/api/log/out/`;
  const accessApi = getCookie('accessApi');

  if (!accessApi) {
    return null;
  }

  const response = await api.post(url, null, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
