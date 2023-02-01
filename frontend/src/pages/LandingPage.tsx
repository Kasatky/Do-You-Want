import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';

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
            <Grid item xs={12} sm={8}>
              <Card sx={{ backgroundColor: '#d3eff7' }}>
                <CardContent>
                  <QuestionCarousel />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: '#ccc',

                  justifyContent: 'center',

                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >

                Человеку в апатии сложно определить свои желания, кажется, что
                совсем ничего не хочется и ничего не радует. Также в сложные
                моменты не просто сориентироваться в своих желаниях, наш сайт
                поможет скорректировать свои ценности и стремления.

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
