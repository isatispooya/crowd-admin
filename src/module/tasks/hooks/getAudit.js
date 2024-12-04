import { useQuery } from '@tanstack/react-query';
import api from 'src/api/apiClient';
import { getCookie } from 'src/api/cookie';

const useGetAuditt = () => {
  const getAudit = async () => {
    const accessApi = getCookie('accessApi');
    const response = await api.get(`/api/audit/report/all/admin/`, {
      headers: {
        Authorization: `Bearer ${accessApi}`,
      },
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
