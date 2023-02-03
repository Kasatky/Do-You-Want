import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import HistoryEduRoundedIcon from "@mui/icons-material/HistoryEduRounded";

function About(): JSX.Element {
  return (
    <Grid container spacing={4} sx={{ marginTop: "1rem" }}>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent>
            <PsychologyAltRoundedIcon fontSize="large" color="success"  />
            <Typography variant="h5">
              Поможем выявить личные желания и потребности
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent>
            <ClearAllRoundedIcon fontSize="large" color="success" />
            <Typography variant="h5">
              Случайные вопросы, которые повторяются через время
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card variant="outlined" className="whyCard">
          <CardContent>
            <HistoryEduRoundedIcon fontSize="large" color="success" />
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
