import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';


export const fetchDocument = async (id) => {
  const response = await api.get(`/api/documentation/admin/${id}/`, {
  });
  return response.data;
};

export const sendDocument = async (id, data) => {
  const form = new FormData();
  
  data.forEach((element) => {
    if (element.file) {
      form.append('file', element.file); 
    }
    if (element.title) {
      form.append('title', element.title);  
    }
  });

  const response = await axios.post(`${OnRun}/api/documentation/admin/${id}/`, form);

  return response.data;
};
