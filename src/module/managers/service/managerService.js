import api from 'src/api/apiClient';


export const fetchManager = async (id) => {
  const response = await api.get(`/api/manager/admin/${id}/`, {
  });
  return response.data.data;
};

export const sendManager = async (id, data) => {
  const response = await api.post(`/api/manager/admin/${id}/`, (data = { managers: data }), {
  });

  return response.data;
};
