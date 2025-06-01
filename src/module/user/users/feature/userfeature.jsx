/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import CustomDataGridToolbar from 'src/components/common/CustomDataGridToolbar';
import { localeText } from 'src/module/tasks/consts/localText';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment-jalaali';
import { exportToExcel } from '../../../../utils/excelExport';
import useCreateLegal from '../hooks/useCreateLegal';
import CreateLegalPersonForm from './createLegalPerson';
import SearchInput from './searchInput';
import useFilterUsers from '../hooks/useFilterUUsers';

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return moment(date).format('jYYYY/jM/jD');
};

const mapUserData = (users) =>
  Array.isArray(users)
    ? users.map((user) => {
        const personalInfo = user.private_person || {};
        const legalInfo = user.legal_person || {};
        const accountNumber =
          user.accounts?.length > 0
            ? user.accounts.find((account) => account.isDefault === 'True')?.accountNumber ||
              user.accounts[0]?.accountNumber ||
              ''
            : '';
        const accountBank =
          user.accounts?.length > 0
            ? user.accounts.find((account) => account.isDefault === 'True')?.bank ||
              user.accounts[0]?.bank ||
              ''
            : '';
        const companyInfo = user.legal_person || [];

        return {
          id: user.id,
          fullName: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(),
          fatherName: personalInfo.fatherName || '',
          uniqueIdentifier: user.uniqueIdentifier || '',
          mobile: user.mobile || '',
          companyName: companyInfo.companyName || '',
          economicCode: legalInfo.economicCode || '',
          registerNumber: legalInfo.registerNumber || '',
          registerDate: formatDate(legalInfo.registerDate) || '',
          birthDate: formatDate(personalInfo.birthDate) || '',
          accountNumber: accountNumber || '',
          accountBank: accountBank || '',
          gender: personalInfo.gender || '',
          placeOfBirth: personalInfo.placeOfBirth || '',
          placeOfIssue: personalInfo.placeOfIssue || '',
        };
      })
    : [];

const UserFeature = () => {
  const navigate = useNavigate();
  const { mutate: createLegalPerson } = useCreateLegal();
  const [showForm, setShowForm] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    uniqueIdentifier: '',
    firstName: '',
    lastName: '',
    mobile: '',
  });
  const [shouldSearch, setShouldSearch] = useState(false);

  const { data: filteredData, isLoading } = useFilterUsers(shouldSearch ? searchFilters : null);

  const handleSearchChange = (field, value) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setShouldSearch(true);
  };

  const handleRowClick = (params) => {
    navigate(`/userDetail/${params.row.id}`);
  };

  const columns = [
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleRowClick(params);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#2563eb',
          }}
          title="مشاهده"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
            <path
              fillRule="evenodd"
              d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ),
    },
    { field: 'fullName', headerName: 'نام و نام خانوادگی', width: 150, filterable: true },
    { field: 'mobile', headerName: 'شماره همراه', width: 120, filterable: true },
    { field: 'uniqueIdentifier', headerName: 'کدملی', width: 120, filterable: true },
    {
      field: 'birthDate',
      headerName: 'تاریخ تولد',
      width: 120,

      filterable: true,
    },
    {
      field: 'gender',
      headerName: 'جنسیت',
      width: 100,
      renderCell: (cell) => (cell.value === 'Female' ? 'زن' : 'مرد'),
      filterable: true,
    },
    { field: 'accountNumber', headerName: 'شماره حساب', width: 150, filterable: true },
    { field: 'accountBank', headerName: 'بانک', width: 120, filterable: true },
    { field: 'companyName', headerName: 'نام شرکت', width: 150, filterable: true },
    { field: 'economicCode', headerName: 'کد اقتصادی', width: 150, filterable: true },
    { field: 'registerNumber', headerName: 'شماره ثبت', width: 150, filterable: true },
    { field: 'registerDate', headerName: 'تاریخ ثبت', width: 150, filterable: true },
  ];

  const formattedData = useMemo(() => {
    const users = filteredData?.results || [];
    return mapUserData(users);
  }, [filteredData]);

  console.log('Formatted Data:', formattedData);

  const downloadExcel = useCallback(() => {
    try {
      if (!formattedData || formattedData.length === 0) {
        console.error('No data available for export');
        return;
      }

      const excelData = formattedData.map((item, index) => ({
        ردیف: (index + 1).toString(),
        'نام و نام خانوادگی': item.fullName || '',
        'شماره همراه': item.mobile || '',
        'نام شرکت': item.companyName || '',
        'نام پدر': item.fatherName || '',
        کدملی: item.uniqueIdentifier || '',
        'تاریخ تولد': formatDate(item.birthDate) || '',
        جنسیت: item.gender === 'Female' ? 'زن' : 'مرد',
        'محل تولد': item.placeOfBirth || '',
        'محل صدور': item.placeOfIssue || '',
        'شماره حساب': item.accountNumber || '',
        بانک: item.accountBank || '',
        'کد اقتصادی': item.economicCode || '',
        'شماره ثبت': item.registerNumber || '',
        'تاریخ ثبت': item.registerDate || '',
      }));

      exportToExcel(excelData);
    } catch (downloadError) {
      console.error('Error in downloadExcel:', downloadError);
    }
  }, [formattedData]);

  const handleSubmit = async (formData) => {
    try {
      await createLegalPerson(formData);
    } catch (submitError) {
      console.error('Error creating legal person:', submitError);
    }
  };

  useEffect(() => {
    const handleWheel = (event) => {};
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div>
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="px-6 py-2.5 bg-gradient-to-r mb-6 from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
        >
          ایجاد شخص حقوقی
        </motion.button>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">جستجوی کاربران</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 flex items-center gap-4 flex-wrap">
           

            <SearchInput
              id="userName"
              label="نام"
              value={searchFilters.firstName}
              onChange={(e) => handleSearchChange('firstName', e.target.value)}
              placeholder="نام را وارد کنید"
            />
            <SearchInput
              id="userName"
              label="نام خانوادگی"
              value={searchFilters.lastName}
              onChange={(e) => handleSearchChange('lastName', e.target.value)}
              placeholder="نام خانوادگی را وارد کنید"
            />
             <SearchInput
              id="uniqueIdentifier"
              label="کد ملی"
              value={searchFilters.uniqueIdentifier}
              onChange={(e) => handleSearchChange('uniqueIdentifier', e.target.value)}
              placeholder="کد ملی را وارد کنید"
            />

            <SearchInput
              id="mobile"
              label="شماره همراه"
              value={searchFilters.mobile}
              onChange={(e) => handleSearchChange('mobile', e.target.value)}
              placeholder="شماره همراه را وارد کنید"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
          >
            جستجو
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        <CreateLegalPersonForm
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
        />
      </AnimatePresence>

      <DataGrid
        columns={columns}
        rows={formattedData || []}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        disableColumnMenu
        filterMode="client"
        localeText={localeText}
        onRowClick={handleRowClick}
        loading={isLoading}
        slots={{
          toolbar: (props) => (
            <CustomDataGridToolbar
              {...props}
              data={formattedData}
              fileName="گزارش-پرداخت"
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
      />
    </div>
  );
};

export default UserFeature;
