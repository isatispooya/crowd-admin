import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Switch, FormControlLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFees } from '../../Fees/service/BoardOfDirectors';

const BankAccesable = ({ allData }) => {
  const { cartId } = useParams();

  const { mutate } = useFees(cartId);

  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(false);

  const handleSubmit = () => {
    mutate({
      investor_request_id: cartId,
      status_payment: paymentGatewayEnabled,
    });
  };

  const handlePaymentGatewayToggle = () => {
    setPaymentGatewayEnabled(!paymentGatewayEnabled);
    handleSubmit();
  };

  return (
    <Box
      sx={{
        padding: 3,
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        marginBottom: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: 2,
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          درگاه پرداخت
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={paymentGatewayEnabled}
              onChange={() => handlePaymentGatewayToggle()}
              color="primary"
            />
          }
          label={paymentGatewayEnabled ? 'فعال' : 'غیرفعال'}
          labelPlacement="start"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          padding: 2,
          borderRadius: '10px',
          backgroundColor: '#ffffff',
          mt: 2,
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          مبلغ پرداخت: {allData?.amount_of_payment}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          وضعیت پرداخت:{' '}
          {allData?.code_status_payment === 'success' ? 'پرداخت شده' : ' در انتظار پرداخت'}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          شماره پیگیری پرداخت: {allData?.reference_number_payment}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          شماره پیگیری پرداخت: {allData?.track_id_payment}
        </Typography>
      </Box>
    </Box>
  );
};

BankAccesable.propTypes = {
  allData: PropTypes.object,
};

export default BankAccesable;
