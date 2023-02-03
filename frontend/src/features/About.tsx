import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PsychologyAltRoundedIcon from '@mui/icons-material/PsychologyAltRounded';
import ClearAllRoundedIcon from '@mui/icons-material/ClearAllRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';

function About(): JSX.Element {
  return (
    <Grid
      container
      spacing={4}
      xs={12}
      // columnSpacing={{ md: 12 }}
      sx={{
        marginTop: '2rem',
        width: '100%',
      }}
    >
      <Grid item xs={12}>
        <Card
          variant="outlined"
          className="whyCard"
          sx={{ width: '100%', borderRadius: '10px' }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <PsychologyAltRoundedIcon color="success" fontSize="large" />
            <Typography variant="h5" sx={{ marginTop: '15px' }}>
              Поможем выявить желания и потребности
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          variant="outlined"
          className="whyCard"
          sx={{ width: '100%', borderRadius: '10px' }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <ClearAllRoundedIcon color="success" fontSize="large" />
            <Typography variant="h5">
              Случайные вопросы, которые могут повторяться через некоторое время
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card
          variant="outlined"
          className="whyCard"
          sx={{ width: '100%', borderRadius: '10px' }}
        >
          <CardContent
            sx={{
              textAlign: 'center',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <HistoryEduRoundedIcon color="success" fontSize="large" />
            <Typography
              variant="h5"
              sx={{
                marginTop: '15px',
              }}
            >
              Добавляй свои вопросы и публикуй их, если хочешь
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default About;
