import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatNumber } from 'src/utils/formatNumbers';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { localeText } from '../consts/localText';
import useGetMyketReport from '../hooks/getMyketReport';

const COLUMNS = [
  {
    field: 'id',
    headerName: 'شناسه',
    width: 70,
  },
  {
    field: 'projectName',
    headerName: 'نام طرح',
    width: 250,
  },
  {
    field: 'customerName',
    headerName: 'نام مشتری',
    width: 200,
  },
  {
    field: 'uniqueIdentifier',
    headerName: 'شناسه مشتری',
    width: 200,
  },
  {
    field: 'investment',
    headerName: 'مبلغ سرمایه گذاری (ریال)',
    width: 200,
    renderCell: (params) => formatNumber(params.value),
  },
  {
    field: 'referralCode',
    headerName: 'کد معرف',
    width: 120,
  },
  {
    field: 'marketer',
    headerName: 'معرف',
    width: 150,
  },
  {
    field: 'referralIBAN',
    headerName: 'شماره شبا معرف',
    width: 250,
  },
];

const Bazar = () => {
  const { data: myketData, isError, isPending } = useGetMyketReport();
  const [comments, setComments] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow] = useState(null);

  const rows = React.useMemo(() => {
    if (!myketData) return [];

    return myketData.map((item, index) => ({
      id: index + 1,
      projectName: item.plan,
      customerName: item.user,
      investment: item.value,
      uniqueIdentifier: item.uniqueIdentifier,
      referralCode: item.referal_code,
      referralIBAN: item.account,
      marketer: item.marketer || 'تعیین نشده',
    }));
  }, [myketData]);

  const transformDataForExcel = () => {
    if (!rows || rows.length === 0) {
      console.error('No data available for export');
      return [];
    }
    
    return rows.map((item) => ({
      'شناسه': item.id || '',
      'نام طرح': item.projectName || '',
      'نام مشتری': item.customerName || '',
      'شناسه مشتری': item.uniqueIdentifier || '',
      'مبلغ سرمایه گذاری (ریال)': formatNumber(item.investment) || '0',
      'کد معرف': item.referralCode || '',
      'معرف': item.marketer || '',
      'شماره شبا معرف': item.referralIBAN || '',
    }));
  };

  const renderContent = () => {
    if (isPending) {
      return <div>در حال بارگذاری...</div>;
    }
    if (isError) {
      return <div>خطا در دریافت اطلاعات</div>;
    }
    if (!rows || rows.length === 0) {
      return <div>داده‌ای برای نمایش وجود ندارد</div>;
    }
    
    console.log('Rows data for export:', rows);
    
    return (
      <div>
        <DataGrid
          rows={rows}
          columns={COLUMNS}
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
                fileName="گزارش-بازار"
                customExcelData={() => {
                  console.log('Transforming data for Excel:', rows);
                  return rows.map((item) => ({
                    'شناسه': item.id || '',
                    'نام طرح': item.projectName || '',
                    'نام مشتری': item.customerName || '',
                    'شناسه مشتری': item.uniqueIdentifier || '',
                    'مبلغ سرمایه گذاری (ریال)': formatNumber(item.investment) || '0',
                    'کد معرف': item.referralCode || '',
                    'معرف': item.marketer || '',
                    'شماره شبا معرف': item.referralIBAN || '',
                  }));
                }}
                data={rows}
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

  return (
    <>
      {renderContent()}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>ویرایش توضیحات</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            value={selectedRow ? (comments[selectedRow.id] ?? selectedRow.comment) || '' : ''}
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
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Bazar;
