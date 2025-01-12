import api from 'src/api/apiClient';


export const getCardStatusRisk = async (cartId) => {
  const response = await api.get(`/api/update/risk/commitee/admin/${cartId}/`, {
  });
  return response.data;
};

export const postCardStatusRisk = async (id, data) => {
  const response = await api.post(
    `/api/update/risk/commitee/admin/${id}/`,
    {
      risk_committee: data,
    },

  );
  return response.data;
};
