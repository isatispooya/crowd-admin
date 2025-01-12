import api from "src/api/apiClient";



export const fetchStatus = async (id) => {
  
    try {
      
      const response = await api.get(`/api/setstatus/${id}/`, {
      });
      
      return response.data;
    } catch (error) {
      console.error('Error fetching manager data:', error);
      throw new Error('Failed to fetch manager data.');
    }
  };


