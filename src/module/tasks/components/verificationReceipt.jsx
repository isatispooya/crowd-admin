import { useState } from 'react';
import { CircularProgress, Alert, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useVerificationReceipt from '../hooks/VerificationReceipt';
import usePostVerificationReceipt from '../hooks/postVerificationReceipt';

const VerificationReceipt = () => {
  const { data, isError, isPending } = useVerificationReceipt();
  const { mutate, isPending: isPendingMutation } = usePostVerificationReceipt();
  const [comments, setComments] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [operationType, setOperationType] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);

  if (isPending) return <CircularProgress />;
  if (isError) return <Alert severity="error">دریافت اطلاعات با خطا مواجه شد</Alert>;

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmSubmit = () => {
    const mutationData = {
      id: selectedRow.id,
      operation_type: operationType,
      payment_status: paymentStatus,
      profit_payment_comment: comments[selectedRow.id] || selectedRow.profit_payment_comment,
    };
    mutate(mutationData);
    handleCloseModal();
  };

  const columns = [
    { field: 'amount_operator', headerName: 'مبلغ', width: 130 },
    { field: 'date_capitalization_operator', headerName: 'تاریخ سود سرمایه گذار', width: 180 },
    { field: 'date_operator', headerName: 'تاریخ', width: 130 },
    { field: 'plan', headerName: 'طرح', width: 130 },
    {
      field: 'profit_payment_comment',
      headerName: 'کامنت',
      width: 200,
      renderCell: (params) => (
        <input
          type="text"
          style={{ background: 'transparent' }}
          value={(comments[params.row.id] ?? params.row.profit_payment_comment) || ''}
          onChange={(e) => {
            setComments((prev) => ({
              ...prev,
              [params.row.id]: e.target.value,
            }));
          }}
          onBlur={() => {
            mutate({
              id: params.row.id,
              profit_payment_comment: comments[params.row.id] ?? params.row.profit_payment_comment,
              profit_payment_completed: params.row.profit_payment_completed,
            });
          }}
        />
      ),
    },
    {
      field: 'profit_payment_completed',
      headerName: 'سود پرداخت تکمیل شده',
      width: 200,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => {
            mutate({
              id: params.row.id,
              profit_payment_comment: comments[params.row.id] ?? params.row.profit_payment_comment,
              profit_payment_completed: e.target.value,
            });
          }}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="true">بله</MenuItem>
          <MenuItem value="false">خیر</MenuItem>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        disableColumnMenu
      />
    </div>
  );
};

export default VerificationReceipt;
