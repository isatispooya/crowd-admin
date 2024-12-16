import { useParams } from 'react-router-dom';
import usePostParticipant from '../../../service/participant/usePostParticipant';
import usePostInvestor from './usePostInvestor';
import useGetParticipant from '../../../service/participant/useGetParticipant';
import useGetReciept from '../../../service/participant/useGetReciept';

export const useDialogPopup = (selectedRow, localData, setLocalData) => {
  const { trace_code } = useParams();
  const { mutate: mutateInquiry } = usePostInvestor(trace_code);
  const { mutate } = usePostParticipant(trace_code);
  const { refetch: refetchParticipant } = useGetParticipant(trace_code);
  const { data: respiet ,refetch: refetchReciept} = useGetReciept(selectedRow && selectedRow.id ? selectedRow.id : null);

  const handleConfirm = (statusSwitch, setOpenDialog) => {
    if (selectedRow) {
      const updatedRow = { ...selectedRow, status: statusSwitch };
      const updatedData = localData.map((row) => 
        row.id === updatedRow.id ? updatedRow : row
      );

      setLocalData(updatedData);

      mutate(
        {
          status: statusSwitch,
          id: updatedRow.id,
        },
        {
          onSuccess: () => refetchParticipant(),
          onError: (error) => console.error('خطا در به‌روزرسانی وضعیت:', error),
        }
      );
    }
    setOpenDialog(false);
  };

    const handlePostInquiry = (id) => {
    mutateInquiry(id, {
      onSuccess: () => {
        refetchReciept();
        refetchParticipant();
      }
    });
  };

  return {
    handleConfirm,
    handlePostInquiry,
    respiet,
    refetchReciept
  };
};
