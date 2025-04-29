import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography, IconButton, Divider } from '@mui/material';
import DateObject from 'react-date-object';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { CiEdit, CiTrash } from 'react-icons/ci';

const GuarantorList = ({ guarantors, onDelete, onEdit }) => {
  if (guarantors.length === 0) {
    return <Typography align="center">ضامن حقیقی ثبت نشده است</Typography>;
  }

  return (
    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
      {guarantors
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
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <IconButton
                onClick={() => onDelete(item.id)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 48,
                  color: 'error.main',
                }}
              >
                <CiTrash />
              </IconButton>
              <IconButton
                onClick={() => onEdit(item)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'primary.main',
                }}
              >
                <CiEdit />
              </IconButton>
            </Box>

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
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>شماره تلفن:</strong> {item.phone_number}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>آدرس ضامن:</strong> {item.guarantor_address}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>کد پستی:</strong> {item.postal_code}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>جنسیت:</strong> {item.gender === 'male' ? 'مرد' : 'زن'}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>نمایندگی از شرکت:</strong> {item.company_agent}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>عنوان شغلی:</strong> {item.position_title}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong>شماره شناسایی شرکت:</strong> {item.company_national_id}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2">
                  <strong> براساس شماره:</strong> {item.document_news_paper}
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
      address_of_company: PropTypes.string,
      company_agent: PropTypes.string,
      postal_code_of_company: PropTypes.string,
      register_number_of_company: PropTypes.string,
      registration_unit_of_company: PropTypes.string,
      kind_of_company: PropTypes.string,
      branch: PropTypes.string,
      document_news_paper: PropTypes.string,
      company_national_id: PropTypes.string,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default GuarantorList;
