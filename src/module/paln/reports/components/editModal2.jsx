import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import usePostAudit from '../services/usePostAudit';

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const EditModal2 = ({ open, onClose, title, trace_code, id, refreshList }) => {
  const { mutate } = usePostAudit(trace_code, id);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    mutate(selectedFile);
    refreshList();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <UploadBox component="label">
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xlsx" hidden />

          <Typography variant="h6" gutterBottom>
            فایل را انتخاب کنید
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedFile ? selectedFile.name : 'فرمت های پشتیبانی شده: PDF, DOC, DOCX, XLSX'}
          </Typography>
        </UploadBox>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          انصراف
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedFile}>
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditModal2.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  trace_code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  refreshList: PropTypes.func.isRequired,
};

export default EditModal2;
