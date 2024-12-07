import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { MenuItem, Select } from '@mui/material';
import useGetWarranty from '../hooks/getWarranty';
import usePostWarranty from '../hooks/postWarranty';
import { localeText } from '../consts/localText';

const Warranty = () => {
  const { data } = useGetWarranty();
  const { mutate } = usePostWarranty();
  const [comments, setComments] = useState({});
  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      صادرکننده: item.exporter || '',
      'نوع ضمانت نامه': item.kind_of_warranty || '',
      یادداشت: item.comment || '',
      طرح: item.plan || '',
      'تکمیل شده': item.completed || '',
    }));

  const columns = [
    { field: 'exporter', headerName: 'صادرکننده', width: 130 },
    { field: 'kind_of_warranty', headerName: 'نوع ضمانت نامه', width: 130 },
    {
      field: 'comment',
      headerName: 'توضیحات',
      width: 130,
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
    { field: 'plan', headerName: 'طرح', width: 130 },
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
  );
};

export default Warranty;
