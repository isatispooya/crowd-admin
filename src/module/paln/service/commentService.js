import api from 'src/api/apiClient';


export const fetchCommit = async (trace_code) => {
  const response = await api.get(`/api/comment/admin/${trace_code}/`, {
  });
  return response.data;
};

export const sendCommit = async (id, data) => {
  const url = `/api/comment/admin/${id}/`;
  const response = await api.patch(
    url,
    {
      status: data.status,
    }
  );
  return response.data;
};
