import api from 'src/api/apiClient';


export const GetProfit = async (trace_code) => {
  const response = await api.get(`/api/report/admin/profitability/${trace_code}/`, {
  });

  return response.data;
};
