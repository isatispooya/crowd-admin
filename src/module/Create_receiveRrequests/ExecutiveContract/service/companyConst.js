import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createCompanyConst = async (data) => {
  const response = await api.post(`/api/company/cost/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteCompanyConst = async (id) => {
  const response = await api.delete(`/api/company/cost/admin/${id}/`);
  return response.data;
};



export const useCompanyConst = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);

  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createCompanyConst(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};

export const useDeleteCompanyConst = (id) => {
  const { refetch: refetchGet } = useGetCompanyInfo(id);
  const { mutate } = useMutation({
    mutationFn: () => deleteCompanyConst(id),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error deleting company const:', error);
    },
  });

  return { mutate };
};
