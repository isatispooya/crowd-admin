import api from 'src/api/apiClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGetCompanyInfo } from '../../pages/service';

export const createChecks = async (data) => {
  const response = await api.post(`/api/checks/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const deleteChecks = async (id) => {
  const response = await api.delete(`/api/checks/admin/${id}/`);
  return response.data;
};

export const useChecks = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const {
    mutate,
    data: responseData,
    refetch,
  } = useMutation({
    mutationFn: (data) => createChecks(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};

export const useDeleteChecks = () => {
  const queryClient = useQueryClient();
  
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (id) => deleteChecks(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['companyInfo']);
    },
    onError: (error) => {
      console.error('Error deleting check:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};


