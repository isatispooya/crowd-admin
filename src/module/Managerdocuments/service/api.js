import api from 'src/api/apiClient';

export const getResume = async (cartId) => {
  const response = await api.get(`/api/resume/admin/${cartId}/`, {
  });
  return response.data;
};

export const postResume = async ({cartId, formData}) => {
  const form = new FormData();
  for (let index = 0; index < formData.length; index += 1) {
    const element = formData[index];
    
      form.append(element.national_code, element.file); 
    form.append(`${element.national_code}_lock`, element.lock);
  }
  const response = await api.post(`api/resume/admin/${cartId}/`, form, {
  });

  return response.data;
};


