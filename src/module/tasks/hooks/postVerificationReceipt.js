import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostVerificationReceipt = () => {
  const queryClient = useQueryClient();
  const accessApi = getCookie('accessApi');

  const patchVerificationReceipt = async (data) => {
    const requestData = {
      profit_receipt_comment: data.profit_payment_comment,
      profit_receipt_completed: data.profit_receipt_completed,
    };

    const response = await api.patch(
      `/api/check/verification/receipt/admin/${data.id}/`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessApi}`,
        },
      }
    );
    return response.data;
  };

  const { mutate, data, isError, isPending } = useMutation({
    mutationKey: ['patchVerificationReceipt'],
    mutationFn: patchVerificationReceipt,
    onSuccess: (newData, variables) => {
      queryClient.setQueryData(['verificationReceipt'], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((item) =>
          item.id === variables.id
            ? {
                ...item,
                profit_payment_comment: variables.profit_payment_comment,
                profit_receipt_completed:
                  variables.operation_type === 'comment'
                    ? item.profit_receipt_completed
                    : variables.profit_receipt_completed,
              }
            : item
        );
      });
    },
  });

  return { mutate, data, isError, isPending };
};

export default usePostVerificationReceipt;
