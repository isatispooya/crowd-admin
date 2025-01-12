import api from 'src/api/apiClient';

export const fetchPayment = async () => {

  const response = await api.get(`/api/transaction/admin/`, {
  });

  return response.data.transaction;
};
