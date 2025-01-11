import { Box, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import useGetUserDetail from '../service/useGetUserDetail';

dayjs.extend(jalaliday);

const CompanyDetails = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  const toJalali = (date) => (date ? dayjs(date).calendar('jalali').format('YYYY/MM/DD') : 'ندارد');

  const fields = [
    { label: 'نام شرکت', value: (item) => item.companyName || 'ندارد' },
    { label: 'کد اقتصادی', value: (item) => item.economicCode || 'ندارد' },
    { label: 'شماره ثبت', value: (item) => item.registerNumber || 'ندارد' },
    { label: 'محل ثبت', value: (item) => item.registerPlace || 'ندارد' },
    { label: 'تاریخ ثبت', value: (item) => toJalali(item.registerDate) },
    { label: 'شناسه کاربر', value: (item) => item.user?.toString() || 'ندارد' },
    { label: 'سایر اطلاعات', value: (item) => item.another_field || 'ندارد' },
    { label: 'کشور تابعیت', value: (item) => item.citizenshipCountry || 'ندارد' },
    { label: 'تاریخ انقضای مدرک', value: (item) => toJalali(item.evidenceExpirationDate) },
    { label: 'شرکت صادرکننده مدرک', value: (item) => item.evidenceReleaseCompany || 'ندارد' },
    { label: 'تاریخ صدور مدرک', value: (item) => toJalali(item.evidenceReleaseDate) },
    { label: 'شناسه', value: (item) => item.id?.toString() || 'ندارد' },
    { label: 'دسته‌بندی نوع شخص حقوقی', value: (item) => item.legalPersonTypeCategory || 'ندارد' },
    {
      label: 'زیر دسته‌بندی نوع شخص حقوقی',
      value: (item) => item.legalPersonTypeSubCategory || 'ندارد',
    },
  ];

  const renderTextField = (label, value) => (
    <TextField
      label={label}
      value={value}
      fullWidth
      variant="outlined"
      InputProps={{ readOnly: true }}
      sx={{
        mb: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ccc',
          },
          '&:hover fieldset': {
            borderColor: '#888',
          },
        },
      }}
    />
  );

  return (
    <Box sx={{ p: 3 }}>
      {data?.legal_person?.map((item, index) => (
        <Box
          key={index}
          mb={3}
          sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}
        >
          <Grid container spacing={2}>
            {fields.map(({ label, value }, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                {renderTextField(label, value(item))}
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default CompanyDetails;
