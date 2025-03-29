import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';
import { getCookie } from 'src/api/cookie'; 

export const createGuarantor = async (data) => {
  const accessApi = getCookie('accessApi');
  const response = await api.post(`/api/guarantor/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessApi}`,
    },
  });

  return response.data;
};

export const useGuarantor = () => {
  const { mutate, data: responseData, refetch } = useMutation({
    mutationFn: (data) => createGuarantor(data),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  return { mutate, data: responseData, refetch };
};
