import { Typography, Paper, Box, Grid, TextField, Button, Fade, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useState } from 'react';
import DateObject from 'react-date-object';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BoardOfDirectorsRegistrationMain from '../feature/BoardOfDirectorsRegistrationMain';
import { useCompanyInfo } from '../../ExecutiveContract/service/companyinfoService';

const CompanyInfoPage = ({ companyInfo }) => {
  const theme = {
    primary: {
      light: '#EDF2FF',
      main: '#3F72AF',
      dark: '#112D4E',
      contrastText: '#F9F7F7',
    },
    secondary: {
      light: '#DBE2EF',
      main: '#5A91E2',
      dark: '#3F72AF',
    },
    background: {
      default: '#F9F7F7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#112D4E',
      secondary: '#3F72AF',
      hint: '#7D95B6',
    },
  };
  const cartId = companyInfo?.company?.id;
  const { mutate } = useCompanyInfo(cartId);
  const [localCompanyInfo, setLocalCompanyInfo] = useState(companyInfo);
  const [pendingChanges, setPendingChanges] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const convertToJalaliDate = (isoDate) => {
    if (!isoDate) return null;
    return new DateObject({
      date: new Date(isoDate),
      calendar: persian,
      locale: persian_fa,
    });
  };

  const handleUpdate = (field, value) => {
    if (field === 'persian_registration_date') {
      setLocalCompanyInfo((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          registration_date: value.toDate().toISOString(),
          persian_registration_date: value,
        },
      }));
      setPendingChanges((prev) => ({
        ...prev,
        registration_date: value.toDate().toISOString(),
      }));
    } else if (field === 'capital') {
      setLocalCompanyInfo((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          capital: value,
        },
      }));
      setPendingChanges((prev) => ({
        ...prev,
        capital: Number(value.replace(/,/g, '')),
      }));
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(pendingChanges).length === 0) return;

    const dataToSubmit = { ...pendingChanges };

    if (!Object.prototype.hasOwnProperty.call(dataToSubmit, 'registration_date')) {
      dataToSubmit.registration_date = companyInfo.company.registration_date;
    }

    if (!Object.prototype.hasOwnProperty.call(dataToSubmit, 'capital')) {
      dataToSubmit.capital = Number(companyInfo.company.capital.toString().replace(/,/g, ''));
    }

    setIsSaving(true);
    try {
      await mutate(dataToSubmit);
      setPendingChanges({});
      toast.success('ویرایش اطلاعات با موفقیت انجام شد', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('خطا در ذخیره تغییرات:', error);
      toast.error('خطا در ذخیره تغییرات، لطفا دوباره تلاش کنید', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Fade in timeout={700}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: '950px',
          margin: '2rem auto',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.07)',
          borderRadius: '16px',
          padding: { xs: '1.5rem', md: '2.5rem' },
          background: theme.background.paper,
          border: `1px solid ${theme.secondary.light}`,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: theme.primary.dark,
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
              pb: 1,
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: `linear-gradient(90deg, ${theme.primary.main}, ${theme.secondary.main})`,
                borderRadius: '3px',
              },
            }}
          >
            اطلاعات شرکت
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: theme.text.hint,
              mt: 1,
              fontWeight: 400,
            }}
          >
            لطفا اطلاعات را بررسی و در صورت نیاز ویرایش کنید
          </Typography>
        </Box>

        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            border: `1px solid ${theme.secondary.light}`,
            background: `linear-gradient(145deg, ${theme.background.paper}, ${theme.primary.light}05)`,
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                fontWeight="700"
                textAlign="center"
                color={theme.primary.main}
                mb={2}
                sx={{
                  position: 'relative',
                  '&:before, &:after': {
                    content: '""',
                    position: 'absolute',
                    height: '1px',
                    top: '50%',
                    width: '60px',
                    background: `linear-gradient(to right, transparent, ${theme.secondary.light})`,
                  },
                  '&:before': {
                    right: '30%',
                  },
                  '&:after': {
                    left: '30%',
                    transform: 'rotate(180deg)',
                  },
                }}
              >
                {companyInfo.title}
              </Typography>
              <Divider sx={{ mb: 3, opacity: 0.7 }} />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                شناسه ملی:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                }}
              >
                {companyInfo.company.national_id}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                شماره ثبت:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                }}
              >
                {companyInfo.company.registration_number}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                نوع شرکت:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                }}
              >
                {companyInfo.company.registration_type_title}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                سرمایه:
              </Typography>
              <TextField
                fullWidth
                value={localCompanyInfo.company.capital}
                onChange={(e) => {
                  handleUpdate('capital', e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <Typography variant="caption" sx={{ color: theme.text.hint }}>
                      ریال
                    </Typography>
                  ),
                  sx: {
                    height: '40px',
                    backgroundColor: theme.primary.light,
                    borderRadius: '8px',
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.secondary.light,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.secondary.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.primary.main,
                    },
                  },
                }}
                sx={{
                  '.MuiInputBase-input': {
                    fontWeight: 600,
                    color: theme.text.primary,
                    boxSizing: 'border-box',
                    padding: '8px 12px',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
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
                style={{
                  width: '100%',
                  height: '40px',
                  padding: '8px 25px',
                  backgroundColor: theme.primary.light,
                  border: `1px solid ${theme.secondary.light}`,
                  borderRadius: '8px',
                  color: theme.text.primary,
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                کد اقتصادی:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                }}
              >
                {companyInfo.company.economic_code}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                color={theme.text.hint}
                sx={{
                  mb: 0.5,
                  fontWeight: 500,
                  fontSize: '0.85rem',
                }}
              >
                کد پستی:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                  direction: 'ltr',
                }}
              >
                {companyInfo.company.postal_code}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  fontWeight: 600,
                  borderBottom: `2px dashed ${theme.secondary.light}`,
                  pb: 1,
                  display: 'inline-block',
                  direction: 'ltr',
                }}
              >
                <Typography
                  variant="body2"
                  color={theme.text.hint}
                  sx={{
                    mb: 0.5,
                    fontWeight: 500,
                    fontSize: '0.85rem',
                  }}
                >
                  آدرس:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    lineHeight: 1.7,
                  }}
                >
                  {companyInfo.company.address}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {Object.keys(pendingChanges).length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={isSaving}
                sx={{
                  bgcolor: theme.primary.main,
                  '&:hover': { bgcolor: theme.primary.dark },
                  px: 5,
                  py: 1.2,
                  minWidth: '180px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(63, 114, 175, 0.3)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  '&:disabled': {
                    bgcolor: theme.text.hint,
                    opacity: 0.7,
                  },
                }}
              >
                {isSaving ? 'در حال ذخیره...' : 'ثبت تغییرات'}
              </Button>
            </Box>
          )}
        </Box>
        <BoardOfDirectorsRegistrationMain companyInfo={companyInfo} />
        <ToastContainer rtl />
      </Paper>
    </Fade>
  );
};

CompanyInfoPage.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};

export default CompanyInfoPage;
