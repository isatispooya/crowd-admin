import { Typography, Paper, Box, Grid, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useState } from 'react';
import DateObject from 'react-date-object';
import BoardOfDirectorsRegistrationMain from '../feature/BoardOfDirectorsRegistrationMain';
import { useCompanyInfo } from '../../ExecutiveContract/service/companyinfoService';

const CompanyInfoPage = ({ companyInfo }) => {
  const pastelBlue = {
    light: '#E6F4FF',
    main: '#B3E0FF',
    dark: '#6B9ACD',
    contrastText: '#1A365D',
  };
  const cartId = companyInfo?.company?.id;

  console.log(cartId);

  const { mutate } = useCompanyInfo(cartId);

  const [localCompanyInfo, setLocalCompanyInfo] = useState(companyInfo);

  // تبدیل تاریخ ISO به تاریخ شمسی
  const convertToJalaliDate = (isoDate) => {
    if (!isoDate) return null;
    return new DateObject({
      date: new Date(isoDate),
      calendar: persian,
      locale: persian_fa,
    });
  };

  const handleUpdate = (field, value) => {
    let updatedData = {};

    if (field === 'persian_registration_date') {
      updatedData = {
        registration_date: value.toDate().toISOString(),
      };
      setLocalCompanyInfo((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          registration_date: value.toDate().toISOString(),
          persian_registration_date: value,
        },
      }));
      mutate(updatedData);
    } else if (field === 'capital') {
      updatedData = {
        capital: Number(value.replace(/,/g, '')),
      };
      setLocalCompanyInfo((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          capital: value,
        },
      }));
    }

    mutate(updatedData);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: '900px',
        margin: '1.5rem auto',
        boxShadow: '0 5px 15px rgba(149, 157, 165, 0.1)',
        borderRadius: '12px',
        padding: '2rem',
        background: '#FFFFFF',
        border: `1px solid ${pastelBlue.main}`,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 3,
          textAlign: 'center',
          color: pastelBlue.contrastText,
          fontWeight: 600,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: '25%',
            width: '50%',
            height: '2px',
            background: pastelBlue.main,
            borderRadius: '1px',
          },
        }}
      >
        اطلاعات شرکت را بررسی کنید
      </Typography>

      {/* باکس اطلاعات شرکت */}
      <Box
        sx={{
          p: 2,
          mb: 2,
          borderRadius: '8px',
          border: `1px solid ${pastelBlue.main}`,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              fontWeight="bold"
              textAlign="center"
              color={pastelBlue.contrastText}
              mb={1}
            >
              {companyInfo.title}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              شناسه ملی:
            </Typography>
            <Typography variant="body1">{companyInfo.company.national_id}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              شماره ثبت:
            </Typography>
            <Typography variant="body1">{companyInfo.company.registration_number}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              تاریخ ثبت:
            </Typography>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              label="تاریخ ثبت"
              value={convertToJalaliDate(localCompanyInfo.company.registration_date)}
              onChange={(date) => {
                handleUpdate('persian_registration_date', date);
              }}
              format="YYYY/MM/DD"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              سرمایه:
            </Typography>
            <TextField
              fullWidth
              value={companyInfo.company.capital}
              onChange={(e) => {
                handleUpdate('capital', e.target.value);
              }}
              InputProps={{
                endAdornment: <Typography variant="caption">ریال</Typography>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              نوع شرکت:
            </Typography>
            <Typography variant="body1">{companyInfo.company.registration_type_title}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="body2" color="text.secondary">
              کد اقتصادی:
            </Typography>
            <Typography variant="body1">{companyInfo.company.economic_code}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              آدرس:
            </Typography>
            <Typography variant="body1">{companyInfo.company.address}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              کد پستی:
            </Typography>
            <Typography variant="body1">{companyInfo.company.postal_code}</Typography>
          </Grid>
        </Grid>
      </Box>
      <BoardOfDirectorsRegistrationMain companyInfo={companyInfo} />
    </Paper>
  );
};

CompanyInfoPage.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};

export default CompanyInfoPage;
