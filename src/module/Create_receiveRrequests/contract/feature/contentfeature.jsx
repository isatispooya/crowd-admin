/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { SubmitButton } from 'src/components/button';
import PropTypes from 'prop-types';
import UseCartId from 'src/hooks/card_id';
import { toast } from 'react-toastify'; 
import useCompanyInfoStore from '../../store/companyInfo.store';
import ContentInput from './contractInput';
import SwitchContract from './switchInputs';
import UsePostContract from '../services/usePostContract';

const ContractFeature = ({ contractData }) => {
  const { cartId } = UseCartId();
  const { mutate } = UsePostContract(cartId);

  const { 
    contract, 
    setContract,
    isLoading 
  } = useCompanyInfoStore();

  useEffect(() => {
    if (contractData && Object.keys(contractData).length > 0) {
      setContract(contractData);
    }
  }, [contractData, setContract]);

  const postContractData = () => {
    mutate(contract, {
      onSuccess: () => {
        toast.success('اطلاعات قرارداد با موفقیت ارسال شد');
      },
      onError: () => {
        toast.error('خطا در ارسال اطلاعات قرارداد');
      },
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ContentInput />
      </Grid>
      <Grid item xs={12}>
        <SwitchContract />
      </Grid>
      <Grid item xs={12}>
        <SubmitButton
          contractData={contract}
          onClick={postContractData}
          postContractData={postContractData}
          disabled={isLoading}
        />
      </Grid>
    </Grid>
  );
};

ContractFeature.propTypes = {
  contractData: PropTypes.object,
};

export default ContractFeature;
