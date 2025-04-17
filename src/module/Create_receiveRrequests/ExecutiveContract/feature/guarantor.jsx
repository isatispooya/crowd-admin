import React, { useCallback, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGuarantor, useDeleteGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';
import GuarantorForm from './GuarantorForm';
import GuarantorList from './GuarantorList';

function GuarantorComponent({ allData }) {
  const { cartId } = useParams();
  const { mutate } = useGuarantor(cartId);
  const { mutate: deleteGuarantor } = useDeleteGuarantor(cartId);
  const { submitGuarantorInfo, resetGuarantorInfo } = useCompanyInfoStore();

  const handleSubmit = useCallback(async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        formData.append('investor_request_id', allData.id || cartId);
        formData.append('type', 'physical');
        await mutate(formData);
        resetGuarantorInfo();
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  }, [submitGuarantorInfo, allData.id, cartId, mutate, resetGuarantorInfo]);

  const handleDelete = useCallback(async (guarantorId) => {
    try {
      await deleteGuarantor(guarantorId);
    } catch (error) {
      console.error('خطا در حذف ضامن:', error);
    }
  }, [deleteGuarantor]);

  const nonLegalGuarantors = useMemo(() => 
    allData?.guarantor?.filter((g) => g.type !== 'legal') ?? []
  , [allData?.guarantor]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <GuarantorForm />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2, mb: 2 }}
      >
        ذخیره اطلاعات
      </Button>

      <GuarantorList 
        guarantors={nonLegalGuarantors} 
        onDelete={handleDelete} 
      />
    </Box>
  );
}

GuarantorComponent.propTypes = {
  allData: PropTypes.shape({
    id: PropTypes.number,
    guarantor: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
};

export default React.memo(GuarantorComponent);
