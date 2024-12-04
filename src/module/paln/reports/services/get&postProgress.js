import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const accessApi = getCookie('accessApi');

export const GetProgress = async (trace_code) => {
  const response = await api.get(`/api/progres/report/admin/${trace_code}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};



export const DeleteProgress = async (docId) => {
  const response = await api.delete(`/api/progres/report/admin/${docId}/`, {
    headers: {
      Authorization: `Bearer ${accessApi}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
