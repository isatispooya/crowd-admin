import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const getAllRecievedPayment = async () => {
  const response = await api.get('/api/all/recieved/payment/admin/');
  return response.data;
};

const useAllPayment = () => useQuery({ queryKey: ['allPayment'], queryFn: getAllRecievedPayment });

export default useAllPayment;
