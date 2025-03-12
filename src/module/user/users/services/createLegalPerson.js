import api from 'src/api/apiClient';

const createLegalPerson = async (data) => {
  const response = await api.post('/api/register-legal-person-from-rasmio/', data);
  return response.data;
};

export default createLegalPerson;
