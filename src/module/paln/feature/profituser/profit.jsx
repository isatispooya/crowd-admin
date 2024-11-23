/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { localeText } from 'src/module/tasks/consts/localText';
import { exportToExcel } from '../../../../utils/excelExport';
import useGetProfit from './service/useProfitGet';

const ProfitPage = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetProfit(trace_code);

  const formatNumber = (value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const roundValue = (value) => {
    if (value === null || value === undefined || Number.isNaN(value)) return '—';
    return Math.round(Number(value)).toLocaleString();
  };

  const fields = [
    { label: 'نام و نام خانوادگی', key: 'user_name' },
    { label: 'مبلغ', key: 'value' },
    { label: 'شماره ملی', key: 'user' },
    { label: 'تعداد گواهی', key: 'amount' },
    { label: 'شماره شبا', key: 'account_number' },
    { label: 'مبلغ سود اول', key: 'value1',  },
    { label: 'مبلغ سود دوم', key: 'value2',  },
    { label: 'مبلغ سود سوم', key: 'value3', },
    { label: 'مبلغ سود چهارم', key: 'value4',  },
  ];

  const columns = useMemo(
    () =>
      fields.map((field) => ({
        field: field.key,
        headerName: field.label,
        flex: 1,
        align: 'center',
        headerAlign: 'center',
        valueFormatter: field.formatter ? (params) => field.formatter(params.value) : undefined,
      })),
    []
  );

  const rows = useMemo(() => {
    if (!data) return [];
    return data.map((row, index) => ({
      id: index,
      ...row,
    }));
  }, [data]);

  const downloadExcel = useCallback(() => {
    try {
      if (!data || data.length === 0) {
        console.error('No data available for export');
        return;
      }

      const excelData = data.map((item, index) => ({
        ردیف: (index + 1).toString(),
        'نام و نام خانوادگی': item.user_name || '',
        مبلغ: formatNumber(item.value) || '',
        'شماره ملی': item.user || '',
        'تعداد گواهی': item.amount || '',
        'شماره شبا': item.account_number || '',
        'مبلغ سود اول': roundValue(item.value1) || '',
        'مبلغ سود دوم': roundValue(item.value2) || '',
        'مبلغ سود سوم': roundValue(item.value3) || '',
        'مبلغ سود چهارم': roundValue(item.value4) || '',
      }));

      exportToExcel(excelData);
    } catch (error) {
      console.error('Error in downloadExcel:', error);
    }
  }, [data]);

  const renderedTable = useMemo(() => {
    if (!data || data.length === 0) return null;
    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
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
                data={rows}
                fileName="گزارش-سود"
                transformDataForExcel={downloadExcel}
              />
            ),
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              outline: 'none !important',
            },
          }}
        />
      </Box>
    );
  }, [data, isLoading, rows, columns, downloadExcel]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <Box sx={{ padding: 1 }}>
        <Box
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            borderRadius: '16px 16px 0 0',
            padding: '6px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            گزارش سود کاربر
          </Typography>
        </Box>
        {renderedTable || (
          <Box
            sx={{
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              mt: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              اطلاعاتی جهت نمایش وجود ندارد !
            </Typography>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ProfitPage;
