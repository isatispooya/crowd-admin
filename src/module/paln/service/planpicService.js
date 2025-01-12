import api from 'src/api/apiClient';


export const sendPic = async (id, file) => {
  const url = `/api/plan/admin/${id}/`;
  const formData = new FormData();
    formData.append('picture', file); 
  const response = await api.post(url, formData, {
  });

  return response.data;
};
