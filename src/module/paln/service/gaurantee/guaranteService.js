import api from 'src/api/apiClient';

export const GetGuarante = async (trace_code) => {
  const response = await api.get(`/api/appendices/${trace_code}/`, {});
  return response.data;
};

export const PostGuarante = async (trace_code, data) => {
  const formData = new FormData();

  if (data.file) {
    formData.append('file', data.file);
  }
  if (data.logo) {
    formData.append('logo', data.logo);
  }
  if (data.title) {
    formData.append('title', data.title);
  }

  const response = await api.post(`/api/appendices/${trace_code}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const DeleteGuarante = async (docId) => {
  const response = await api.delete(`/api/appendices/${docId}/`, {});
  return response.data;
};
