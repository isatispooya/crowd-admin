import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { ReactTabulator } from 'react-tabulator';
import { useNavigate } from 'react-router-dom';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator_bootstrap4.min.css';
import useGetUser from '../services/useGetUser';
import { exportToExcel } from '../../../../utils/excelExport';

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

const mapUserData = (users) =>
  users.map((user) => {
    const personalInfo = user.private_person?.[0] || user.legal_person_stakeholders?.[0] || {};
    const legalInfo = user.legal_person?.[0] || {};
    const accountNumber = user.accounts?.length > 0 
      ? (user.accounts.find(account => account.isDefault === 'True')?.accountNumber 
        || user.accounts[0]?.accountNumber 
        || '')
      : '';
    const accountBank = user.accounts?.length > 0 
      ? (user.accounts.find(account => account.isDefault === 'True')?.bank 
        || user.accounts[0]?.bank 
        || '')
      : '';


    return {
      id: user.id,
      fullName: `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim(),
      fatherName: personalInfo.fatherName || '',
      uniqueIdentifier: user.uniqueIdentifier || '',
      mobile: user.mobile || '',
      companyName: legalInfo.companyName || '',
      birthDate: personalInfo.birthDate || '',
      accountNumber: accountNumber || '',
      accountBank: accountBank || '',
      gender: personalInfo.gender || '',
      placeOfBirth: personalInfo.placeOfBirth || '',
      placeOfIssue: personalInfo.placeOfIssue || '',
    };
  });

const columns = [
  { 
    title: 'ردیف', 
    formatter: 'rownum', 
    width: 50,
    headerSort: false,
    hozAlign: 'center',
    headerHozAlign: 'center',
    cssClass: 'row-number',
    resizable: false
  },
  { title: 'نام و نام خانوادگی', field: 'fullName', minWidth: 150, headerFilter: 'input' },
  { title: 'شماره همراه', field: 'mobile', minWidth: 120, headerFilter: 'input' },
  { title: 'نام شرکت', field: 'companyName', minWidth: 150, headerFilter: 'input' },
  { title: 'نام پدر', field: 'fatherName', minWidth: 100, headerFilter: 'input' },
  { title: 'کدملی', field: 'uniqueIdentifier', minWidth: 100, headerFilter: 'input' },
  {
    title: 'تاریخ تولد',
    field: 'birthDate',
    minWidth: 100,
    formatter: (cell) => formatDate(cell.getValue()),
    headerFilter: 'input'
  },
  {
    title: 'جنسیت',
    field: 'gender',
    minWidth: 80,
    formatter: (cell) => (cell.getValue() === 'Female' ? 'زن' : 'مرد'),
    headerFilter: 'input'
  },
  { title: 'محل تولد', field: 'placeOfBirth', minWidth: 100, headerFilter: 'input' },
  { title: 'محل صدور', field: 'placeOfIssue', minWidth: 100, headerFilter: 'input' },
  { title: 'شماره حساب', field: 'accountNumber', minWidth: 120, headerFilter: 'input' },
  { title: 'بانک', field: 'accountBank', minWidth: 100, headerFilter: 'input' }
];

const UserFeature = () => {
  const navigate = useNavigate();
  const { data: rawData } = useGetUser();
  const tableRef = useRef(null);

  const formattedData = useMemo(() => mapUserData(rawData || []), [rawData]);

  const handleRowClick = (e, row) => navigate(`/userDetail/${row.getData().id}`);

  const downloadExcel = useCallback(() => {
    try {
      if (!formattedData || formattedData.length === 0) {
        console.error('No data available for export');
        return;
      }

      const excelData = formattedData.map((item, index) => ({
        'ردیف': (index + 1).toString(),
        'نام و نام خانوادگی': item.fullName || '',
        'شماره همراه': item.mobile || '',
        'نام شرکت': item.companyName || '',
        'نام پدر': item.fatherName || '',
        'کدملی': item.uniqueIdentifier || '',
        'تاریخ تولد': formatDate(item.birthDate) || '',
        'جنسیت': item.gender === 'Female' ? 'زن' : 'مرد',
        'محل تولد': item.placeOfBirth || '',
        'محل صدور': item.placeOfIssue || '',
        'شماره حساب': item.accountNumber || '',
        'بانک': item.accountBank || ''
      }));

      exportToExcel(excelData);
    } catch (error) {
      console.error('Error in downloadExcel:', error);
    }
  }, [formattedData]);

  useEffect(() => {
    const handleWheel = (event) => {};
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
        <button 
          type="button"
          onClick={downloadExcel}
          disabled={!formattedData || formattedData.length === 0}
          style={{
            padding: '8px 16px',
            backgroundColor: formattedData?.length ? '#4CAF50' : '#cccccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: formattedData?.length ? 'pointer' : 'not-allowed',
            marginRight: '8px'
          }}
        >
          دانلود اکسل
        </button>
      </div>
      <ReactTabulator
        ref={tableRef}
        data={formattedData}
        columns={columns}
        options={{
          pagination: true,
          paginationSize: 10,
          paginationSizeSelector: [10, 20, 50, 100],
          paginationButtonCount: 3,
          paginationCounter: "rows",
          movableColumns: true,
          height: "70vh",
          layout: "fitDataFill",
          renderHorizontal: "virtual"
        }}
        events={{ 
          rowClick: handleRowClick,
          tableBuilt: () => {
            console.log('Table is built');
          }
        }}
      />
    </div>
  );
};

export default UserFeature;
