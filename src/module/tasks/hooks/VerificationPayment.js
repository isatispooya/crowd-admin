import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useVerificationPayment = () => {

  const getVerificationPayment = async () => {
    const response = await api.get(`/api/check/verification/payment/admin/`, {
    });
    return response.data;
  };
  const { data, isError, isPending, refetch } = useQuery({
    queryKey: ['verificationPayment'],
    queryFn: getVerificationPayment,
  });

  return { data, isError, isPending, refetch };
};

export default useVerificationPayment;
