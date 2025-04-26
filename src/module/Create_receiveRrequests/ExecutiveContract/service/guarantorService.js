import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie'; 
import { useGetCompanyInfo } from '../../pages/service';

export const createGuarantor = async (data) => {
  const accessApi = getCookie('accessApi');
  const response = await api.post(`/api/guarantor/admin/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};

export const deleteGuarantor = async (guarantorId) => {
  const accessApi = getCookie('accessApi');
  const response = await api.delete(`/api/guarantor/admin/${guarantorId}/`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};


export const patchGuarantor = async ({ guarantorId, data }) => {
  const accessApi = getCookie('accessApi');
  const response = await api.patch(`/api/guarantor/admin/${guarantorId}/`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};



export const useGuarantor = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createGuarantor(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};

export const useDeleteGuarantor = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => deleteGuarantor(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};


export const usePatchGuarantor = (cartId) => {
  const { refetch: refetchGet } = useGetCompanyInfo(cartId);
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => patchGuarantor(data),
    onSuccess: () => {
      refetchGet();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};






