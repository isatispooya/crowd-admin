import axios from 'axios';
import api from 'src/api/apiClient';
import { OnRun } from 'src/api/OnRun';

const updateDetails = async (traceCode, data) => {
  const response = await api.patch(`${OnRun}/api/plan/update/${traceCode}/`, data , );
  return response.data;
};

export default updateDetails;
