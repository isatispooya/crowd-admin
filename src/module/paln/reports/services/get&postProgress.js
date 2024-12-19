import api from 'src/api/apiClient';


export const GetProgress = async (trace_code) => {
  const response = await api.get(`/api/progres/report/admin/${trace_code}/`, {
  });
  return response.data;
};



export const DeleteProgress = async (docId) => {
  const response = await api.delete(`/api/progres/report/admin/${docId}/`, {
  });
  return response.data;
};
