import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, TextField, MenuItem, Divider } from '@mui/material';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import useCompanyInfoStore from '../../store/companyInfo.store';

const GuarantorForm = ({ initialValues }) => {
  const { guarantorInfo, updateGuarantorInfo, setGuarantorInfo } = useCompanyInfoStore();

  useEffect(() => {
    if (initialValues) {
      let birthDate = initialValues.birth_date || '';

      if (birthDate && typeof birthDate === 'string') {
        birthDate = new DateObject({
          date: new Date(birthDate),
          calendar: persian,
          locale: persian_fa,
        });
      }

      setGuarantorInfo({
        guarantor_name: initialValues.guarantor_name || '',
        guarantor_national_id: initialValues.guarantor_national_id || '',
        phone_number: initialValues.phone_number || '',
        birth_date: birthDate,
        guarantor_address: initialValues.guarantor_address || '',
        postal_code: initialValues.postal_code || '',
        gender: initialValues.gender || '',
        document_news_paper: initialValues.document_news_paper || '',
        position_title: initialValues.position_title || '',
      });
    }
  }, [initialValues, setGuarantorInfo]);

  const handleChange = useCallback(
    (field) => (event) => {
      updateGuarantorInfo(field, event.target.value);
    },
    [updateGuarantorInfo]
  );

  return (
    <>
      {/* اطلاعات شخصی */}
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

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={2}>
        {/* <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label="نمایندگی از شرکت"
            value={guarantorInfo.company_agent}
            onChange={handleChange('company_agent')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            disabled
            fullWidth
            label="شماره شناسایی شرکت"
            value={guarantorInfo.company_national_id}
            onChange={handleChange('company_national_id')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid> */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="براساس شماره"
            value={guarantorInfo.document_news_paper}
            onChange={handleChange('document_news_paper')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="عنوان شغلی"
            value={guarantorInfo.position_title}
            onChange={handleChange('position_title')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </>
  );
};

GuarantorForm.propTypes = {
  initialValues: PropTypes.object,
};

GuarantorForm.defaultProps = {
  initialValues: null,
};

export default GuarantorForm;
