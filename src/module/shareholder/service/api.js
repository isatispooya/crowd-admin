import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';


export const getShareholder = async (id) => {
  const response = await api.get(`/api/shareholder/admin/${id}/`, {
  });

  return response.data;
};

export const postShareholder = async ({ cartId, formSections }) => {
  const response = await axios.post(
    `${OnRun}/api/shareholder/admin/${cartId}/`,
    { formSections },
  );

  return response.data;
};
