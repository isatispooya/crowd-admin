import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createPerformanceForecast = async (data) => {
  const response = await api.post(`/api/performance/forecast/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const usePerformanceForecast = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createPerformanceForecast(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
