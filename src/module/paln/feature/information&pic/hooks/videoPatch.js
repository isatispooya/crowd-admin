
import api from 'src/api/apiClient';


const videoPatch = async (trace_code, data) => {
  const response = await api.patch(`/api/load_video/${trace_code}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default videoPatch;
