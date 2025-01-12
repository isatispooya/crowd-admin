import api from 'src/api/apiClient';

export const fetchShareholder = async (cartId) => {  
  const response = await api.get(`/api/shareholder/admin/${cartId}/`, {
  });
  return response.data;
};

export const sendShareholder = async (cartId, formSections) => {  
  const response = await api.post(
    `/api/shareholder/admin/${cartId}/`,
    (formSections = { shareholder: formSections }),
  );

  return response.data;
};
