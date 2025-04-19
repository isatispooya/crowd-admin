import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import useCompanyInfoStore from '../../store/companyInfo.store';

const CompanyRegister = ({ data }) => {
  const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const unformatNumber = (str) => str.replace(/,/g, '');

  const [investmentValue, setInvestmentValue] = useState('');
  const [investmentError, setInvestmentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [planName, setPlanName] = useState('');
  const [paymentPeriod, setPaymentPeriod] = useState('0');
  const [subjectActivityDocument, setSubjectActivityDocument] = useState('');
  const [activityField, setActivityField] = useState('');

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

    if (data?.refund_of_plan) {
      setPaymentPeriod(data.refund_of_plan);
      updateRegisterInfo('refund_of_plan', data.refund_of_plan);
    }
    

    if (data?.subject_activity_document) {
      setSubjectActivityDocument(data.subject_activity_document);
      updateRegisterInfo('subject_activity_document', data.subject_activity_document);
    }

    if (data?.activity_feild) {
      setActivityField(data.activity_feild);
      updateRegisterInfo('activity_feild', data.activity_feild);
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
    } else if (fieldId === 'subject_activity_document') {
      setSubjectActivityDocument(value);
    } else if (fieldId === 'payment_period') {
      setPaymentPeriod(value);
      updateRegisterInfo('refund_of_plan', value);
    } else if (fieldId === 'activity_feild') {
      setActivityField(value);
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
    {
      id: 'subject_activity_document',
      label: 'مبنای برسی مالی',
      type: 'text',
      value: subjectActivityDocument,
      onChange: (e) => handleFieldChange(e, 'subject_activity_document'),
    },
    {
      id: 'payment_period',
      label: 'دوره بازپرداخت',
      type: 'select',
      value: paymentPeriod,
      onChange: (e) => handleFieldChange(e, 'payment_period'),
      options: [
        { value: '0', label: 'پرداخت یکجا' },
        { value: '1', label: 'پرداخت یک ماهه' },
        { value: '3', label: 'پرداخت سه ماهه' },
      ],
    },
    {
      id: 'activity_feild',
      label: 'زمینه فعالیت',
      type: 'text',
      value: activityField,
      onChange: (e) => handleFieldChange(e, 'activity_feild'),
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
            {field.type === 'select' ? (
              <TextField
                select
                value={field.value}
                onChange={field.onChange}
                fullWidth
                required
                id={field.id}
                variant="outlined"
              >
                {field.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                value={field.value}
                onChange={field.onChange}
                fullWidth
                type={field.type}
                required
                id={field.id}
                variant="outlined"
              />
            )}
          </Grid>
        ))}

        <Grid item xs={12} md={6}>
          <Typography variant="p" sx={{ fontSize: '15px' }}>
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
            مبلغ تامین مالی (ریال)
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
