import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createCompanyInfo = async (data, cartId) => {
  const response = await api.patch(`/api/update/company/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useCompanyInfo = (cartId) => {
  const {refetch:refetchGet}=useGetCompanyInfo(cartId)

  
  const {
    mutate,
    data: responseData,
    isLoading,
    isError,
    error
  } = useMutation({
    mutationFn: (data) => createCompanyInfo(data, cartId),
    onSuccess: () => {
      refetchGet()
    },
    onError: (err) => {
      console.error('Error submitting form:', err);
    },
  });

  return { mutate, data: responseData, isLoading, isError, error };
};
