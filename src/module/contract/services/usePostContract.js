import { useMutation } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const postContract = async ({ cartId, contractData }) => {
 


  const response = await api.post(
    `/api/setcart/admin/${cartId}/`,
    contractData,
  );

  return response.data.cart;
};

const UsePostContract = (cartId) => {
  const { mutate, isLoading, IsError, isPending, error } = useMutation({
    mutationKey: ['contract', cartId],
    mutationFn: (contractData) => postContract({ cartId, contractData }),
  });
  return {
    mutate,
    isLoading,
    IsError,
    isPending,
    error,
  };
};

export default UsePostContract;
