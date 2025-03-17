import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useParams } from 'react-router-dom';
import { useAssumptions } from '../service/assumptions';

const Assumptions = ({ allData }) => {
  const { cartId } = useParams();
  const { mutate, data: responseData } = useAssumptions();
  const [formData, setFormData] = React.useState({
    investor_request_id: cartId,
    title: allData?.assumptions?.title || '',
    value: allData?.assumptions?.value || '',
  });
  const handleChange = (field) => (event) => {
    const value = event.target.value.replace(/,/g, '');
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        investor_request: allData.id,
        ...formData,
      };

      await mutate(payload);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  React.useEffect(() => {
    if (responseData) {
      setFormData({
        investor_request_id: cartId || '',
        title: responseData.title || '',
        value: responseData.value || '',
      });
    }
  }, [responseData, cartId]);

  return (
    <Box component="form" sx={{ padding: 2, borderRadius: 1 }} noValidate autoComplete="off">
      <Accordion
        sx={{
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          padding: '10px',
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>مفروضات</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="عنوان"
                value={formData.title}
                onChange={handleChange('title')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="مقدار"
                value={formData.value}
                onChange={handleChange('value')}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
                ذخیره اطلاعات
              </Button>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

Assumptions.propTypes = {
  allData: PropTypes.object.isRequired,
};

export default Assumptions;
