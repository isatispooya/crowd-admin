import { CircularProgress, Alert, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      headerName: 'توضیحات',
      width: 200,
      renderCell: (params) => (
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            setSelectedRow(params.row);
            setOpenDialog(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setSelectedRow(params.row);
              setOpenDialog(true);
            }
          }}
          style={{ cursor: 'pointer', width: '100%' }}
        >
          {(comments[params.row.id] ?? params.row.profit_payment_comment) || 'افزودن توضیحات'}
        </div>
      ),
    },
    {
      field: 'profit_payment_completed',
      headerName: 'تکمیل شده',
      width: 200,
      renderCell: (params) => {
        const currentValue = String(params.value);

        return (
          <Select
            value={currentValue}
            onChange={(e) => {
              const newValue = e.target.value === 'true';
              params.row.profit_payment_completed = newValue;
              mutate({
                id: params.row.id,
                profit_payment_comment:
                  comments[params.row.id] ?? params.row.profit_payment_comment,
                profit_payment_completed: newValue,
              });
            }}
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="true">بله</MenuItem>
            <MenuItem value="false">خیر</MenuItem>
          </Select>
        );
      },
    },
  ];

  return (
    <>
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

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ویرایش توضیحات</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            value={selectedRow ? (comments[selectedRow.id] ?? selectedRow.profit_payment_comment) || '' : ''}
            onChange={(e) => {
              if (selectedRow) {
                setComments((prev) => ({
                  ...prev,
                  [selectedRow.id]: e.target.value,
                }));
              }
            }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>انصراف</Button>
          <Button 
            onClick={() => {
              if (selectedRow) {
                mutate({
                  id: selectedRow.id,
                  profit_payment_comment: comments[selectedRow.id] ?? selectedRow.profit_payment_comment,
                  profit_payment_completed: selectedRow.profit_payment_completed,
                });
              }
              setOpenDialog(false);
            }}
          >
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VerificationPayment;
