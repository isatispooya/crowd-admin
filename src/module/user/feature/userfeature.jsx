import React, { useEffect, useMemo } from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { localeText } from 'src/module/tasks/consts/localText';
import useGetUser from '../services/useGetUser';

const formatDate = (dateString) => {
  if (!dateString) return 'تاریخ نامعتبر';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
  }).format(date);
};

const mapUserData = (users) =>
  users.map((user) => {
    const personalInfo = user.private_person?.[0] || user.legal_person_stakeholders?.[0] || {};

    return {
      id: user.id,
      fullName: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(),
      fatherName: personalInfo.fatherName || '',
      uniqueIdentifier: user.uniqueIdentifier || '',
      birthDate: personalInfo.birthDate || '',
      gender: personalInfo.gender || '',
      placeOfBirth: personalInfo.placeOfBirth || '',
      placeOfIssue: personalInfo.placeOfIssue || '',
    };
  });

const columns = [
  { title: 'نام و نام خانوادگی', field: 'fullName', width: 240, headerFilter: 'input' },
  { title: 'نام شرکت', field: 'companyName', width: 240, headerFilter: 'input' },
  { title: 'نام پدر', field: 'fatherName', width: 200, headerFilter: 'input' },
  { title: 'کدملی', field: 'uniqueIdentifier', width: 200, headerFilter: 'input' },
  {
    title: 'تاریخ تولد',
    field: 'birthDate',
    width: 200,
    formatter: (cell) => formatDate(cell.getValue() ),
    headerFilter: 'input',
  },
  {
    title: 'جنسیت',
    field: 'gender',
    width: 150,
    formatter: (cell) => {
      console.log('Gender cell value:', cell.getValue());
      return cell.getValue() === 'Female' ? 'زن' : 'مرد';
    },
    headerFilter: 'input',
  },
  { title: 'محل تولد', field: 'placeOfBirth', width: 150, headerFilter: 'input' },
  { title: 'محل صدور', field: 'placeOfIssue', width: 150, headerFilter: 'input' },
];

const UserFeature = () => {

  const { data: rawData } = useGetUser();

  const formattedData = useMemo(() => mapUserData(rawData || []), [rawData]);

  const transformDataForExcel = (excelData) =>
    excelData.map((item) => ({
      مبلغ: item.amount_operator || '0',
      'تاریخ سود سرمایه گذار': item.date_capitalization_operator || '',
      طرح: item.plan || '',
      کامنت: item.profit_payment_comment || '',
      'سود پرداخت تکمیل شده': item.profit_payment_completed === 'true' ? 'بله' : 'خیر',
    }));

  useEffect(() => {
    const handleWheel = (event) => {};
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div>
      <DataGrid
        columns={columns}
        rows={formattedData || []}
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
              data={formattedData}
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

export default UserFeature;
