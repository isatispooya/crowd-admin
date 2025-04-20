import React, { useCallback } from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGuarantor, usePatchGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';
import GuarantorForm from './GuarantorForm';

function GuarantorComponent({ allData, initialValues, onFinishEdit }) {
  const { cartId } = useParams();
  const { mutate } = useGuarantor(cartId);
  const { mutate: updateMutate } = usePatchGuarantor(cartId);
  const { submitGuarantorInfo, resetGuarantorInfo } = useCompanyInfoStore();

  const handleSubmit = useCallback(async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        formData.append('investor_request_id', allData.id || cartId);
        formData.append('type', 'physical');
        
        if (formData.has('birth_date')) {
          const birthDate = formData.get('birth_date');
          if (birthDate && typeof birthDate === 'object' && birthDate.toString) {
            formData.set('birth_date', birthDate.toString());
          }
        }

        if (initialValues) {
          const jsonData = {};
          formData.forEach((value, key) => {
            jsonData[key] = value;
          });
          
          updateMutate({
            guarantorId: initialValues.id,
            data: jsonData
          });
        } else {
          await mutate(formData);
        }
        
        resetGuarantorInfo();
        if (initialValues && onFinishEdit) {
          onFinishEdit();
        }
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  }, [submitGuarantorInfo, allData.id, cartId, mutate, updateMutate, resetGuarantorInfo, initialValues, onFinishEdit]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <GuarantorForm initialValues={initialValues} onFinishEdit={onFinishEdit} />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        {initialValues ? 'بروزرسانی اطلاعات' : 'ذخیره اطلاعات'}
      </Button>
    </Box>
  );
}

GuarantorComponent.propTypes = {
  allData: PropTypes.shape({
    id: PropTypes.number,
    guarantor: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  initialValues: PropTypes.object,
  onFinishEdit: PropTypes.func
};

GuarantorComponent.defaultProps = {
  initialValues: null,
  onFinishEdit: () => {}
};

export default React.memo(GuarantorComponent);
