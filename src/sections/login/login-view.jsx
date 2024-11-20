/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { setCookie, getCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { OnRun } from 'src/api/OnRun';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [encrypted_response, setEncrypted_response] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [registerd, setRegisterd] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessApi = getCookie('accessApi');

  const getCaptcha = () => {
    axios
      .get(`${OnRun}/api/captcha/`)
      .then((response) => {
        setEncrypted_response(response.data.captcha.encrypted_response);
        setCaptchaImage(response.data.captcha.image);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (accessApi) {
      router.push('/');
    }
  });

  const applyNationalCode = () => {
    getCaptcha();
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length !== 10) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      setLoading(true);
      axios({
        method: 'POST',
        url: `${OnRun}/api/otp/admin/`,
        data: {
          uniqueIdentifier: nationalCode,
          encrypted_response,
          captcha: captchaInput,
        },
      })
        .then((response) => {
          toast.success(response.data.message);
          setRegisterd(response.data.registered);
          setStep(2);
        })
        .catch((error) => {
          console.error('خطا:', error);
          toast.error('خطا در ارسال درخواست به سرور.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
      return;
    }
    setLoading(true);

    axios({
      method: 'POST',
      url: `${OnRun}/api/login/admin/`,
      data: { uniqueIdentifier: nationalCode, code: otp },
    })
      .then((response) => {
        if (response.data?.access) {
          setCookie('accessApi', response.data.access, 1);
          toast.success('ورود با موفقیت انجام شد');

          if (registerd) {
            router.push('/');
          } else {
            router.push('/ProfilePage');
          }

          if (response.data.message) {
            toast.info(response.data.message);
          }
        } else {
          toast.error(response.data.message || 'خطای دسترسی');
        }
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error('دسترسی شما محدود شده است. بازگشت به صفحه اصلی');
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              break;
            case 401:
              toast.error('ورود نامعتبر است، لطفا دوباره تلاش کنید');
              break;
            case 403:
              toast.error('دسترسی غیرمجاز، با پشتیبانی تماس بگیرید');
              break;
            case 500:
              toast.error('خطای سرور، لطفا بعدا دوباره تلاش کنید');
              break;
            default:
              toast.error(error.response.data?.message || 'خطای در برقراری ارتباط');
              break;
          }
        } else if (error.request) {
          toast.error('پاسخی از سرور دریافت نشد، اینترنت خود را بررسی کنید');
        } else {
          toast.error(error.response.data?.message|| 'خطای در برقرای ارتباط دوباره تلاش کنید');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(getCaptcha, []);
  const renderForm = (
    <>
      <ToastContainer autoClose={3000} />
      <Stack
        spacing={3}
        sx={{
          mb: 3,
          padding: 3,
          border: '1px solid #e0e0e0',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextField
          autoComplete="off"
          value={nationalCode}
          disabled={step === 2}
          onChange={(e) => setNationalCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              (step === 1 ? applyNationalCode : handleCode)();
            }
          }}
          label="شناسه ملی"
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '8px',
              backgroundColor: '#fafafa',
            },
            '& label.Mui-focused': {
              color: '#3f51b5',
            },
            '& .MuiOutlinedInput-root:hover': {
              borderColor: '#3f51b5',
            },
          }}
        />

        {step === 1 ? (
          <>
            <TextField
              autoComplete="off"
              onChange={(e) => setCaptchaInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') applyNationalCode();
              }}
              label="کپچا"
              value={captchaInput}
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                },
                '& label.Mui-focused': {
                  color: '#3f51b5',
                },
              }}
            />
            <Button
              onClick={getCaptcha}
              sx={{
                padding: 1,
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                '& img': {
                  height: '40px',
                },
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              <img src={`data:image/png;base64,${captchaImage}`} alt="captcha" />
            </Button>
            <Box sx={{ mb: 3 }} />
          </>
        ) : (
          <><TextField
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCode();
              } }
              label="کد تایید"
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  backgroundColor: '#fafafa',
                },
                '& label.Mui-focused': {
                  color: '#3f51b5',
                },
              }} /><Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mb: 2 }}>
                <LoadingButton
                  size="medium"
                  type="submit"
                  variant="outlined"
                  sx={{
                    color: step === 1 ? 'primary.main' : 'secondary.main',
                    borderColor: step === 1 ? 'primary.main' : 'secondary.main',
                    borderWidth: '2px',
                    borderRadius: '12px',
                    padding: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease-in-out',
                    width: '200px',
                    '&:hover': {
                      borderWidth: '2px',
                      borderColor: step === 1 ? 'primary.dark' : 'secondary.dark',
                      color: step === 1 ? 'primary.dark' : 'secondary.dark',
                      backgroundColor: 'transparent',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(1px)',
                    }
                  }}
                  onClick={() => {
                    setStep(1);
                    setCaptchaInput('');
                  } }
                  loading={loading}
                >
                  ویرایش
                </LoadingButton>
              </Box></>


        )}
      </Stack>



      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        sx={{
          bgcolor: step === 1 ? 'primary.main' : 'secondary.main',
          color: 'white',
          borderRadius: '10px',
          padding: '12px',
          fontWeight: 'bold',
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
          '&:hover': {
            bgcolor: step === 1 ? 'primary.dark' : 'secondary.dark',
          },
        }}
        onClick={step === 1 ? applyNationalCode : handleCode}
        loading={loading}
      >
        تایید
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.light, 0.3), // Light blue gradient
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          zIndex: 0,
        }}
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          maxWidth: '420px',
          mx: 'auto',
          padding: 2,
          position: 'relative',
          zIndex: 1, // Ensure it stays above the background animation
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Card
            sx={{
              p: 5,
              width: '100%',
              boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.15)',
              borderRadius: '16px',
              backgroundColor: alpha(theme.palette.background.paper, 0.95),
              border: `1px solid ${theme.palette.primary.light}`,
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.primary.main,
                marginBottom: 2,
              }}
            >
              ایساتیس کراد
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: theme.palette.text.secondary,
                marginBottom: 3,
              }}
            >
              درگاه ورود مدیریت ایساتیس کراد
            </Typography>
            <Divider
              sx={{
                my: 3,
                '&::before, &::after': {
                  borderColor: theme.palette.primary.light,
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                ورود
              </Typography>
            </Divider>
            {renderForm}
          </Card>
        </motion.div>
      </Stack>
    </Box>
  );
}
