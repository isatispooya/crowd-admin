import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import useGetWarranty from '../hooks/getWarranty';
import usePostWarranty from '../hooks/postWarranty';
import { localeText } from '../consts/localText';

const Warranty = () => {
  const { data } = useGetWarranty();
  const { mutate } = usePostWarranty();

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
    { field: 'comment', headerName: 'یادداشت', width: 130 },
    { field: 'plan', headerName: 'طرح', width: 130 },
    { field: 'completed', headerName: 'تکمیل شده', width: 130 },
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
