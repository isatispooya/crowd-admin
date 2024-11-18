import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostCerParticipent = (trace_code) => {
  const accessApi = getCookie('accessApi');

  const postCer = async (data) => {
    const response = await api.post(`/api/certificate/admin/${trace_code}/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  return useMutation({
    mutationKey: ['useCerParticipent', trace_code],
    mutationFn: (data) => postCer(data),
  });
};

export default usePostCerParticipent;
