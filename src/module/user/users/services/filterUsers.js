import api from 'src/api/apiClient';

const filterUsers = async (filters) => {
  const response = await api.get('/api/listuser/admin/', { params: filters });
  return response.data;
};

export default filterUsers;
