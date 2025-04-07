import React, { useState } from 'react';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import useGetProgressReport from '../hooks/getProgressReport';
import { localeText } from '../consts/localText';
import usePostProgresss from '../hooks/postProgresss';

const ProgressReport = () => {
  const { data } = useGetProgressReport();
  const { mutate } = usePostProgresss();
  const [comments, setComments] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      شناسه: item.id || '',
      عنوان: item.title || '',
      تاریخ: item.date || '',
      دوره: item.period || '',
      توضیحات: item.comment || '',
      وضعیت: item.completed ? 'تکمیل شده' : 'در حال انجام',
    }));
   

  const columns = [
    {
      field: 'id',
      headerName: 'شناسه',
      width: 90,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      width: 200,
    },
    {
      field: 'date',
      headerName: 'تاریخ',
      width: 130,
    },
    {
      field: 'period',
      headerName: 'دوره',
      width: 100,
      
    },
    {
      field: 'plan',
      headerName: 'طرح',
      width: 100,
    },
    {
      field: 'comment',
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
          {(comments[params.row.id] ?? params.row.comment) || 'افزودن توضیحات'}
        </div>
      ),
    },
    {
      field: 'completed',
      headerName: 'وضعیت',
      width: 120,
      renderCell: (params) => (
        <Select
          value={params.row.completed}
          onChange={(e) => {
            params.row.completed = e.target.value;
            mutate({
              id: params.row.id,
              comment: comments[params.row.id] ?? params.row.comment,
              completed: e.target.value,
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
    <>
      <div>
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
          <Button 
            onClick={() => {
              if (selectedRow) {
                mutate({
                  id: selectedRow.id,
                  comment: comments[selectedRow.id] ?? selectedRow.comment,
                  completed: selectedRow.completed,
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

export default ProgressReport;
