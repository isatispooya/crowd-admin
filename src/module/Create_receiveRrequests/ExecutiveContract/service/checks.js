import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createChecks = async (data) => {
  const response = await api.post(`/api/checks/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useChecks = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createChecks(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
