import React from 'react';
import {
  Container,
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

function Main(): JSX.Element {
  return (
    <div style={{ height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar sx={{ padding: '20px 0' }}>
              <Typography component="div" sx={{ flexGrow: 1 }}>
                <img width="100px" src="img/logo.png" alt="logo" />
              </Typography>

              <Button
                variant="contained"
                sx={{ width: '80px', height: '80px', borderRadius: '50%' }}
              >
                Войти
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Grid
          container
          rowSpacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item xs={1} container columnSpacing={4}>
            <Grid item xs={8}>
              <Card sx={{ backgroundColor: '#ccc' }}>
                <CardContent>карточки с вопросами</CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ backgroundColor: '#ccc', height: '400px' }}>
                <CardContent>картинка или гифка для красоты</CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid item xs={1}>
            <Card sx={{ backgroundColor: '#ccc' }}>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 18,
                    textAlign: 'center',
                  }}
                  gutterBottom
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus.
                  Nisl vel pretium lectus quam id leo in vitae. Nunc sed blandit
                  libero volutpat sed. Orci eu lobortis elementum nibh tellus.
                  Sagittis orci a scelerisque purus semper. Diam volutpat
                  commodo sed egestas. Est lorem ipsum dolor sit amet
                  consectetur. Turpis egestas maecenas pharetra convallis
                  posuere morbi leo.
                </Typography>
                <Typography
                  sx={{ fontSize: 18, textAlign: 'center' }}
                  gutterBottom
                >
                  Cursus in hac habitasse platea dictumst quisque. Semper quis
                  lectus nulla at. Sagittis aliquam malesuada bibendum arcu
                  vitae elementum curabitur vitae nunc. Varius morbi enim nunc
                  faucibus a. Suspendisse faucibus interdum posuere lorem ipsum
                  dolor. Sit amet porttitor eget dolor morbi. Egestas dui id
                  ornare arcu odio ut sem nulla pharetra. Magna sit amet purus
                  gravida. Amet purus gravida quis blandit turpis cursus in. Ac
                  auctor augue mauris augue neque gravida. Tellus rutrum tellus
                  pellentesque eu tincidunt tortor. Massa eget egestas purus
                  viverra accumsan in nisl.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar sx={{ padding: '20px 0' }}>FOOTER</Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
}

export default Main;
