import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import useAllPayment from '../hooks/useAllPayment';
import { localeText } from '../consts/localText';

const AllPayment = () => {
  const { data, isLoading, error } = useAllPayment();

  const columns = [
    { field: 'full_name', headerName: '  نام کامل', width: 130 },
    { field: 'user', headerName: 'کدملی', width: 130 },

    { field: 'output', headerName: 'مبلغ', width: 130, type: 'number' },
    {
      field: 'type',
      headerName: 'نوع',
      width: 100,
      type: 'string',
      renderCell: (params) => TypeHeaderName[params.value],
    },
    { field: 'date_operator', headerName: 'تاریخ', width: 150 },
    { field: 'persoan_approved_symbol', headerName: 'طرح', width: 150 },
    {
      field: 'profit_payment_completed',
      headerName: 'پرداخت شده',
      width: 150,
      type: 'boolean',
    },
    {
      field: 'profit_receipt_completed',
      headerName: 'وصول شده',
      width: 150,
      type: 'boolean',
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const TypeHeaderName = {
    1: 'اصل',
    2: 'سود',
  };

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      کدملی: item.user,
      مبلغ: item.value,
      نرخ: item.rate,
      کسری: item.output,
      نوع: TypeHeaderName[item.type],
      تاریخ: item.date_operator,
      طرح: item.persoan_approved_symbol,
      پرداختی: item.profit_payment_completed,
      دریافتی: item.profit_receipt_completed,
    }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.user}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        localeText={localeText}
        filterMode="client"
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={data}
              fileName="پرداخت های انجام شده"
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

export default AllPayment;
