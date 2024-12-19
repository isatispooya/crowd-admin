import api from 'src/api/apiClient';


export const getComment = async (trace_code) => {
  const response = await api.get(`/api/comment/admin/${trace_code}/`, {
  });
  return response.data;
};

export const postComment = async (id, data) => {
  const response = await api.patch(
    `/api/comment/admin/${id}/`,
    {
      status: data.status,
      answer: data.answer,
    },
  );
  return response.data;
};
