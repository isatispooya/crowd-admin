import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useVerificationPayment = () => {
  const accessApi = getCookie('accessApi');

  const getVerificationPayment = async () => {
    const response = await api.get(`/api/check/verification/payment/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
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
