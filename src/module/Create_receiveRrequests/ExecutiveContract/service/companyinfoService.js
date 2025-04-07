import api from 'src/api/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createCompanyInfo = async (data, cartId) => {
  const response = await api.patch(`/api/update/company/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useCompanyInfo = (cartId) => {
  const queryClient = useQueryClient();
  
  const {
    mutate,
    data: responseData,
    isLoading,
    isError,
    error
  } = useMutation({
    mutationFn: (data) => createCompanyInfo(data, cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo', cartId]);
    },
    onError: (err) => {
      console.error('Error submitting form:', err);
    },
  });

  return { mutate, data: responseData, isLoading, isError, error };
};
