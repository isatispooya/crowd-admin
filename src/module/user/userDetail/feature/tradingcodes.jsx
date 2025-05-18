import { Box, TextField, Grid, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import usePostTradingCodes from '../service/usepostTradingCodes';
import useGetUserDetail from '../service/useGetUserDetail';

const TradingCodes = () => {
  const { data } = useGetUserDetail();
  const { mutate } = usePostTradingCodes();
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (data?.trading_codes?.length > 0) {
      const tradingCode = data.trading_codes[0];
      setEditedData({
        0: {
          id: tradingCode.id,
          trading_code: tradingCode.code,
          first_part: tradingCode.firstPart,
          second_part: tradingCode.secondPart,
          third_part: tradingCode.thirdPart,
          type: tradingCode.type,
          user: tradingCode.user,
        },
      });
    }
  }, [data]);

  const handleChange = (index, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [index]: {
        ...(prev[index] || {}),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const trading_code = editedData[0]?.trading_code || data?.trading_codes?.[0]?.code || '';

      await mutate({
        uniqueIdentifier:
          data?.private_person?.[0]?.uniqueIdentifier || data?.uniqueIdentifier || '',
        trading_code,
        first_part: trading_code,
        second_part: trading_code,
        third_part: trading_code,
      });
    } catch (error) {
      console.error('خطا در ذخیره تغییرات:', error);
    }
  };

  const fields = [
    { label: 'شناسه', value: (item) => item?.id || '', field: 'id', hideWhenNew: true },
    { label: 'کد', value: (item) => item?.trading_code || item?.code || '', field: 'trading_code' },
    {
      label: 'قسمت اول',
      value: (item) => item?.first_part || item?.firstPart || '',
      field: 'first_part',
    },
    {
      label: 'قسمت دوم',
      value: (item) => item?.second_part || item?.secondPart || '',
      field: 'second_part',
    },
    {
      label: 'قسمت سوم',
      value: (item) => item?.third_part || item?.thirdPart || '',
      field: 'third_part',
    },
    { label: 'نوع', value: (item) => item?.type || '', field: 'type', hideWhenNew: true },
    { label: 'کاربر', value: (item) => item?.user || '', field: 'user', hideWhenNew: true },
  ];

  const renderTextField = (label, value, index, field) => {
    const isEmpty = !value;
    const editedValue = editedData[index]?.[field];
    const isNewEntry = !data?.trading_codes?.length;
    const getDisplayValue = () => {
      if (isEmpty && !isNewEntry) return 'ندارد';
      return editedValue !== undefined ? editedValue : value;
    };
    const displayValue = getDisplayValue();

    return (
      <TextField
        label={label}
        value={displayValue}
        fullWidth
        variant="outlined"
        InputProps={{
          readOnly: !isNewEntry && (!isEmpty || data?.trading_codes?.length > 0),
        }}
        onChange={(e) => handleChange(index, field, e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: isEmpty || isNewEntry ? '#ffffff' : '#f5f5f5',
          borderRadius: 1,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: isEmpty || isNewEntry ? '#1976d2' : '#ccc',
            },
            '&:hover fieldset': {
              borderColor: isEmpty || isNewEntry ? '#1976d2' : '#888',
            },
            '&.Mui-disabled': {
              backgroundColor: '#f5f5f5',
              '& fieldset': {
                borderColor: '#e0e0e0',
              },
              '& input': {
                color: 'rgba(0, 0, 0, 0.38)',
              },
            },
          },
        }}
      />
    );
  };

  const tradingCodesToRender = data?.trading_codes?.length > 0 ? data.trading_codes : [{}];

  return (
    <Box sx={{ p: 3 }}>
      {tradingCodesToRender.map((item, index) => (
        <Box
          key={index}
          mb={3}
          sx={{ p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}
        >
          <Grid container spacing={2}>
            {fields
              .filter((field) => data?.trading_codes?.length > 0 || !field.hideWhenNew)
              .map(({ label, value, field }, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  {renderTextField(label, value(item), index, field)}
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
      {(Object.keys(editedData).length > 0 || !data?.trading_codes?.length) && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ minWidth: 200 }}>
            {data?.trading_codes?.length > 0 ? 'ذخیره تغییرات' : 'افزودن کد معاملاتی'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TradingCodes;
