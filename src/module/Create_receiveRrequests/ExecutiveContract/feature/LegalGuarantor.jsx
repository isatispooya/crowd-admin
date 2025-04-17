import React from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { PiTrash } from 'react-icons/pi';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useGuarantor, useDeleteGuarantor, usePatchGuarantor } from '../service/guarantorService';
import useCompanyInfoStore from '../../store/companyInfo.store';

const LegalGuarantor = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data } = useGuarantor(cartId);
  const { mutate: deleteGuarantor } = useDeleteGuarantor(cartId);
  const [selectedMembers, setSelectedMembers] = React.useState([]);

  const { guarantorInfo, setGuarantorInfo, updateGuarantorInfo, submitGuarantorInfo } =
    useCompanyInfoStore();
  const { mutate: patchGuarantor, data: patchData } = usePatchGuarantor(cartId);

  const handleChange = (field) => (event) => {
    updateGuarantorInfo(field, event.target.value);
  };

  const handleMemberSelection = (memberId) => (event) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [memberId]: event.target.checked,
    }));
  };

  console.log(data);

  const handleDelete = async (guarantorId) => {
    try {
      await deleteGuarantor(guarantorId);
    } catch (error) {
      console.error('خطا در حذف ضامن حقوقی:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = await submitGuarantorInfo();
      if (formData) {
        const payload = new FormData();
        payload.append('investor_request_id', allData.id || cartId);
        payload.append('type', 'legal');
        payload.append('company_rasmio_national_id', guarantorInfo.company_rasmio_national_id);

        await mutate(payload);

        setGuarantorInfo({
          Type: '',
          company_rasmio_national_id: '',
        });
      }
    } catch (error) {
      console.error('خطا در ارسال فرم:', error);
    }
  };

  const handleSubmitSelectedMembers = async (guarantorId) => {
    const selectedMemberIds = Object.entries(selectedMembers)
      .filter(([_, isSelected]) => isSelected)
      .map(([memberId]) => Number(memberId));

    try {
      await patchGuarantor({
        guarantorId: Number(guarantorId),
        data: {
          company_member_id: selectedMemberIds,
        },
      });
      setSelectedMembers({});
    } catch (error) {
      console.error('خطا در ارسال اعضای انتخاب شده:', error);
    }
  };

  React.useEffect(() => {
    if (allData) {
      setGuarantorInfo({
        Type: allData.id || cartId,
        company_rasmio_national_id: allData.guarantor?.company_rasmio_national_id || '',
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

  const legalGuarantors = allData?.guarantor ? allData.guarantor : [];

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="ضامن حقوقی"
            value={guarantorInfo.company_rasmio_national_id}
            onChange={handleChange('company_rasmio_national_id')}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 2 }}
          >
            +
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
        {patchData && patchData.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}> لیست ضامن های ثبت شده </Typography>
            {patchData.map((guarantor) => (
              <Box
                key={guarantor.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: 2,
                  marginBottom: 2,
                  backgroundColor: '#f8f9fa'
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>نام ضامن:</strong> {guarantor.guarantor_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>کد ملی:</strong> {guarantor.guarantor_national_id}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>نوع:</strong> {guarantor.type === 'physical' ? 'حقیقی' : 'حقوقی'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>نماینده شرکت:</strong> {guarantor.company_agent}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong>تاریخ ایجاد:</strong> {new Date(guarantor.created_at).toLocaleDateString('fa-IR')}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        )}

        {legalGuarantors.length > 0 ? (
          legalGuarantors
            .slice()
            .reverse()
            .filter((item) => item.type === 'legal')
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  padding: 2,
                  marginBottom: 2,
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'error.main',
                  }}
                >
                  <PiTrash />
                </IconButton>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong> نوع ضامن:</strong>{' '}
                      {item.type === 'legal' ? 'حقوقی' : item.type || 'تعیین نشده'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2">
                      <strong> شناسه ملی ضامن:</strong>{' '}
                      {item.company_rasmio?.national_id || 'تعیین نشده'}
                    </Typography>
                  </Grid>
                  {item.company_members && item.company_members.length > 0 && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
                        <strong>اعضای هیئت مدیره:</strong>
                      </Typography>
                      {item.company_members.map((member) => (
                        <Box
                          key={member.id}
                          sx={{
                            backgroundColor: '#f5f5f5',
                            p: 1,
                            borderRadius: 1,
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={!!selectedMembers[member.id]}
                                onChange={handleMemberSelection(member.id)}
                                color="primary"
                              />
                            }
                            label=""
                            sx={{ mr: 0 }}
                          />
                          <Box>
                            <Typography variant="body2">
                              <strong>نام:</strong> {member.person_title}
                            </Typography>
                            <Typography variant="body2">
                              <strong>سمت:</strong> {member.position_title}
                            </Typography>
                            <Typography variant="body2">
                              <strong>تاریخ شروع:</strong>{' '}
                              {new Date(member.start_date).toLocaleDateString('fa-IR')}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                      {Object.keys(selectedMembers).length > 0 && (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleSubmitSelectedMembers(item.id)}
                        >
                          تایید اعضای انتخاب شده
                        </Button>
                      )}
                      {patchData && (
                        <Box sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 1 }}>
                          <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            <strong>اطلاعات ثبت شده:</strong>
                          </Typography>
                          <Typography variant="body2">
                            <strong>وضعیت:</strong> {patchData.status || 'نامشخص'}
                          </Typography>
                          {patchData.selected_members && (
                            <Typography variant="body2">
                              <strong>تعداد اعضای تایید شده:</strong> {patchData.selected_members.length}
                            </Typography>
                          )}
                          {patchData.message && (
                            <Typography variant="body2" color="primary">
                              <strong>پیام:</strong> {patchData.message}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Box>
            ))
        ) : (
          <Typography align="center">ضامن حقوقی ثبت نشده است</Typography>
        )}
      </Box>
    </Box>
  );
};

LegalGuarantor.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default LegalGuarantor;
