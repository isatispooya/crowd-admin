import api from 'src/api/apiClient';


export const getValidation = async (id) => {
  const response = await api.get(`/api/validation/admin/${id}/`, {
  });
  return response.data;
};

export const postValidation = async ({ cartId, formData }) => {
  
  const form = new FormData();
  for (let index = 0; index < formData.length; index += 1) {
    
    const element = formData[index];

    if (
      element.file_manager &&
      typeof element.file_manager !== "string"
    ) {
      form.append(element.national_code, element.file_manager);
    }


    form.append(`lock_${element.national_code}`, element.lock);
    
    if (element.date) {
      const timestamp = new Date(element.date).getTime();
      form.append(`${element.national_code}_date`, timestamp);
    }
  }

  const response = await api.post(`/api/validation/admin/${cartId}/`, form, {
  });

  return response.data;
};
