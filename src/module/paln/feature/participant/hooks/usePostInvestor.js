import { useMutation } from '@tanstack/react-query';

import api from 'src/api/apiClient';

const usePostInvestor = (traceCode) => {
  const sendInvestor = async (id) => {
    const response = await api.post(
      `api/payment/inquiry/admin/${traceCode}/`,
      { id },
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
