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
import usePostProgress from '../services/usePostPlanProgress';

const UploadBox = styled(Box)({
  border: '1px dashed #999',
  borderRadius: '4px',
  padding: '16px',
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s',
  '&:hover': {
    background: '#f5f5f5',
  },
});

const EditModal = ({ open, onClose, title, trace_code, id, refreshList }) => {
  const { mutate } = usePostProgress(trace_code, id);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    mutate(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <UploadBox component="label">
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xlsx" hidden />
          <Typography variant="body1" gutterBottom>
            فایل را انتخاب کنید
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedFile ? selectedFile.name : 'فرمت های پشتیبانی شده: PDF, DOC, DOCX, XLSX'}
          </Typography>
        </UploadBox>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!selectedFile}>
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  trace_code: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  refreshList: PropTypes.func.isRequired,
};

export default EditModal;
