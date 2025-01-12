import api from 'src/api/apiClient';


export const fetchPlan = async () => {
  const response = await api.get(`/api/plan/admin/`, {
  });  
  return response.data;
};


export const sendPlanData = async (data) => {  
  const response = await api.post('/api/plan/admin/', data, {
  });

  return response.data;
};



const deletePlan = async (id) => {
  const url = `/api/plan/admin/${id}/`;

  try {
    const response = await api.delete(url, {
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export default deletePlan;
