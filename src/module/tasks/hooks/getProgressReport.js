import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useGetProgressReport = () => {
  const getProgressReport = async () => {
    const accessApi = getCookie('accessApi');
    const response = await api.get(`/api/progres/report/all/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
    });
    return response.data;
  };
  const { data, isError, isPending } = useQuery({
    queryKey: ['progressReportt'],
    queryFn: () => getProgressReport(),
  });

  return { data, isError, isPending };
};
export default useGetProgressReport;
