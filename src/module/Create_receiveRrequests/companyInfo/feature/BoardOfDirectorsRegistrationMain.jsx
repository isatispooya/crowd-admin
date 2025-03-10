import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CompanyBankInfo from './companyBankInfo';
import CompanyInfo from './companyInfo';
import CompanyRegister from './companyRegister';

const BoardOfDirectorsRegistrationMain = () => {
  const [expandedPanel, setExpandedPanel] = React.useState(null);

  const handleExpansion = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div>
      <Accordion
        expanded={expandedPanel === 'companyInfo'}
        onChange={handleExpansion('companyInfo')}
        sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '30px' }}>•</span>
            اطلاعات شرکت
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedPanel === 'companyBankInfo'}
        onChange={handleExpansion('companyBankInfo')}
        sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '30px' }}>•</span>
            اطلاعات بانکی
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyBankInfo />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expandedPanel === 'companyRegister'}
        onChange={handleExpansion('companyRegister')}
        sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          marginBottom: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">
            <span style={{ color: 'navy', marginLeft: '5px', fontSize: '30px' }}>•</span>
            اطلاعات طرح
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CompanyRegister />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BoardOfDirectorsRegistrationMain;
