import { useState } from 'react';
import { CircularProgress, Alert, Select, MenuItem, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import useVerificationReceipt from '../hooks/VerificationReceipt';
import usePostVerificationReceipt from '../hooks/postVerificationReceipt';
import { localeText } from '../consts/localText';

const VerificationReceipt = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { data, isError, isPending } = useVerificationReceipt();

  const { mutate } = usePostVerificationReceipt();
  const [comments, setComments] = useState({});

  if (isPending) return <CircularProgress />;
  if (isError) return <Alert severity="error">دریافت اطلاعات با خطا مواجه شد</Alert>;

  const columns = [
    {
      field: 'amount_operator',
      headerName: 'مبلغ',
      width: 130,
      valueFormatter: (value) => {
        const numValue = Number(value);
        if (Number.isNaN(numValue)) return '0';
        return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      },
    },
    { field: 'date_operator', headerName: 'تاریخ', width: 130 },
    { field: 'plan', headerName: 'طرح', width: 130 },
    {
      field: 'profit_receipt_comment',
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
          {(comments[params.row.id] ?? params.row.profit_receipt_comment) || 'افزودن توضیحات'}
        </div>
      ),
    },
    {
      field: 'profit_receipt_completed',
      headerName: 'تکمیل',
      width: 200,
      renderCell: (params) => {
        const currentValue = String(params.value);

        return (
          <Select
            value={currentValue}
            onChange={(e) => {
              const newValue = e.target.value === 'true';
              params.row.profit_receipt_completed = newValue;
              mutate({
                id: params.row.id,
                profit_receipt_comment:
                  comments[params.row.id] ?? params.row.profit_receipt_comment,
                profit_receipt_completed: newValue,
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

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      مبلغ: item.amount_operator || '0',
      تاریخ: item.date_operator || '',
      طرح: item.plan || '',
      توضیحات: item.profit_receipt_comment || '',
      'سود پرداخت تکمیل شده': item.profit_receipt_completed === 'true' ? 'بله' : 'خیر',
    }));

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
                fileName="گزارش-سود"
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
            value={selectedRow ? (comments[selectedRow.id] ?? selectedRow.profit_receipt_comment) || '' : ''}
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
                  profit_receipt_comment: comments[selectedRow.id] ?? selectedRow.profit_receipt_comment,
                  profit_receipt_completed: selectedRow.profit_receipt_completed,
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

export default VerificationReceipt;
