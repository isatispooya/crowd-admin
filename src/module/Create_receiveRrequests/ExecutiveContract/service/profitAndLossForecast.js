import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createProfitAndLossForecast = async (data) => {
  const response = await api.post(`/api/profit/and/loss/forecast/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useProfitAndLossForecast = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createProfitAndLossForecast(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
