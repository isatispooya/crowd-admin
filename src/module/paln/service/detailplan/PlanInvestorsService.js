import api from 'src/api/apiClient';


export const fetchPlanInvestors = async (trace_code) => {
  const response = await api.get(`/api/participant/${trace_code}/`, {
  });
  return response.data.data;
};
