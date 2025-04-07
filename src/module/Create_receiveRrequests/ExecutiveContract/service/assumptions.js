import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createAssumptions = async (data) => {
  const response = await api.post(`/api/assumptions/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useAssumptions = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createAssumptions(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData };
};
