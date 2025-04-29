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
      const data = await submitGuarantorInfo();
      if (data) {
        const jsonData = {
          ...data,
          investor_request_id: allData.id || cartId,
          type: 'physical'
        };

        console.log('فرم ضامن غیرفعال شده است', jsonData);

        if (initialValues) {
          updateMutate({
            guarantorId: initialValues.id,
            data: jsonData
          });
        } else {
          await mutate(jsonData);
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
    <Box sx={{ padding: 2, borderRadius: 1 }}>
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
