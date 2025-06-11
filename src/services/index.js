import api from '../api/apiClient';

const permissionService = {
  getList: async () => {
    const response = await api.get('/api/permissions/user/');
    return response.data;
  },
};

export default permissionService;
