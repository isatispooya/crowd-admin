import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createWarranty = async (data) => {
  const response = await api.post(`/api/warranty/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useWarranty = () => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createWarranty(data),
  });

  return { mutate, data: responseData };
};
