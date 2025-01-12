import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';


export const fetchGuarante = async (id) => {
  const response = await api.get(`/api/appendices/admin/${id}/`, {
  });
  return response.data;
};

export const sendGuarante = async (id, data) => {
  const form = new FormData();
  
  data.forEach((element, index) => {
    if (element.file) {
      form.append('file', element.file);  
    }
    if (element.title) {
      form.append('title', element.title);  
    }
  });

  const response = await axios.post(`${OnRun}/api/appendices/admin/${id}/`, form);

  return response.data;
};
