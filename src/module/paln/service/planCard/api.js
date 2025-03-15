import api from 'src/api/apiClient';

export const GetCardPlan = async () => {
  const response = await api.get(`/api/plans/`, {});
  return response.data;
};

export const updatePlan = async () => {
  const response = await api.patch(`/api/plans/`, {});
  return response.data;
};
