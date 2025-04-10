import { Box, Tabs, Tab } from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Analyzes from '../featuer/AnalyzesMain';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const AnalyzesPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-root': {
            minHeight: '48px',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            minHeight: '48px',
            '&.Mui-selected': {
              color: '#1976d2',
              fontWeight: 600,
            },
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="کاربران" {...a11yProps(0)} />
          <Tab label="طرح ها " {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Analyzes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '300px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <ConstructionIcon
            sx={{
              fontSize: '4rem',
              color: '#2196F3',
              marginBottom: '1rem',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          />
          <Box
            component="span"
            sx={{
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
            }}
          >
            به زودی
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: '1.2rem',
              color: '#666',
              maxWidth: '500px',
              lineHeight: '1.6',
            }}
          >
            در حال آماده‌سازی قابلیت‌های جدید برای شما هستیم
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default AnalyzesPage;
