import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const fields = [
  { id: 'company-logo', label: 'نام بانک', type: 'select' },
  { id: 'credit-report', label: 'شعبه', type: 'text' },
  { id: 'financial-statement', label: 'کد شعبه', type: 'text' },
];

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

const CompanyBankInfo = () => (
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
            <Select
              fullWidth
              required
              id={field.id}
              variant="outlined"
            >
              {banks.map((bank) => (
                <MenuItem key={bank.id} value={bank.id}>
                  {bank.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <TextField fullWidth type={field.type} required id={field.id} variant="outlined" />
          )}
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default CompanyBankInfo;
