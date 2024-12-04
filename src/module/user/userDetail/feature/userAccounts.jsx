import { Box, Grid, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetUserDetail from '../service/useGetUserDetail';

const UserAccounts = () => {
  const { userId } = useParams();
  const { data } = useGetUserDetail(userId);

  console.log(data);

  const fields = [
    { label: 'شماره حساب', value: (item) => item.accountNumber },
    { label: 'بانک', value: (item) => item.bank || 'ندارد' },
    { label: 'شهر شعبه بانک', value: (item) => item.branchCity || 'ندارد' },
    { label: 'کد شعبه', value: (item) => item.branchCode || 'ندارد' },
    { label: 'نام شعبه', value: (item) => item.branchName || 'ندارد' },
    { label: 'حساب پیش فرض', value: (item) => (item.isDefault === true ? 'بله' : 'خیر') },
    { label: 'شماره شبا', value: (item) => item.sheba || 'ندارد' },
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
      {data?.accounts?.map((item, index) => (
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

export default UserAccounts;
