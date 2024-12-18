import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useGetMyketReport = () => {
  const getMyketReport = async () => {
    const accessApi = getCookie('accessApi');
    const response = await api.get(`/api/market/report/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };

  const { data, isError, isPending } = useQuery({
    queryKey: ['myketReport'],
    queryFn: () => getMyketReport(),
  });

  return { data, isError, isPending };
};

export default useGetMyketReport; 