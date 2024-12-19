import api from 'src/api/apiClient';


export const getComments = async (trace_code) => {
  const response = await api.get(`/api/comment/${trace_code}/`, {
  });
  return response.data;
};

export const postComment = async ( trace_code, data ) => {
  const response = await api.patch(`/api/comment/${trace_code}/`, data, {
  });
  return response.data;
};
