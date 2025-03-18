import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createWarranty = async (data) => {
  const response = await api.post(`/api/warranty/investor/request/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useWarranty = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createWarranty(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
