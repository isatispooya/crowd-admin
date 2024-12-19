import api from 'src/api/apiClient';


export const getGuaranty = async (trace_code) => {
  const response = await api.get(`/api/warranty/admin/${trace_code}/`, {
  });

  return response.data;
};

export const PostGuaranty = async (trace_code, dataToSubmit) => {
  const response = await api.post(`/api/warranty/admin/${trace_code}/`, dataToSubmit, {
  });

  return response.data;
};

export const DeleteGuaranty = async (trace_code, docId) => {
  const response = await api.delete(`/api/warranty/admin/${trace_code}/`, {
    data: { id: docId },
  });

  return response.data;
};

export const UpdateGuaranty = async ( updateData) => {
  const response = await api.patch(`/api/warranty/admin/`, updateData, {
  });

  return response.data;
};
