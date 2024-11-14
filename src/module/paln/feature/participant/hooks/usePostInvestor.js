import { useMutation } from '@tanstack/react-query';

import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const usePostInvestor = (traceCode) => {
  const accessApi = getCookie('accessApi');
  const sendInvestor = async (id) => {
    const response = await api.post(
      `api/payment/inquiry/admin/${traceCode}/`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessApi}`,
        },
      }
    );
    return response.data;
  };

  const { mutate, data, isLoading, isPending } = useMutation({
    mutationKey: ['sendInvestor'],
    mutationFn: sendInvestor,
  });

  return { mutate, data, isLoading, isPending };
};

export default usePostInvestor;
