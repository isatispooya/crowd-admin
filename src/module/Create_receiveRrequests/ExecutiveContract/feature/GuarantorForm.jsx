import React, { useCallback } from 'react';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import useCompanyInfoStore from '../../store/companyInfo.store';

const GuarantorForm = () => {
  const { guarantorInfo, updateGuarantorInfo } = useCompanyInfoStore();

  const handleChange = useCallback(
    (field) => (event) => {
      updateGuarantorInfo(field, event.target.value);
    },
    [updateGuarantorInfo]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="نام ضامن"
          value={guarantorInfo.guarantor_name}
          onChange={handleChange('guarantor_name')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="کد ملی ضامن"
          value={guarantorInfo.guarantor_national_id}
          onChange={handleChange('guarantor_national_id')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="شماره تلفن"
          value={guarantorInfo.phone_number}
          onChange={handleChange('phone_number')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="body2">تاریخ تولد</Typography>
        <div style={{ direction: 'rtl' }}>
          <DatePicker
            value={guarantorInfo.birth_date}
            onChange={(value) => updateGuarantorInfo('birth_date', value)}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="آدرس ضامن"
          value={guarantorInfo.guarantor_address}
          onChange={handleChange('guarantor_address')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="کد پستی"
          value={guarantorInfo.postal_code}
          onChange={handleChange('postal_code')}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          label="جنسیت"
          value={guarantorInfo.gender}
          onChange={handleChange('gender')}
        >
          <MenuItem value="male">مرد</MenuItem>
          <MenuItem value="female">زن</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default GuarantorForm;
