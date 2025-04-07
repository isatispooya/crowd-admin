/* eslint-disable no-unsafe-optional-chaining */
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { AccessTime, Description, Refresh } from '@mui/icons-material';
import moment from 'moment-jalaali';
import { OnRun } from 'src/api/OnRun';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetPlanDetail from '../../service/plandetail/useGetPlandetail';
import { plan_fields_input, plan_fields_textarea } from '../../object/planFilds';
import { useGetPic } from '../../service/planPicture/useGetPic';
import ProgressLineChart from '../cart/progressLBar';
import useUpdatePlanDetail from './detailHook';

const PlanDetail = () => {
  const { trace_code } = useParams();
  const { data, isLoading, refetch: refetchPlanDetail } = useGetPlanDetail(trace_code);
  const planDetails = plan_fields_input();
  const { mutate: updateDetails } = useUpdatePlanDetail(trace_code);
  const planDetailstextarea = plan_fields_textarea();
  const { data: picdata, refetch: refetchPic } = useGetPic(trace_code);

  const handleUpdate = async () => {
    try {
      await updateDetails(data?.plan);
      // Refetch both the plan details and picture data
      await Promise.all([refetchPlanDetail(), refetchPic()]);
      toast.success('طرح با موفقیت بروزرسانی شد', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error updating plan:', error);
      toast.error('خطا در بروزرسانی طرح', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const formatDate = (date) => (date ? moment(date).format('jYYYY/jM/jD') : 'اطلاعات موجود نیست.');
  const isDataAvailable = data && Object.keys(data).length > 0;

  if (isLoading || !isDataAvailable) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const nameField = planDetails.find((item) => item.label === 'عنوان');
  const otherFields = planDetails.filter((item) => item.label !== 'عنوان');
  const descriptionField = planDetailstextarea.find((item) => item.label === 'شرح فارسی');

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          padding: 3,
          borderRadius: '16px',
          margin: '0 auto',
          boxShadow: 3,
        }}
      >
        <Paper elevation={2} sx={{ borderRadius: '16px 16px 0 0' }}>
          <Box
            sx={{
              backgroundColor: '#e0e0e0',
              color: '#333',
              borderRadius: '16px 16px 0 0',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4" component="h1" fontWeight="bold">
              اطلاعات طرح
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={handleUpdate}
              sx={{ ml: 2 }}
            >
              بروزرسانی
            </Button>
          </Box>
        </Paper>

        <Box sx={{ padding: 4 }}>
          {nameField && (
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    minHeight: '100px',
                    position: 'relative',
                  }}
                >
                  <Typography variant="body2" sx={{ ml: 7, fontWeight: 700, fontSize: '30px' }}>
                    {nameField.isDate
                      ? formatDate(data?.plan?.[nameField.value])
                      : data?.plan?.[nameField.value] ?? 'اطلاعات موجود نیست.'}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <img
              src={picdata?.picture ? `${OnRun}/${picdata.picture}` : '/public/img/nopic.jpg'}
              alt={picdata?.picture ? 'تصویر پروژه' : 'تصویر موجود نیست'}
              className="h-94 w-auto rounded-lg mb-8 block mx-auto shadow-md"
            />
          </Box>

          {descriptionField && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2,
                borderRadius: '8px',
                minHeight: '100px',
                overflow: 'hidden',
                marginBottom: 4,
              }}
            >
              <Typography variant="p" sx={{ textAlign: 'center', fontWeight: 500 }}>
                {data?.plan?.[descriptionField.value] ?? 'اطلاعات موجود نیست.'}
              </Typography>
            </Box>
          )}

          <Grid container spacing={3}>
            {otherFields.map((item) => (
              <Grid item xs={12} sm={4} key={item.value}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 2,
                    borderRadius: '8px',
                    boxShadow: 2,
                    backgroundColor: '#fafdff',
                    minHeight: '100px',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      fontSize: '30px',
                      opacity: 0.5,
                    }}
                  >
                    {item.isDate ? (
                      <AccessTime color="secondary" fontSize="inherit" />
                    ) : (
                      <Description color="action" fontSize="inherit" />
                    )}
                  </IconButton>
                  <Typography variant="body2" sx={{ ml: 7, fontSize: 18 }}>
                    {item.label}:{' '}
                    {item.isDate
                      ? formatDate(data?.plan?.[item.value])
                      : data?.plan?.[item.value] ?? 'اطلاعات موجود نیست.'}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <Divider />
        </div>

        <ProgressLineChart
          label="تامین شده"
          total_price={data.plan?.total_price}
          amount_collected_now={Math.round(data.information_complete?.amount_collected_now ?? 0)}
        />
      </Box>
    </>
  );
};

export default PlanDetail;
