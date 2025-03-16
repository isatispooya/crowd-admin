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

const BoardOfDirectors = ({ data }) => {
  const [localBoardMembers, setLocalBoardMembers] = useState([]);

  const {

    setBoardMembers,
    boardMembersFiles,
    updateBoardMemberFile,
    initializeStore,
  } = useCompanyInfoStore();

  const { mutate } = useBoardOfDirectors(data.company_members.id);

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
        signature: member.signature ||  true,
      }));

      setBoardMembers(membersWithData);
      setLocalBoardMembers(membersWithData);
      initializeStore(data);
    }
  }, [data, setBoardMembers, initializeStore]);

  const uploadFields = [
    { id: 'validation_report', label: 'گزارش اعتبارسنجی' },
    { id: 'previous_article', label: 'مقاله قبلی' },
    { id: 'national_card', label: 'کارت ملی' },
    { id: 'identity_card', label: 'شناسنامه' },
    { id: 'signature_document', label: 'سند امضا' },
  ];

  const handleFileChange = (memberId, fieldId, file) => {
    updateBoardMemberFile(memberId, fieldId, file);
  };

  const handleConfirm = (memberId) => {
    if (!Array.isArray(localBoardMembers)) {
      console.error('localBoardMembers is not an array');
      return;
    }

    const member = localBoardMembers.find((m) => m.id === memberId);

    if (member) {
      const memberData = {
        id: memberId,
        signature: member.signature || false,
        signature_document: member.signature_document || '',
        phone_number: member.phone_number || '',
      };

      mutate(memberData);
    }
  };

  return (
    <Container maxWidth="md" dir="rtl">
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mt: 4 }}>
        {Array.isArray(localBoardMembers) && localBoardMembers.length > 0 ? (
          localBoardMembers.map((member) => (
            <Accordion key={member.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>
                  <strong>{member.person_title}</strong> - {member.position_title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {uploadFields.map((field) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    <Typography>{field.label}</Typography>
                    {boardMembersFiles[member.id]?.[field.id] ? (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 1,
                          border: '1px solid #ccc',
                          borderRadius: 1,
                        }}
                      >
                        <a
                          href={
                            boardMembersFiles[member.id][field.id]?.url ||
                            boardMembersFiles[member.id][field.id]
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', color: '#1976d2', cursor: 'pointer' }}
                        >
                          <Typography>
                            {boardMembersFiles[member.id][field.id]?.name ||
                              boardMembersFiles[member.id][field.id]}
                          </Typography>
                        </a>
                      </Box>
                    ) : (
                      <TextField
                        disabled
                        type="file"
                        fullWidth
                        inputProps={{ accept: '*' }}
                        onChange={(e) => {
                          if (e.target.files.length > 0) {
                            handleFileChange(member.id, field.id, e.target.files[0]);
                          }
                        }}
                      />
                    )}
                  </Box>
                ))}

                <Box sx={{ mb: 2 }}>
                  <Typography>شماره تلفن</Typography>
                  <TextField
                    fullWidth
                    value={member.phone_number || ''}
                    onChange={(e) =>
                      handleBoardMemberDataChange(member.id, 'phone_number', e.target.value)
                    }
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <FormControlLabel
                    label="صاحب امضا"
                    control={
                      <Switch
                        defaultChecked
                        checked={member.signature}
                        onChange={(e) =>
                          handleBoardMemberDataChange(
                            member.id,
                            'signature',
                            e.target.checked
                          )
                        }
                      />
                    }
                  />
                  
                  {member.signature && (
                    <>
                      <Typography>امضا</Typography>
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
