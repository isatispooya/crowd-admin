import api from 'src/api/apiClient';
import { useMutation } from '@tanstack/react-query';

export const bankValidate = async (data) => {
  const response = await api.post('/api/payment/inquiry/', data);
  return response.data;
};

export const useBankValidate = () =>
  useMutation({
    mutationKey: ['bankValidate'],
    mutationFn: (data) => bankValidate(data),
  });

export default bankValidate;
