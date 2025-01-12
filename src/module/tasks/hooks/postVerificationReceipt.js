import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import useVerificationReceipt from './VerificationReceipt';

const usePostVerificationReceipt = () => {
  const queryClient = useQueryClient();
  const { refetch: refreshList } = useVerificationReceipt();

  const patchVerificationReceipt = async (data) => {
    const response = await api.patch(`/api/check/verification/receipt/admin/`, data, {
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchVerificationReceipt'],
    mutationFn: patchVerificationReceipt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verificationReceipt'] });
      refreshList();
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostVerificationReceipt;
