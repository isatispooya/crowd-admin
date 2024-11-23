import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Link, Button, CircularProgress } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import { OnRun } from 'src/api/OnRun';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import usePostProgress from '../services/usePostPlanProgress';
import useGetProgress from '../services/useGetPlanProgress';

const PlanProgress = () => {
  const { trace_code } = useParams();
  const { data, isLoading } = useGetProgress(trace_code);
  const [files, setFiles] = useState([]);
  const [postData, setPostData] = useState({});
  const [error, setError] = useState('');

  const id = data?.id;
  const { mutate } = usePostProgress(trace_code, id);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (data) {
      setFiles(data);
    }
  }, [data]);

  const handleButtonClick = () => {
    if (!postData.title) {
      setError('لطفاً عنوان را وارد کنید.');
      return;
    }
    setError('');
    mutate(postData);
    setPostData({ title: '', file: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('پیشرفت طرح با موفقیت ارسال شد');
  };

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          color: '#333',
          borderRadius: '16px 16px 0 0',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          پیشرفت طرح
        </Typography>
      </Box>

      {files.map((doc) => (
        <Box
          key={doc.id}
          sx={{
            mt: 4,
            boxShadow: 2,
            p: 3,
            borderRadius: 2,
            bgcolor: '#f9f9f9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography>عنوان: {doc.title}</Typography>
            <Link
              href={`${OnRun}/${doc.file}`}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: '16px',
                color: '#1976d2',
                fontWeight: '500',
                transition: 'color 0.3s',
                '&:hover': { textDecoration: 'underline', color: '#115293' },
              }}
            >
              فایل بارگزاری شده
            </Link>
            <FileCopyOutlinedIcon sx={{ fontSize: '16px', marginLeft: '8px', color: '#1976d2' }} />
          </Box>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              handleButtonClick();
            }}
            sx={{
              marginLeft: '10px',
              borderRadius: '8px',
            }}
          >
            ویرایش
          </Button>
        </Box>
      ))}
    </>
  );
};

export default PlanProgress;
