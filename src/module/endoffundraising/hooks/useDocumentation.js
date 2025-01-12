import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';

// تابع برای دریافت اطلاعات
const getData = async (id) => {
  const response = await axios.get(`${OnRun}/api/documation/recieve/admin/${id}/`, {
  });
  return response.data;
};

const postDate = async (id, date) => {
  const response = await axios.post(`${OnRun}/api/documation/recieve/admin/${id}/`, date, {
  });
  return response.data;
};

const updateData = async (id, formData) => {
  const response = await axios.patch(`${OnRun}/api/documation/recieve/admin/${id}/`, formData, {
  });
  return response.data;
};

export const useFetchDocumentation = (id) => {
  const queryResult = useQuery({
    queryKey: ['documentation', id],
    queryFn: () => getData(id),
    enabled: !!id,
  });

  const postMutation = useMutation({
    mutationKey: ['postendof'],
    mutationFn: (date) => postDate(id, date),
    onSuccess: () => {
      toast.success('اطلاعات با موفقیت ارسال شد ');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (formData) => updateData(id, formData),
    onSuccess: () => {
      toast.success('تغییرات شما با موفقیت اعمال شد');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    ...queryResult,
    postDate: postMutation.mutate,
    updateData: updateMutation.mutate,
    getData: queryResult.refetch,
  };
};
