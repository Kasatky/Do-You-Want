import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';

function About(): JSX.Element {
  return (
    <Grid container spacing={4} sx={{ marginTop: '1rem', width: '90%' }}>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent sx={{ textAlign: 'center' }}>
            <PsychologyAltRoundedIcon fontSize="large" />
            <Typography variant="h5">
              Поможем выявить желания и потребности
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent sx={{ textAlign: 'center' }}>
            <ClearAllRoundedIcon fontSize="large" />
            <Typography variant="h5">
              Случайные вопросы, которые могут повторяться через некоторое время
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent sx={{ textAlign: 'center' }}>
            <HistoryEduRoundedIcon fontSize="large" />
            <Typography variant="h5">
              Добавляй свои вопросы и публикуй их, если хочешь
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default About;
