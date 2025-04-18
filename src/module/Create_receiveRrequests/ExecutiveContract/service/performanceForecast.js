import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createPerformanceForecast = async (data, cartId) => {
  const response = await api.patch(`/api/update/investor/request/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const usePerformanceForecast = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createPerformanceForecast(data, cartId),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
