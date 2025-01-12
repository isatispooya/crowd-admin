import api from 'src/api/apiClient';


export const postEndOfFundraising = async ({ trace_code, updatedData }) => {
  const response = await api.post(`/api/end/fundraising/admin/${trace_code}/`, updatedData, {
  });

  return response.data;
};

export const getEndOfFundraising = async (trace_code) => {
  const response = await api.get(`/api/end/fundraising/admin/${trace_code}/`, {
  });
  return response.data.date_payments;
};
