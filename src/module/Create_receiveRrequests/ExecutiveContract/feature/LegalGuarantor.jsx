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

const GuarantorInfo = ({ guarantor }) => (
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
);

const BoardMember = ({ member, isSelected, onSelect }) => (
  <Box
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
      control={<Checkbox checked={isSelected} onChange={onSelect} color="primary" />}
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
        <strong>تاریخ شروع:</strong> {new Date(member.start_date).toLocaleDateString('fa-IR')}
      </Typography>
    </Box>
  </Box>
);

const LegalGuarantor = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate } = useGuarantor(cartId);
  const { mutate: deleteGuarantor } = useDeleteGuarantor(cartId);
  const [selectedMembers, setSelectedMembers] = React.useState({});
  const [documentNewsPaper, setDocumentNewsPaper] = React.useState('');

  const { guarantorInfo, setGuarantorInfo, updateGuarantorInfo, submitGuarantorInfo } =
    useCompanyInfoStore();
  const { mutate: patchGuarantor, data: patchData } = usePatchGuarantor(cartId);

  const handleChange = (field) => (event) => {
    updateGuarantorInfo(field, event.target.value);
  };

  const handleDocumentNewsPaperChange = (event) => {
    setDocumentNewsPaper(event.target.value);
  };

  const handleMemberSelection = (memberId) => (event) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [memberId]: event.target.checked,
    }));
  };

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
        payload.append('document_news_paper', documentNewsPaper);
        await mutate(payload);
        setGuarantorInfo({ Type: '', company_rasmio_national_id: '' });
        setDocumentNewsPaper('');
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
        data: { company_member_id: selectedMemberIds },
        document_news_paper: guarantorInfo.document_news_paper,
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
        document_news_paper: allData.guarantor?.document_news_paper || '',
      });
    }
  }, [allData, cartId, setGuarantorInfo]);

  const legalGuarantors = allData?.guarantor?.filter((item) => item.type === 'legal') || [];

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
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="روزنامه رسمی"
            value={documentNewsPaper}
            onChange={handleDocumentNewsPaperChange}
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
            افزودن ضامن
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ maxHeight: 400, overflow: 'auto', mt: 2 }}>
        {patchData?.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              لیست ضامن های ثبت شده
            </Typography>
            {patchData.map((guarantor) => (
              <Box
                key={guarantor.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  p: 2,
                  mb: 2,
                  bgcolor: '#f8f9fa',
                }}
              >
                <GuarantorInfo guarantor={guarantor} />
              </Box>
            ))}
          </Box>
        )}

        {legalGuarantors.length > 0 ? (
          legalGuarantors
            .slice()
            .reverse()
            .map((item) => (
              <Box
                key={item.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  p: 2,
                  mb: 2,
                  position: 'relative',
                }}
              >
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'error.main' }}
                >
                  <PiTrash />
                </IconButton>

                <GuarantorInfo guarantor={item} />

                {item.company_members?.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mb: 1, mt: 2 }}>
                      <strong>اعضای هیئت مدیره:</strong>
                    </Typography>
                    {item.company_members.map((member) => (
                      <BoardMember
                        key={member.id}
                        member={member}
                        isSelected={!!selectedMembers[member.id]}
                        onSelect={handleMemberSelection(member.id)}
                      />
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
                  </Grid>
                )}
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

GuarantorInfo.propTypes = {
  guarantor: PropTypes.object.isRequired,
};

BoardMember.propTypes = {
  member: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LegalGuarantor;
