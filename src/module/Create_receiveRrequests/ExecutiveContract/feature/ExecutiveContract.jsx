import React, { useEffect } from 'react';
import {
  TextField,
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useCompanyInfoStore from '../../store/companyInfo.store';

const banks = [
  { id: 1, name: 'بانک ملی ایران' },
  { id: 2, name: 'بانک سپه' },
  { id: 3, name: 'بانک صنعت و معدن' },
  { id: 4, name: 'بانک کشاورزی' },
  { id: 5, name: 'بانک مسکن' },
  { id: 6, name: 'بانک توسعه صادرات ایران' },
  { id: 7, name: 'بانک توسعه تعاون' },
  { id: 8, name: 'پست بانک ایران' },
  { id: 9, name: 'بانک اقتصاد نوین' },
  { id: 10, name: 'بانک پارسیان' },
  { id: 11, name: 'بانک کارآفرین' },
  { id: 12, name: 'بانک سامان' },
  { id: 13, name: 'بانک سینا' },
  { id: 14, name: 'بانک خاورمیانه' },
  { id: 15, name: 'بانک شهر' },
  { id: 16, name: 'بانک دی' },
  { id: 17, name: 'بانک صادرات ایران' },
  { id: 18, name: 'بانک ملت' },
  { id: 19, name: 'بانک تجارت' },
  { id: 20, name: 'بانک رفاه کارگران' },
  { id: 21, name: 'بانک حکمت ایرانیان' },
  { id: 22, name: 'بانک گردشگری' },
  { id: 23, name: 'بانک ایران زمین' },
  { id: 24, name: 'بانک قوامین' },
  { id: 25, name: 'بانک انصار' },
  { id: 26, name: 'بانک سرمایه' },
  { id: 27, name: 'بانک پاسارگاد' },
];

const ExecutiveContract = ({ data }) => {
  const {
    updateExecutiveContractField,
    updateExecutiveContractFile,
    initializeStore,
    executiveContract,
  } = useCompanyInfoStore();

  useEffect(() => {
    if (data) {
      initializeStore(data);
      localStorage.setItem('executiveContractData', JSON.stringify(data));
    } else {
      const savedData = localStorage.getItem('executiveContractData');
      if (savedData) {
        initializeStore(JSON.parse(savedData));
      }
    }
  }, [data, initializeStore]);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file' && files.length > 0) {
      updateExecutiveContractFile(name, files[0]);
    } else if (name === 'payment_bank') {
      const selectedBank = banks.find((bank) => bank.id === value);
      if (selectedBank) {
        updateExecutiveContractField(name, selectedBank.name);
        updateLocalStorage(name, selectedBank.name);
      }
    } else {
      updateExecutiveContractField(name, value);
      updateLocalStorage(name, value);
    }
  };

  const updateLocalStorage = (fieldName, fieldValue) => {
    const savedData = localStorage.getItem('executiveContractData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      parsedData[fieldName] = fieldValue;
      localStorage.setItem('executiveContractData', JSON.stringify(parsedData));
    } else {
      const newData = { ...executiveContract, [fieldName]: fieldValue };
      localStorage.setItem('executiveContractData', JSON.stringify(newData));
    }
  };

  const getBankIdByName = () => {
    if (!executiveContract?.payment_bank) return '';

    const selectedBank = banks.find((bank) => bank.name === executiveContract.payment_bank);
    return selectedBank ? selectedBank.id : '';
  };

  const bankValue = getBankIdByName();
  const branchValue = executiveContract?.payment_bank_branch || '';
  const accountValue = executiveContract?.payment_account_number || '';

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion
        sx={{
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>اطلاعات بانکی</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>نام بانک</Typography>
              <Select
                name="payment_bank"
                value={bankValue}
                onChange={handleChange}
                fullWidth
                required
              >
                {banks.map((bank) => (
                  <MenuItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>شعبه</Typography>
              <TextField
                type="text"
                name="payment_bank_branch"
                value={branchValue}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: '15px' }}>شماره حساب پرداخت</Typography>
              <TextField
                type="number"
                name="payment_account_number"
                value={accountValue}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

ExecutiveContract.propTypes = {
  data: PropTypes.object,
};

export default ExecutiveContract;
