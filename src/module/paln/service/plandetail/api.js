import api from 'src/api/apiClient';

export const GetDetailPlan = async (trace_code) => {
  const response = await api.get(`/api/plan/${trace_code}/`);  
  return response.data;
};
