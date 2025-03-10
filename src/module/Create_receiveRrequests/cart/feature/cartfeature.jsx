import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const CardFeature = ({ handleCardClick, cardData }) => {
  console.log(cardData);

  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '10px',
      }}
      onClick={() => handleCardClick(cardData.unique_id)}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: { xs: '12px', sm: '16px' },
          width: '100%',
          maxWidth: { xs: '100%', sm: '450px' },
          height: { xs: 'auto', sm: '600px' },
          minHeight: { xs: '520px', sm: '560px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
          },
        }}
      >
        <Box
          component="img"
          src={`${cardData.company.picture}`}
          alt="Product Image"
          sx={{
            width: '100%',
            height: { xs: '160px', sm: '200px' },
            objectFit: 'cover',
            borderRadius: '8px',
            mb: { xs: 2, sm: 3 },
          }}
        />
        <Box sx={{ width: '100%', padding: { xs: '0 5px', sm: '0 10px' }, flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: '#1a1a1a',
              mb: 1.5,
              textAlign: 'center',
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
              letterSpacing: '0.3px',
              lineHeight: 1.3,
            }}
          >
            {cardData.suggestion_plan_name}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: '#333',
              mb: 2,
              textAlign: 'center',
              fontWeight: '500',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              letterSpacing: '0.2px',
            }}
          >
            {cardData.company.title}
          </Typography>

          <Box
            sx={{
              width: '60%',
              height: '2px',
              backgroundColor: 'rgba(0, 32, 91, 0.15)',
              margin: '0 auto 16px auto',
              borderRadius: '2px',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
              backgroundColor: 'rgba(0, 32, 91, 0.03)',
              padding: { xs: '10px', sm: '12px' },
              borderRadius: '8px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                borderBottom: '1px dashed rgba(0, 32, 91, 0.1)',
                paddingBottom: '8px',
                gap: { xs: 1, sm: 0 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  fontWeight: '500',
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>شناسه ملی:</span>{' '}
                {cardData.company.national_id}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.9rem', sm: '0.95rem' },
                  fontWeight: '500',
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>سرمایه:</span>{' '}
                {cardData.capital}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>نوع سرمایه‌گذاری:</span>
                <br />
                {cardData.investmentType}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>مدت زمان:</span>
                <br />
                {cardData.duration}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>نرخ بازگشت:</span>
                <br />
                {cardData.returnRate}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#444',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                }}
              >
                <span style={{ fontWeight: 'bold', color: '#333' }}>تاریخ شروع:</span>
                <br />
                {cardData.startDate}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(0, 32, 91, 0.85)',
            color: '#fff',
            padding: { xs: '5px 12px', sm: '6px 14px' },
            borderRadius: '12px',
            fontSize: { xs: '0.8rem', sm: '0.85rem' },
            fontWeight: 'bold',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            letterSpacing: '0.5px',
            marginTop: { xs: '8px', sm: '10px' },
            marginBottom: { xs: '5px', sm: '0' },
          }}
        >
          {cardData.company.status}
        </Box>
      </Box>
    </motion.div>
  );
};

CardFeature.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  cardData: PropTypes.object.isRequired,
};

export default CardFeature;
