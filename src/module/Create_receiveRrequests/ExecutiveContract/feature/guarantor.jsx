import React from 'react';
import {
  Box,
  Grid,
  Typography,

  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DateObject from 'react-date-object';
import { useGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';

const Guarantor = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useGuarantor();

  const { guarantorInfo, setGuarantorInfo, updateGuarantorInfo, submitGuarantorInfo } =
    useCompanyInfoStore();

  const handleChange = (field) => (event) => {
    updateGuarantorInfo(field, event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        const payload = new FormData();
        const birthDate = guarantorInfo.birth_date
          ? guarantorInfo.birth_date.format('YYYY-MM-DD')
          : null;

        Object.entries(guarantorInfo).forEach(([key, value]) => {
          if (value !== null) {
            if (key === 'birth_date') {
              payload.append(key, birthDate);
            } else {
              payload.append(key, value);
            }
          }
        });

        await mutate(payload);
        setGuarantorInfo({
          investor_request_id: cartId || '',
          guarantor_name: '',
          guarantor_national_id: '',
          phone_number: '',
          birth_date: '',
          guarantor_address: '',
          postal_code: '',
          gender: '',
        });
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  };

  React.useEffect(() => {
    if (allData) {
      setGuarantorInfo({
        investor_request_id: allData.id || cartId,
        guarantor_name: allData.guarantor?.guarantor_name || '',
        guarantor_national_id: allData.guarantor?.guarantor_national_id || '',
        phone_number: allData.guarantor?.phone_number || '',
        birth_date: allData.guarantor?.birth_date || '',
        guarantor_address: allData.guarantor?.guarantor_address || '',
        postal_code: allData.guarantor?.postal_code || '',
        gender: allData.guarantor?.gender ?? true,
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
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
            onChange={(event) => handleChange('gender')(event)}
          >
            <MenuItem value="male">مرد</MenuItem>
            <MenuItem value="female">زن</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            ذخیره اطلاعات
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
        {allData?.guarantor && allData.guarantor.length > 0 ? (
          allData.guarantor
            .slice()
            .reverse()
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>نام ضامن:</strong> {item.guarantor_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>کد ملی ضامن:</strong> {item.guarantor_national_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>شماره تلفن:</strong> {item.phone_number}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>تاریخ تولد:</strong>{' '}
                      {item.birth_date
                        ? new DateObject({
                            date: item.birth_date,
                            calendar: persian,
                            locale: persian_fa,
                          })
                            .convert(persian)
                            .format('YYYY/MM/DD')
                        : '—'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>آدرس ضامن:</strong> {item.guarantor_address}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>کد پستی:</strong> {item.postal_code}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>جنسیت:</strong> {guarantorInfo.gender === 'male' ? 'مرد' : 'زن'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))
        ) : (
          <Typography align="center">اطلاعاتی موجود نیست</Typography>
        )}
      </Box>
    </Box>
  );
};

Guarantor.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Guarantor;
