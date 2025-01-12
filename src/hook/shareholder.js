

import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

export const fetchShareholder = async (id) => {
  try {
    
    const response = await api.get(`/api/shareholder/admin/${id}/`, {
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching manager data:', error);
    throw new Error('Failed to fetch manager data.');
  }
};



export const sendShareholder = async (id, data) => {
    try {
      const url = `${OnRun}/api/shareholder/admin/${id}/`;
  
      const response = await axios.post(url, data={shareholder:data}, {
      });
  
      return response.data;
    } catch (error) {
      console.error('Error sending manager data:', error);
      throw new Error('Failed to send manager data.');
    }
  };
  