import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import moment from 'moment-jalaali';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import moment from 'moment-jalaali';

import useGetWarranty from '../hooks/getWarranty';
import usePostWarranty from '../hooks/postWarranty';
import { localeText } from '../consts/localText';


const Warranty = () => {
  const { data } = useGetWarranty();
  console.log('Warranty data:', data);
  const { mutate } = usePostWarranty();
  const [comments, setComments] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      صادرکننده: item.exporter || '',
      'نوع ضمانت نامه': item.kind_of_warranty || '',
      یادداشت: item.comment || '',
      طرح: item.plan || '',
      'تکمیل شده': item.completed || '',
      تاریخ: item.date ? moment(item.date).format('jYYYY/jMM/jDD') : '',
    }));

  const columns = [

    { field: 'exporter', headerName: 'صادرکننده', width: 250 },
    { field: 'kind_of_warranty', headerName: 'نوع ضمانت نامه', width: 160 },
    { 
      field: 'date', 
      headerName: 'تاریخ', 
      width: 130,
      valueFormatter: (params) => {
        console.log('Formatting date:', params.value);
        if (!params.value) return '';
        const persianDate = moment(params.value, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        console.log('Converted to Persian:', persianDate);
        return persianDate;
      },
      renderCell: (params) => {
        if (!params.value) return '';
        return moment(params.value, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
      }
    },

    {
      field: 'comment',
      headerName: 'توضیحات',
      width: 170,
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
    { field: 'plan', headerName: 'طرح', width: 200 },
    {
      field: 'completed',
      headerName: 'تکمیل ',
      width: 130,
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
                fileName="گزارش-ضمانت‌نامه"
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

export default Warranty;
