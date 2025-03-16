import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import useCompanyInfoStore from '../../store/companyInfo.store';

const CompanyRegister = ({ data }) => {
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const unformatNumber = (str) => str.replace(/,/g, '');

  const [investmentValue, setInvestmentValue] = useState('');
  const [investmentError, setInvestmentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [planName, setPlanName] = useState('');

  const MIN_INVESTMENT = 50000000000;
  const MAX_INVESTMENT = 250000000000;

  const { updateRegisterInfo } = useCompanyInfoStore();

  useEffect(() => {
    if (data?.suggestion_plan_name) {
      setPlanName(data.suggestion_plan_name);
      updateRegisterInfo('suggestion_plan_name', data.suggestion_plan_name);
    }
    
    if (data?.amount_of_investment) {
      setInvestmentValue(formatNumber(data.amount_of_investment));
      updateRegisterInfo('amount_of_investment', data.amount_of_investment);
      validateInvestment(data.amount_of_investment);
    }
  }, [data, updateRegisterInfo]);

  const validateInvestment = (value) => {
    const numValue = Number(value);
    if (numValue < MIN_INVESTMENT) {
      setInvestmentError(true);
      setErrorMessage('مبلغ تامین مالی نمی‌تواند کمتر از ۵ میلیارد ریال باشد');
      return false;
    }
    if (numValue > MAX_INVESTMENT) {
      setInvestmentError(true);
      setErrorMessage('مبلغ تامین مالی نمی‌تواند بیشتر از ۲۵ میلیارد ریال باشد');
      return false;
    }
    setInvestmentError(false);
    setErrorMessage('');
    return true;
  };

  const handleInvestmentChange = (e) => {
    const rawValue = unformatNumber(e.target.value);
    if (rawValue === '' || /^\d+$/.test(rawValue)) {
      setInvestmentValue(formatNumber(rawValue));
      updateRegisterInfo('amount_of_investment', rawValue);
      if (rawValue !== '') {
        validateInvestment(rawValue);
      } else {
        setInvestmentError(false);
        setErrorMessage('');
      }
    }
  };

  const handleFieldChange = (e, fieldId) => {
    const { value } = e.target;
    if (fieldId === 'suggestion_plan_name') {
      setPlanName(value);
    }
    updateRegisterInfo(fieldId, value);
  };

  const fields = [
    {
      id: 'suggestion_plan_name',
      label: 'نام طرح',
      type: 'text',
      value: planName,
      onChange: (e) => handleFieldChange(e, 'suggestion_plan_name'),
    },
  ];
  return (
    <Box
      component="form"
      sx={{
        padding: 2,
        borderRadius: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} md={6} key={field.id}>
            <Typography variant="p" sx={{ fontSize: '15px' }}>
              <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
              {field.label}
            </Typography>
            <TextField
              value={field.value}
              onChange={field.onChange}
              fullWidth
              type={field.type}
              required
              id={field.id}
              variant="outlined"
            />
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Typography variant="p" sx={{ fontSize: '15px' }}>
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
           مبلغ تامین مالی
           (ریال)
          </Typography>
          <TextField
            value={investmentValue}
            onChange={handleInvestmentChange}
            fullWidth
            required
            id="amount_of_investment"
            variant="outlined"
            inputProps={{ inputMode: 'numeric' }}
            error={investmentError}
            helperText={errorMessage}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

CompanyRegister.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CompanyRegister;
