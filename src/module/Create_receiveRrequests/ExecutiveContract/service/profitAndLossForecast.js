import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createProfitAndLossForecast = async ( data) => {
  const response = await api.post(`/api/profit/and/loss/forecast/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useProfitAndLossForecast = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createProfitAndLossForecast(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
