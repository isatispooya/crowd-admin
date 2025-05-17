import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
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
  { id: 28, name: 'بانک مشترک ایران-ونزوئلا' },
];

const CompanyBankInfo = ({ data }) => {
  const { bankInfo, updateBankInfo } = useCompanyInfoStore();

  useEffect(() => {
    if (data?.bank) {
      const bankObj = banks.find((b) => String(b.id) === String(data.bank));
      if (bankObj) {
        updateBankInfo('bank', bankObj.name);
        updateBankInfo('bank_branch', data.bank_branch || '');
        updateBankInfo('bank_branch_code', data.bank_branch_code || '');
      }
    }
  }, [data, updateBankInfo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateBankInfo(name, value);
  };

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
        <Grid item xs={12} md={6}>
          <Typography variant="p" sx={{ fontSize: '15px' }}>
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
            نام بانک
          </Typography>
          <Select
            name="bank"
            value={bankInfo.bank || ''}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          >
            {banks.map((bank) => (
              <MenuItem key={bank.id} value={bank.name}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="p" sx={{ fontSize: '15px' }}>
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
            شعبه
          </Typography>
          <TextField
            name="bank_branch"
            value={bankInfo.bank_branch}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="p" sx={{ fontSize: '15px' }}>
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '20px' }}>•</span>
            کد شعبه
          </Typography>
          <TextField
            name="bank_branch_code"
            value={bankInfo.bank_branch_code}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

CompanyBankInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CompanyBankInfo;
