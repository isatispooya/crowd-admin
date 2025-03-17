import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const createChecks = async (data) => {
  const response = await api.post(`/api/checks/admin/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useChecks = () => {
  const { mutate, data: responseData } = useMutation({
    mutationFn: (data) => createChecks(data),
  });

  return { mutate, data: responseData };
};
