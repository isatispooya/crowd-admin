import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/material';
import { CompanyInfoPage } from '../companyInfo/page';

const CapitalCapable = () => (
  <div className="p-4 sm:p-6 lg:p-8 bg-transparent min-h-screen flex justify-center items-start">
    <Box sx={{ width: '100%', padding: 3, backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: 3, marginTop: '40px' }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">سرمایه پذیر</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyInfoPage />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">سرمایه پذیر</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  </div>
);

export default CapitalCapable;
