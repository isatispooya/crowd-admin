import { useQuery, useQueryClient } from '@tanstack/react-query';

const UseCartId = () => {
  const queryClient = useQueryClient();

  const { data: cartId = 0 } = useQuery({
    queryKey: ['cartId'],
    initialData: 0,
  });

  const setCartId = (unique_id) => {
    queryClient.setQueryData(['cartId'], unique_id);
  };
  return {
    cartId,
    setCartId,
  };
};

export default UseCartId;
