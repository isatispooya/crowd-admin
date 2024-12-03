import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

export const usePostInfo = (trace_code) => {
  const accessApi = getCookie('accessApi');
  const queryClient = useQueryClient();

  const sendAddInfo = async (data) => {
    try {
      const formattedData = {
        rate_of_return: Number(data.rate_of_return),
        status_second: String(data.status_second),
        status_show: Boolean(data.status_show),
        amount_collected_now: data.amount_collected_now,
        payment_date: data.payment_date,
        payback_period: String(data.payback_period),
        period_length: Number(data.period_length),
        plan: Number(data.plan)
      };

      console.log('Sending formatted data:', formattedData);
      
      const response = await api.post(`/api/information/plan/admin/${trace_code}/`, formattedData, {
        headers: {
          Authorization: `Bearer ${accessApi}`,
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response received:', response);
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: (data) => sendAddInfo(data),
    onSuccess: (newData) => {
      console.log('Mutation successful:', newData);
      queryClient.invalidateQueries(['addInfo', trace_code]);
      queryClient.setQueryData(['addInfo', trace_code], newData);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isLoading,
    isError: mutation.isError,
  };
};
