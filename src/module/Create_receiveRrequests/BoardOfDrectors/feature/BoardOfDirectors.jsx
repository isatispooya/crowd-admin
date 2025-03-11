import PropTypes from 'prop-types';
import { OnRun } from 'src/api/OnRun';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BoardOfDirectors = ({ data }) => {
  const members = data?.company_members || [];
  return (
    <div style={{ padding: '20px' }}>
      {members.length > 0 ? (
        members.map((member) => (
          <Accordion key={member.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${member.id}-content`}
              id={`panel-${member.id}-header`}
            >
              <Typography>
                <strong>{member.person_title}</strong> - {member.position_title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                <li>
                  عکس:
                  <a
                    href={`${OnRun}/${member.picture_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    لینک
                  </a>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Typography>هیچ عضوی در هیئت مدیره یافت نشد.</Typography>
      )}
    </div>
  );
};

BoardOfDirectors.propTypes = {
  data: PropTypes.object.isRequired,
};

export default BoardOfDirectors;
