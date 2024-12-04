import React, { useState } from 'react';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem, Select } from '@mui/material';
import { localeText } from '../consts/localText';
import useGetAuditt from '../hooks/getAudit';
import usePostAuditt from '../hooks/postAuditt';

const AuditReport = () => {
  const { data } = useGetAuditt();
  const { mutate } = usePostAuditt();


  console.log(data)
  const [comments, setComments] = useState({});
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
        <input
          type="text"
          style={{ background: 'transparent' }}
          value={(comments[params.row.id] ?? params.row.comment) || ''}
          onChange={(e) => {
            setComments((prev) => ({
              ...prev,
              [params.row.id]: e.target.value,
            }));
          }}
        />
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
  );
};

export default AuditReport;
