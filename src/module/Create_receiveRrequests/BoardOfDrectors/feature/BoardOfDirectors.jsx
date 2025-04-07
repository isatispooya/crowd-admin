import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Box,
  Paper,
  Container,
  Switch,
  FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import useCompanyInfoStore from '../../store/companyInfo.store';
import { useBoardOfDirectors } from '../service/BoardOfDirectors';

const UPLOAD_FIELDS = [
  { id: 'validation_report', label: 'گزارش اعتبارسنجی' },
  { id: 'previous_article', label: 'سوسابقه' },
  { id: 'national_card', label: 'کارت ملی' },
  { id: 'identity_card', label: 'شناسنامه' },
];

const PASTEL_BLUE = {
  light: '#E6F4FF',
  main: '#B3E0FF',
  dark: '#6B9ACD',
  contrastText: '#1A365D',
};

const styles = {
  fieldTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2c3e50',
    mb: 1,
  },
  fileBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 3,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e1e8ed',
    marginTop: 2,
    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    },
  },
  emptyFileBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    p: 3,
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    border: '1px dashed #cbd5e1',
    marginTop: 2,
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  fileLink: {
    textDecoration: 'none',
    color: PASTEL_BLUE.contrastText,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  fileLinkText: {
    fontWeight: 500,
    '&:hover': {
      color: PASTEL_BLUE.dark,
    },
  },
  phoneInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      '&:hover fieldset': {
        borderColor: '#3498db',
      },
    },
    '& .MuiOutlinedInput-input': {
      padding: '12px 16px',
    },
  },
};

const FileDisplay = ({ fileUrl, label }) => {
  const fullUrl = fileUrl ? `https://apicrowd.isatispooya.com/${fileUrl}` : '#';
  
  return (
    <Box sx={styles.fileBox}>
      <a href={fullUrl} target="_blank" rel="noopener noreferrer" style={styles.fileLink}>
        <Typography sx={styles.fileLinkText}>{label}</Typography>
      </a>
    </Box>
  );
};

FileDisplay.propTypes = {
  fileUrl: PropTypes.string,
  label: PropTypes.string.isRequired,
};

const BoardOfDirectors = ({ data }) => {
  const [localBoardMembers, setLocalBoardMembers] = useState([]);
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  const { setBoardMembers, boardMembersFiles, initializeStore } = useCompanyInfoStore();
  const { mutate } = useBoardOfDirectors(expandedMemberId ? [expandedMemberId] : []);

  const handleAccordionChange = (memberId) => (_, isExpanded) => {
    setExpandedMemberId(isExpanded ? memberId : null);
  };

  const handleBoardMemberDataChange = (memberId, field, value) => {
    setLocalBoardMembers((prev) =>
      prev.map((member) => (member.id === memberId ? { ...member, [field]: value } : member))
    );
  };

  useEffect(() => {
    if (data?.company_members) {
      const members = Array.isArray(data.company_members) ? data.company_members : [];

      const membersWithData = members.map((member) => ({
        ...member,
        phone_number: member.phone_number || '',
        signature: member.signature || false,
      }));

      setBoardMembers(membersWithData);
      setLocalBoardMembers(membersWithData);
      initializeStore(data);
    }
  }, [data, setBoardMembers, initializeStore]);

  const handleConfirm = (memberId) => {
    if (!Array.isArray(localBoardMembers)) return;

    const member = localBoardMembers.find((m) => m.id === memberId);
    if (!member) return;

    const memberData = {
      id: memberId,
      signature: member.signature || false,
      signature_document: member.signature_document || '',
      phone_number: member.phone_number || '',
    };

    mutate(memberData);
  };

  const renderMemberFields = (member) => (
    <>
      {UPLOAD_FIELDS.map((field) => (
        <Box key={field.id} sx={{ mb: 3 }}>
          <Typography sx={styles.fieldTitle}>{field.label}</Typography>
          
          {boardMembersFiles[member.id]?.[field.id] ? (
            <FileDisplay 
              fileUrl={boardMembersFiles[member.id][field.id]?.url || boardMembersFiles[member.id][field.id]}
              label={field.label}
            />
          ) : (
            <Box sx={styles.emptyFileBox}>فایل اضافه نشده است</Box>
          )}
        </Box>
      ))}

      <Box sx={{ mb: 3 }}>
        <Typography sx={styles.fieldTitle}>شماره تلفن</Typography>
        <TextField
          fullWidth
          value={member.phone_number || ''}
          onChange={(e) => handleBoardMemberDataChange(member.id, 'phone_number', e.target.value)}
          sx={styles.phoneInput}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <FormControlLabel
          label="صاحب امضا"
          control={
            <Switch
              checked={member.signature}
              onChange={(e) => handleBoardMemberDataChange(member.id, 'signature', e.target.checked)}
            />
          }
        />

        {member.signature && (
          <>
            <Typography>توضیحات مستندات صاحب امضا</Typography>
            <TextField
              fullWidth
              value={member.signature_document || ''}
              onChange={(e) =>
                handleBoardMemberDataChange(member.id, 'signature_document', e.target.value)
              }
            />
          </>
        )}
      </Box>

      <Button
        onClick={() => handleConfirm(member.id)}
        fullWidth
        variant="outlined"
        color="primary"
      >
        تایید
      </Button>
    </>
  );

  return (
    <Container maxWidth="md" dir="rtl">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
        {Array.isArray(localBoardMembers) && localBoardMembers.length > 0 ? (
          localBoardMembers.map((member) => (
            <Accordion
              key={member.id}
              expanded={expandedMemberId === member.id}
              onChange={handleAccordionChange(member.id)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>{member.person_title}</strong> - {member.position_title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderMemberFields(member)}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography>هیچ عضوی در هیئت مدیره یافت نشد.</Typography>
        )}
      </Paper>
    </Container>
  );
};

BoardOfDirectors.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BoardOfDirectors;
