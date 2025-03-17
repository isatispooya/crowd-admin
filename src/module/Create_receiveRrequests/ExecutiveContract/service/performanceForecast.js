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
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createPerformanceForecast(data),
  });

  return { mutate, data: responseData };
};
