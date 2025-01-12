import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useGetProgressReport = () => {
  const getProgressReport = async () => {
    const response = await api.get(`/api/progres/report/all/admin/`, {
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
