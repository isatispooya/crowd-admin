import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createCompanyInfo = async (data, cartId) => {
  const response = await api.patch(`/api/update/company/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useCompanyInfo = (cartId) => {
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createCompanyInfo(data, cartId),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
