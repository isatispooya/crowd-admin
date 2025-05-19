import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createFees = async (data, cartId) => {
  const response = await api.patch(`/api/update/investor/request/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useFees = (cartId) => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createFees(data, cartId),
  });

  return { mutate, data: responseData };
};
