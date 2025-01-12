import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useVerificationReceipt = () => {

  const getVerificationReceipt = async () => {
    const response = await api.get(`/api/check/verification/receipt/admin/`, {
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
