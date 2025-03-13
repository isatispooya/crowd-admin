/* eslint-disable no-restricted-globals */
import React from 'react';
import { Grid, Switch } from '@mui/material';
import GlobalTextField from 'src/components/fild/textfiled';
import useCompanyInfoStore from '../../store/companyInfo.store';

const ContentInput = () => {
  const { contract, updateContractField } = useCompanyInfoStore();

  const fielsLabels = [
    {
      label: 'کارمزد فرابورس',
      key: 'otc_fee',
    },
    {
      label: 'کارمزد انتشار',
      key: 'publication_fee',
    },
    {
      label: 'کارمزد ارائه خدمات',
      key: 'dervice_fee',
    },
    {
      label: 'کارمزد طراحی',
      key: 'design_cost',
    },
    {
      label: 'دوره بازپرداخت',
      key: 'payback_period',
      lockKey: 'lock_payback_period',
    },
    {
      label: 'دوره تامین مالی',
      key: 'swimming_percentage',
      lockKey: 'lock_swimming_percentage',
    },
    {
      label: 'سود مشارکت اسمی',
      key: 'partnership_interest',
      lockKey: 'lock_partnership_interest',
    },
    {
      label: 'ضمانت نامه',
      key: 'guarantee',
      lockKey: 'lock_guarantee',
    },
  ];

  const formatNumber = (value) => {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleTextFieldChange = (key) => (event) => {
    const rawValue = event.target.value.replace(/,/g, '');
    updateContractField(key, rawValue);
  };

  const handleBlur = (key) => (event) => {
    const numericValue = parseFloat(event.target.value.replace(/,/g, ''));
    updateContractField(key, isNaN(numericValue) ? '' : numericValue);
  };

  const handleLockChange = (lockKey) => (event) => {
    updateContractField(lockKey, event.target.checked);
  };

  return (
    <Grid container spacing={2}>
      {fielsLabels.map(({ label, key, lockKey }) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <div dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {lockKey && (
              <Switch
                checked={contract[lockKey] || false}
                onChange={handleLockChange(lockKey)}
              />
            )}

            <GlobalTextField
              label={label}
              value={formatNumber(contract[key]) || ''}
              onChange={handleTextFieldChange(key)}
              onBlur={handleBlur(key)}
              disabled={lockKey && contract[lockKey]}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ContentInput;
