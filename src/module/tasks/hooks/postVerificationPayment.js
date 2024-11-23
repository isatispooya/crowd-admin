import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostVerificationPayment = () => {
  const queryClient = useQueryClient();
  const accessApi = getCookie('accessApi');

  const patchVerificationPayment = async (data) => {
    const response = await api.patch(`/api/check/verification/payment/admin/`, data, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchVerificationPayment'],
    mutationFn: patchVerificationPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verificationPayment'] });
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostVerificationPayment;
