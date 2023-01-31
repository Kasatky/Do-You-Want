import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isProfile={false}>
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
                  «Мы любим психотерапию и глубоко понимаем её тончайшие нюансы.
                  И наша миссия — в том, чтобы делиться этим знанием с вами»
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
    </PageWrapper>
  );
}

export default LandingPage;
