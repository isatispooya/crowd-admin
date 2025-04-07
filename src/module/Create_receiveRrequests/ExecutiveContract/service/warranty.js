import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createWarranty = async (data) => {
  const response = await api.post(`/api/warranty/investor/request/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useWarranty = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createWarranty(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
