import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';
import { OnRun } from 'src/api/OnRun';

const usePostCerParticipent = (trace_code) => {
  const accessApi = getCookie('accessApi');
  const navigate = useNavigate();

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
    onSuccess: (response) => {
      window.open(`${OnRun}/${response.url}`, '_blank');
    },
  });
};

export default usePostCerParticipent;
