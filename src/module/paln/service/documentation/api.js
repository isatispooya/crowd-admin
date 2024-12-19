import api from 'src/api/apiClient';


export const GetDocument = async (trace_code) => {
  const response = await api.get(`/api/documentation/${trace_code}/`, {
  });
  return response.data;
};

export const PostDocument = async (trace_code, postData) => {
  const formData = new FormData();

  if (postData.file) {
    formData.append('file', postData.file);
  }
  if (postData.title) {
    formData.append('title', postData.title);
  }
  const response = await api.post(`/api/documentation/${trace_code}/`, formData, {
  });

  return response.data;
};

export const DeleteDocument = async (docId) => {
  const response = await api.delete(`/api/documentation/${docId}/`, {
  });
  return response.data;
};
