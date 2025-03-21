import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createGuarantor = async (data) => {
  const response = await api.post(`/api/guarantor/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useGuarantor = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createGuarantor(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
