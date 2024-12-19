import api from 'src/api/apiClient';


export const GetParticipant = async (trace_code) => {
  const response = await api.get(`/api/payment/document/${trace_code}/`, {
  });
  return response.data;
};

export const postInvistor = async (trace_code, data) => {
  const response = await api.patch(`/api/payment/document/${trace_code}/`, data, {
  });
  return response.data;
};
