import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import { PiTrash } from 'react-icons/pi';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const GuarantorList = ({ guarantors, onDelete }) => {
  if (guarantors.length === 0) {
    return <Typography align="center">ضامن حقیقی ثبت نشده است</Typography>;
  }

  return (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      {guarantors.slice().reverse().map((item) => (
        <Box
          key={item.id}
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: 2,
            marginBottom: 2,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => onDelete(item.id)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'error.main',
            }}
          >
            <PiTrash />
          </IconButton>
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
                      date: new Date(item.birth_date),
                      calendar: persian,
                      locale: persian_fa,
                    }).format('YYYY/MM/DD')
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
                <strong>جنسیت:</strong> {item.gender === 'male' ? 'مرد' : 'زن'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

GuarantorList.propTypes = {
  guarantors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      guarantor_name: PropTypes.string,
      guarantor_national_id: PropTypes.string,
      phone_number: PropTypes.string,
      birth_date: PropTypes.string,
      guarantor_address: PropTypes.string,
      postal_code: PropTypes.string,
      gender: PropTypes.oneOf(['male', 'female']),
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GuarantorList; 