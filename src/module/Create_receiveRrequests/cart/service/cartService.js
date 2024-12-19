import api from 'src/api/apiClient';


export const getCards = async () => {
  const response = await api.get(`/api/cart/admin/`, {
  });
  
  return response.data;
};

export const deleteCard = async (cardId) => {
  const response = await api.delete(`/api/cart/admin/${cardId}/`, {

  });
  return response.data;
};

export const PostFinish = async ({ cartId, finish_cart }) => {
  
  const response = await api.patch(`/api/update/finish/admin/${cartId}/`, {finish_cart}, {
  });

  return response.data;
};




