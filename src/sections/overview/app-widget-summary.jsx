import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from 'src/utils/format-number';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import useGetDashboard from './service/usegetdashboard';

export default function AppWidgetSummary({ color = 'primary', sx, ...other }) {
  const { data } = useGetDashboard();

  const widgetData = [
    {
      title: 'تعداد کل طرح‌ها',
      total: data ? data['all plan'] : 0,
      icon: ListAltIcon,
      color: '#3f51b5',
    },
    {
      title: 'تعداد طرح‌های منقضی شده',
      total: data ? data['expire plan'] : 0,
      icon: AssignmentLateIcon,
      color: '#f44336',
    },
    {
      title: 'تعداد طرح‌های فعال',
      total: data ? data['active plan'] : 0,
      icon: PlayCircleOutlineIcon,
      color: '#4caf50',
    },
    {
      title: 'تعداد کل درخواست‌ها',
      total: data ? data['all cart'] : 0,
      icon: ShoppingCartIcon,
      color: '#2196f3',
    },
    {
      title: 'تعداد درخواست‌های پایان یافته',
      total: data ? data['expire cart'] : 0,
      icon: CheckCircleOutlineIcon,
      color: '#ff9800',
    },
    {
      title: 'تعداد درخواست‌های فعال',
      total: data ? data['active cart'] : 0,
      icon: MonetizationOnIcon,
      color: '#00bcd4',
    },
  ];

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      sx={{ mt: 4, mb: 4, mx: 'auto', maxWidth: '100%', width: '100%' }}
    >
      {widgetData.map((widget, index) => {
        const IconComponent = widget.icon;

        const cardHeight = widget.total.toString().length > 5 ? 200 : 150;

        return (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              sx={{
                p: 2,
                height: cardHeight,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                transition: '0.3s',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,1))',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
                },
                ...sx,
              }}
              {...other}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexGrow: 1,
                }}
              >
                <Typography variant="h4" sx={{  marginBottom: '4px' }}>
                  {widget.total === 0 ? 0 : fShortenNumber(widget.total)}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: '500' }}>
                  {widget.title}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: widget.color,
                }}
              >
                <IconComponent style={{ fontSize: '2.2rem' }} />
              </Box>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  sx: PropTypes.object,
};
