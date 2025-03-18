import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createCompanyConst = async (data) => {
  const response = await api.post(`/api/company/cost/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useCompanyConst = () => {
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createCompanyConst(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
