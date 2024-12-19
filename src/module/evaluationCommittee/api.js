import api from 'src/api/apiClient';


export const getCardStatusEvaluation = async (cartId) => {
  const response = await api.get(`/api/update/evaluation/commitee/admin/${cartId}/`, {
  });
  return response.data;
};

export const postCardStatusEvaluation = async (id, data) => {
  const response = await api.post(
    `/api/update/evaluation/commitee/admin/${id}/`,
    {
      evaluation_committee: data,
    }
  );
  return response.data;
};

