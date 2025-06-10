import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const LogOut = async () => {
  const url = `/api/api/logout/`;
  const refresh = getCookie('refreshApi');

  const response = await api.post(url, { refresh });

  return response.data;
};
