import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';
import About from '../About/About';

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isAdmin={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Grid
          container
          rowSpacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item xs={1} container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card sx={{ backgroundColor: '#d3eff7' }}>
                <CardContent>
                  <QuestionCarousel />
                </CardContent>
              </Card>
            </Grid>
            {/* 
            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: '#ccc',

                  justifyContent: 'center',
                  fontSize: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {' '}
                <ul>
                  <p style={{ textAlign: 'left' }}>Приложение помогает:</p>{' '}
                  <li style={{ textAlign: 'left' }}>
                    Cформировать свои желания
                  </li>
                  <li style={{ textAlign: 'left' }}>
                    Cкорректировать ценности и стремления
                  </li>
                </ul>
                {/*                 
                Человеку в апатии сложно определить свои желания, кажется, что
                совсем ничего не хочется и ничего не радует. Также в сложные
                моменты не просто сориентироваться в своих желаниях, наш сайт
                поможет скорректировать свои ценности и стремления. */}
            {/* </Card>
            </Grid> }*/}
          </Grid>
          <About />
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
                  «Мы любим психотерапию и глубоко понимаем её тончайшие нюансы.
                  И наша миссия — в том, чтобы делиться этим знанием с вами»
                </Typography>
                <Typography
                  sx={{ fontSize: 18, textAlign: 'center' }}
                  gutterBottom
                >
                  Человеку в апатии сложно определить свои желания, кажется, что
                  совсем ничего не хочется и ничего не радует. Также в сложные
                  моменты не просто сориентироваться в своих желаниях, наш сайт
                  поможет скорректировать свои ценности и стремления.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default LandingPage;
