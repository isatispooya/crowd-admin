/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress, Backdrop } from '@mui/material';
import moment from 'moment-jalaali';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { useParams } from 'react-router-dom';
import { localeText } from 'src/module/tasks/consts/localText';
import useGetParticipant from '../../service/participant/useGetParticipant';
import useGetReciept from '../../service/participant/useGetReciept';
import { errorMsg } from './dargahmsg';
import { exportToExcel } from '../../../../utils/excelExport';
import DialogPopup from './dialogPopup';

const PlanInvestors = () => {
  const { trace_code } = useParams();
  const { data, isPending } = useGetParticipant(trace_code);

  const [status, setStatus] = useState('0');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [statusSwitch, setStatusSwitch] = useState(false);
  const [localData, setLocalData] = useState([]);
  const { data: respiet } = useGetReciept(selectedRow?.id);

  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const customFilter = useCallback(
    (data) =>
      data.filter(
        (item) =>
          (statusFilter === 'all' || item.status === statusFilter) &&
          (typeFilter === 'all' ||
            (typeFilter === 'bank'
              ? item.document === true
              : typeFilter === 'gateway'
              ? item.document === false
              : true))
      ),
    [statusFilter, typeFilter]
  );

  useEffect(() => {
    if (data) {
      setLocalData(customFilter(data));
    }
  }, [data, customFilter]);

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const downloadExcel = useCallback(() => {
    try {
      if (!data || data.length === 0) {
        console.error('No data available for export');
        return;
      }

      const excelData = data.map((item, index) => {
        let statusText;
        switch (item.status) {
          case '0':
            statusText = 'رد شده';
            break;
          case '1':
            statusText = 'در حال بررسی';
            break;
          case '2':
            statusText = 'تایید موقت';
            break;
          case '3':
            statusText = 'تایید نهایی';
            break;
          default:
            statusText = 'نامشخص';
        }

        return {
          ردیف: (index + 1).toString(),
          'نام و نام خانوادگی': item.fulname || '',
          'شماره همراه': item.mobile || '',
          نوع: item.document === true ? 'فیش بانکی' : 'درگاه',
          مقدار: item.amount || '',
          'کدملی/شناسه': item.user || '',
          'تاریخ ایجاد': formatDate(item.invoice_date) || '',
          مبلغ: item.value,
          'وضعیت درگاه': errorMsg[item.code_status_payment] || item.code_status_payment || '',
          'شماره پیگیری': item.track_id || '',
          'شماره ارجاع درگاه': item.reference_number || '',
          وضعیت: statusText,
        };
      });

      exportToExcel(excelData);
    } catch (error) {
      console.error('Error in downloadExcel:', error);
    }
  }, [data]);

  const handleStatusClick = (row) => {
    setSelectedRow(row);
    setStatus(row.status);
    setStatusSwitch(row.status);
    setOpenDialog(true);
  };

  const columns = [
    {
      field: 'fulname',
      headerName: 'نام و نام خانوادگی',
      width: 200,
      filterable: true,
    },
    {
      field: 'amount',
      headerName: 'مقدار سهم',
      width: 150,
      filterable: true,
    },
    {
      field: 'value',
      headerName: 'مبلغ',
      width: 200,
      valueFormatter: (params) => formatNumber(params.value),
    },
    {
      field: 'create_date',
      headerName: 'تاریخ ایجاد',
      width: 200,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format('jYYYY/jMM/jDD HH:mm') : 'تاریخ مشخص نشده',
    },
    {
      field: 'name_status',
      headerName: 'وضعیت نام',
      width: 150,
      valueFormatter: (params) => (params.value ? 'فعال' : 'غیر فعال'),
    },
    {
      field: 'document',
      headerName: 'نوع',
      width: 150,
      valueFormatter: (params) => (params.value ? 'فیش بانکی' : 'درگاه'),
    },
    {
      field: 'status',
      headerName: 'وضعیت',
      width: 150,
      renderCell: (params) => {
        let statusText;
        switch (params.value) {
          case '0':
            statusText = 'رد شده';
            break;
          case '1':
            statusText = 'در حال بررسی';
            break;
          case '2':
            statusText = 'تایید موقت';
            break;
          case '3':
            statusText = 'تایید نهایی';
            break;
          default:
            statusText = 'نامشخص';
        }
        return (
          <button
            type="button"
            onClick={() => handleStatusClick(params.row)}
            onKeyDown={(e) => e.key === 'Enter' && handleStatusClick(params.row)}
            style={{ cursor: 'pointer', background: 'none', border: 'none' }}
          >
            {statusText}
          </button>
        );
      },
    },
    {
      field: 'track_id',
      headerName: 'شماره پیگیری',
      width: 150,
    },
    {
      field: 'reference_number',
      headerName: 'شماره ارجاع درگاه',
      width: 200,
    },
    {
      field: 'code_status_payment',
      headerName: 'وضعیت درگاه',
      width: 200,
      valueFormatter: (params) => errorMsg[params.value] || params.value,
    },
    {
      field: 'user',
      headerName: 'کاربر',
      width: 150,
    },
  ];

  const transformDataForExcel = (data) =>
    data.map((item, index) => {
      let statusText;
      switch (item.status) {
        case '0':
          statusText = 'رد شده';
          break;
        case '1':
          statusText = 'در حال بررسی';
          break;
        case '2':
          statusText = 'تایید موقت';
          break;
        case '3':
          statusText = 'تایید نهایی';
          break;
        default:
          statusText = 'نامشخص';
      }

      return {
        ردیف: (index + 1).toString(),
        'نام و نام خانوادگی': item.fulname || '',
        'شماره همراه': item.mobile || '',
        نوع: item.document === true ? 'فیش بانکی' : 'درگاه',
        مقدار: item.amount || '',
        'کدملی/شناسه': item.user || '',
        'تاریخ ایجاد': formatDate(item.invoice_date) || '',
        مبلغ: item.value,
        'وضعیت درگاه': errorMsg[item.code_status_payment] || item.code_status_payment || '',
        'شماره پیگیری': item.track_id || '',
        'شماره ارجاع درگاه': item.reference_number || '',
        وضعیت: statusText,
      };
    });

  if (isPending) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timeZone: 'Asia/Tehran',
    }).format(date);
  };

  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            backgroundColor: '#e0e0e0',
            color: '#333',
            borderRadius: '16px 16px 0 0',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            سرمایه گذاران
          </Typography>
        </Box>

        {isPending ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '300px',
            }}
          >
            <CircularProgress />
          </Box>
        ) : localData && localData.length > 0 ? (
          <>
            <div
              style={{
                marginBottom: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
              }}
            >
              <button
                type="button"
                onClick={downloadExcel}
                disabled={!data || data.length === 0}
                style={{
                  padding: '8px 16px',
                  backgroundColor: localData?.length ? '#4CAF50' : '#cccccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: localData?.length ? 'pointer' : 'not-allowed',
                }}
              >
                دانلود اکسل
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                >
                  <option value="all">همه انواع</option>
                  <option value="bank">فیش بانکی</option>
                  <option value="gateway">درگاه</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                  }}
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="0">رد شده</option>
                  <option value="1">در حال بررسی</option>
                  <option value="2">تایید موقت</option>
                  <option value="3">تایید نهایی</option>
                </select>
              </div>
            </div>

            <div style={{ height: '70vh', width: '100%' }}>
              <DataGrid
                rows={localData}
                columns={columns}
                pageSize={20}
                localeText={localeText}
                rowsPerPageOptions={[10, 20, 50, 100]}
                disableSelectionOnClick
                disableColumnMenu
                filterMode="client"
                slots={{
                  toolbar: (props) => (
                    <CustomDataGridToolbar
                      {...props}
                      data={localData}
                      fileName="سرمایه-گذاران"
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
          </>
        ) : (
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

      <DialogPopup
        localData={localData}
        setLocalData={setLocalData}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        statusSwitch={statusSwitch}
        setStatusSwitch={setStatusSwitch}
        respiet={respiet}
        setStatus={setStatus}
        status={status}
      />
    </div>
  );
};

export default PlanInvestors;
