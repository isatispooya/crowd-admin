import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createAssumptions = async (data) => {
  const response = await api.post(`/api/assumptions/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useAssumptions = (refetch) => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createAssumptions(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData };
};
