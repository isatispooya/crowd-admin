import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';

const useGetAuditt = () => {
  const getAudit = async () => {
    const response = await api.get(`/api/audit/report/all/admin/`, {
    });
    return response.data;
  };
  const { data, isError, isPending } = useQuery({
    queryKey: ['audittt'],
    queryFn: () => getAudit(),
  });

  return { data, isError, isPending };
};
export default useGetAuditt;
