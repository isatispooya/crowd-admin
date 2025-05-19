import { Typography, Paper, Box, Grid, TextField, Button, Fade, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { useState } from 'react';
import DateObject from 'react-date-object';
import { toast, ToastContainer } from 'react-toastify';
import useGetUser from 'src/module/user/users/services/useGetUser';
import 'react-toastify/dist/ReactToastify.css';
import BoardOfDirectorsRegistrationMain from '../feature/BoardOfDirectorsRegistrationMain';
import { useCompanyInfo } from '../../ExecutiveContract/service/companyinfoService';
import { useFees } from '../../Fees/service/BoardOfDirectors';

const CompanyInfoPage = ({ companyInfo, refetch }) => {
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

  const formatNumber = (number) => number?.toString?.().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const cartId = companyInfo?.id;
  const { mutate } = useCompanyInfo(cartId);
  const { mutate: changeRequest } = useFees(cartId);
  const { data: userData } = useGetUser();
  console.log(userData);
  const [localCompanyInfo, setLocalCompanyInfo] = useState(companyInfo);
  const [pendingChanges, setPendingChanges] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [userIdentifier, setUserIdentifier] = useState('');

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
    } else if (field === 'activity_field') {
      setLocalCompanyInfo((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          activity_field: value,
        },
      }));
      setPendingChanges((prev) => ({
        ...prev,
        activity_field: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(pendingChanges).length === 0) return;

    const dataToSubmit = { ...pendingChanges };

    if (!Object.prototype.hasOwnProperty.call(dataToSubmit, 'registration_date')) {
      dataToSubmit.registration_date = companyInfo?.company?.registration_date;
    }

    if (!Object.prototype.hasOwnProperty.call(dataToSubmit, 'capital')) {
      dataToSubmit.capital = Number(companyInfo.company.capital.toString().replace(/,/g, ''));
    }
    if (!Object.prototype.hasOwnProperty.call(dataToSubmit, 'activity_field')) {
      dataToSubmit.activity_field = companyInfo.company.activity_field;
    }

    setIsSaving(true);
    try {
      await mutate(dataToSubmit, {
        onSuccess: () => {
          refetch();
        },
      });
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

  const handleUserUpdate = () => {
    if (!userIdentifier) {
      toast.error('لطفا شناسه کاربر را وارد کنید', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    const user = userData?.find((u) => u.uniqueIdentifier === userIdentifier);
    if (!user) {
      toast.error('کاربر با این شناسه یافت نشد', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    changeRequest(
      { user: user.id },
      {
        onSuccess: () => {
          toast.success('کاربر با موفقیت به‌روزرسانی شد', {
            position: 'top-center',
            autoClose: 3000,
          });
          setUserIdentifier('');
        },
        onError: (error) => {
          toast.error('خطا در به‌روزرسانی کاربر', {
            position: 'top-center',
            autoClose: 3000,
          });
          console.error('Error updating user:', error);
        },
      }
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
                mb: 4,
                textAlign: 'center',
                color: theme.primary.dark,
                fontWeight: 700,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-12px',
                  left: '10%',
                  width: '80%',
                  height: '3px',
                  background: `linear-gradient(90deg, ${theme.primary.main}, ${theme.secondary.main})`,
                  borderRadius: '2px',
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
                  value={formatNumber(localCompanyInfo.company.capital)}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    if (!Number.isNaN(Number(value))) {
                      handleUpdate('capital', value);
                    }
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

          <Box
            sx={{
              p: { xs: 2, md: 3 },
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              border: `1px solid ${theme.secondary.light}`,
              background: `linear-gradient(145deg, ${theme.background.paper}, ${theme.primary.light}05)`,
              mt: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: theme.primary.main,
                mb: 2,
                fontWeight: 600,
              }}
            >
              به‌روزرسانی درخواست دهنده
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="شناسه کاربر"
                  value={userIdentifier}
                  onChange={(e) => setUserIdentifier(e.target.value)}
                  InputProps={{
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
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleUserUpdate}
                  sx={{
                    bgcolor: theme.primary.main,
                    '&:hover': { bgcolor: theme.primary.dark },
                    height: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(63, 114, 175, 0.3)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                  }}
                >
                  به‌روزرسانی درخواست دهنده
                </Button>
              </Grid>
            </Grid>
          </Box>

          <BoardOfDirectorsRegistrationMain companyInfo={companyInfo} />
        </Paper>
      </Fade>
    </>
  );
};

CompanyInfoPage.propTypes = {
  companyInfo: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default CompanyInfoPage;
