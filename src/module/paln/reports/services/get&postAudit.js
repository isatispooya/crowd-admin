import api from 'src/api/apiClient';


export const GetAudit = async (trace_code) => {
  const response = await api.get(`/api/audit/report/admin/${trace_code}/`, {
  });
  return response.data;
};

export const PostAudit = async (trace_code, postData) => {
  const formData = new FormData();

  if (postData.file) {
    formData.append('file', postData.file);
  }
  if (postData.title) {
    formData.append('title', postData.title);
  }
  const response = await api.post(`/api/audit/report/admin/${trace_code}/`, formData, {
  });

  return response.data;
};

export const DeleteAudit = async (docId) => {
  const response = await api.delete(`/api/audit/report/admin/${docId}/`, {
  });
  return response.data;
};


