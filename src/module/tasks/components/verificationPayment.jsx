import { CircularProgress, Alert, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import useVerificationPayment from '../hooks/VerificationPayment';
import usePostVerificationPayment from '../hooks/postVerificationPayment';
import { localeText } from '../consts/localText';

const VerificationPayment = () => {
  const { data, isError, isPending } = useVerificationPayment();
  const { mutate } = usePostVerificationPayment();
  const [comments, setComments] = useState({});

  if (isPending) return <CircularProgress />;
  if (isError) return <Alert severity="error">دریافت اطلاعات با خطا مواجه شد</Alert>;

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      مبلغ: item.amount_operator || '0',
      'تاریخ سود سرمایه گذار': item.date_capitalization_operator || '',
      طرح: item.plan || '',
      کامنت: item.profit_payment_comment || '',
      'سود پرداخت تکمیل شده': item.profit_payment_completed === 'true' ? 'بله' : 'خیر',
    }));

  const columns = [
    {
      field: 'amount_operator',
      headerName: 'مبلغ',
      width: 130,
      valueFormatter: (value) => {
        if (!value && value !== 0) return '0';
        const numValue = Number(value);
        if (Number.isNaN(numValue)) return '0';
        return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    { field: 'date_capitalization_operator', headerName: 'تاریخ', width: 180 },
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
      headerName: 'تکمیل شده',
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
        filterMode="client"
        localeText={localeText}
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={data}
              fileName="گزارش-پرداخت"
              customExcelData={transformDataForExcel}
            />
          ),
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default VerificationPayment;
