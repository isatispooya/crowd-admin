import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Switch, FormControlLabel, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { errorMsg } from 'src/module/paln/feature/participant/dargahmsg';
import { useFees } from '../../Fees/service/BoardOfDirectors';
import { useBankValidate } from '../../AgencyContract/service/bankValidate';

const BankAccesable = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate: validateBank } = useBankValidate();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(null);
  const [transactionDetails, setTransactionDetails] = useState(null);
  console.log(allData);

  const { mutate } = useFees(cartId);

  const [paymentGatewayEnabled, setPaymentGatewayEnabled] = useState(
    allData?.status_payment || false
  );

  const handlePaymentGatewayToggle = (event) => {
    const newValue = event.target.checked;
    setPaymentGatewayEnabled(newValue);
    mutate({
      investor_request_id: cartId,
      status_payment: newValue,
    });
  };

  const handleInvoiceDownload = () => {
    navigate(`/invoice/${cartId}`);
  };

  const handleBankValidate = () => {
    validateBank(
      { investor_request: cartId },
      {
        onSuccess: (response) => {
          setValidationError(null);
          setTransactionDetails(response);
        },
        onError: (error) => {
          setValidationError(errorMsg(error?.response?.data?.message));
          setTransactionDetails(null);
        },
      }
    );
  };

  const showBtn = allData?.investor_request?.code_status_payment === 'success';

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
              onChange={handlePaymentGatewayToggle}
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
          مبلغ پرداخت: {allData?.investor_request?.amount_of_payment}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          وضعیت پرداخت:{' '}
          {allData?.investor_request?.code_status_payment === 'success'
            ? 'پرداخت شده'
            : ' در انتظار پرداخت'}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          شماره پیگیری پرداخت: {allData?.investor_request?.reference_number_payment}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          شماره پیگیری پرداخت: {allData?.investor_request?.track_id_payment}
        </Typography>

        {showBtn && (
          <Button variant="contained" color="primary" onClick={handleInvoiceDownload}>
            دانلود صورتحساب
          </Button>
        )}
        <Button variant="contained" color="secondary" onClick={handleBankValidate} sx={{ mt: 2 }}>
          اعتبارسنجی بانک
        </Button>
        {validationError && (
          <Typography color="error" sx={{ mt: 1 }}>
            {validationError}
          </Typography>
        )}
        {transactionDetails && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {errorMsg[transactionDetails.status] || 'وضعیت نامشخص'}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

BankAccesable.propTypes = {
  allData: PropTypes.object,
};

export default BankAccesable;
