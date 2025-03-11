import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { OnRun } from 'src/api/OnRun';
import { cardStyles } from '../style/style';

const CardFeature = ({ handleCardClick, cardData }) => (
  <motion.div style={cardStyles.container} onClick={() => handleCardClick()}>
    <Box sx={cardStyles.box}>
      <Box
        component="img"
        src={
          cardData?.company?.picture
            ? `${OnRun}/${cardData.company.picture}`
            : '/public/img/nopic.jpg'
        }
        alt={cardData?.company?.title}
        sx={cardStyles.image}
      />
      <Box sx={{ width: '100%', padding: { xs: '0 5px', sm: '0 10px' }, flexGrow: 1 }}>
        <Typography variant="h6" sx={cardStyles.typography.title}>
          {cardData.suggestion_plan_name}
        </Typography>

        <Typography variant="body1" sx={cardStyles.typography.subtitle}>
          {cardData.company.title}
        </Typography>

        <Box sx={cardStyles.divider} />

        <Box sx={cardStyles.infoBox}>
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
            <Typography variant="body2" sx={cardStyles.typography.info}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>شناسه ملی:</span>{' '}
              {cardData.company.national_id}
            </Typography>

            <Typography variant="body2" sx={cardStyles.typography.info}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>سرمایه:</span>{' '}
              {cardData.amount_of_investment}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Typography variant="body2" sx={cardStyles.typography.bankInfo}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>بانک:</span>
              <br />
              {cardData.bank}
            </Typography>

            <Typography variant="body2" sx={cardStyles.typography.bankInfo}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>شعبه:</span>
              <br />
              {cardData.bank_branch}
            </Typography>

            <Typography variant="body2" sx={cardStyles.typography.bankInfo}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>کد شعبه:</span>
              <br />
              {cardData.bank_branch_code}
            </Typography>

            <Typography variant="body2" sx={cardStyles.typography.bankInfo}>
              <span style={{ fontWeight: 'bold', color: '#333' }}>شماره ثبت :</span>
              <br />
              {cardData.company.registration_number}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={cardStyles.statusBox}>{cardData.company.status}</Box>
    </Box>
  </motion.div>
);

CardFeature.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  cardData: PropTypes.object.isRequired,
};

export default CardFeature;
