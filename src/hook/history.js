import api from 'src/api/apiClient';

export const fetchHistory = async (id) => {
  try {

    const response = await api.get(`/api/history/admin/${id}/`, {
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching history data:', error);
    throw new Error('Failed to fetch history data.');
  }
};


