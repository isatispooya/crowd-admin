import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createBoardOfDirectors = async (cartId, data) => {
  const response = await api.patch(`/api/update/company/member/admin/${cartId}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useBoardOfDirectors = (cartId) => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createBoardOfDirectors(cartId, data),
  });

  return { mutate, data: responseData };
};
