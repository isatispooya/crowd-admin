import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostFinishPlanSms = (trace_code) => {
  const accessApi = getCookie('accessApi');

  const postFinishSms = async (data) => {
    const response = await api.post(`/api/send/sms/finish/plan/${trace_code}/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };

  const { mutate, data, isLoading, isError, isSuccess } = useMutation({
    mutationKey: ['postFinishSms'],
    mutationFn: postFinishSms,
  });

  return { mutate, data, isLoading, isError, isSuccess };
};

export default usePostFinishPlanSms;
