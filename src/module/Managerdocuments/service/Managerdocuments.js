import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';


export const fetchResume = async (id) => {
  const response = await api.get(`/api/resume/admin/${id}/`, {
  });
  return response.data;
};

export const sendResume = async (id, data) => {
  const form = new FormData();
  for (let index = 0; index < data.length; index += 1) {
    const element = data[index];
    form.append(element.national_code, element.file);
  }
  const response = await axios.post(`${OnRun}/api/resume/admin/${id}/`, form, {
  });

  return response.data;
};
