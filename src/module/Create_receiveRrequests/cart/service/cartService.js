import api from 'src/api/apiClient';

import { useQuery } from '@tanstack/react-query';

export const getCards = async () => {
  const response = await api.get(`/api/investor/request/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await api.delete(`/api/cart/admin/${cardId}/`, {});
  return response.data;
};

export const PostFinish = async ({ cartId, finish_cart }) => {
  const response = await api.patch(`/api/update/finish/admin/${cartId}/`, { finish_cart }, {});

  return response.data;
};

const useGetCards = () => {
  const { data: responseData } = useQuery({
    queryKey: ['getCards'],
    queryFn: getCards,
  });

  return { data: responseData };
};

export default useGetCards;
