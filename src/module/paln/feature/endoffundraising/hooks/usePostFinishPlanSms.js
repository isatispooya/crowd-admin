import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const usePostFinishPlanSms = (trace_code) => {

  const postFinishSms = async (data) => {
    const response = await api.post(`/api/send/sms/finish/plan/${trace_code}/`, data, {
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
