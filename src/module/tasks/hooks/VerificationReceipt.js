import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useVerificationReceipt = () => {
  const accessApi = getCookie('accessApi');

  const getVerificationReceipt = async () => {
    const response = await api.get(`/api/check/verification/receipt/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ['VerificationReceipt'],
    queryFn: getVerificationReceipt,
  });

  return { data, isError, isPending };
};

export default useVerificationReceipt;
