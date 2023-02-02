import React from 'react';
import { Container, Card, Box, Typography } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';
import About from '../features/About';

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isAdmin={false}>
      <Container
        sx={{
          marginTop: '40px',
          marginBottom: '40px',
          backgroundColor: '#d6dde596',
          // width: '90vw',
          borderRadius: '9px',
        }}
      >
        <Box>
          <Box>
            <Box>
              {/* <Card
                sx={{
                  backgroundColor: '#03b8f00f',
                  background: '#ffffff00',
                  boxShadow: 'none',
                }}
              >
              </Card> */}
              <QuestionCarousel />
            </Box>
            <About />

            <Box
              sx={{
                marginTop: '10vh',
                // width: '60vw',
                backgroundColor: '#ffffff00',
                fontSize: '1em',
                boxShadow: 'none',
                // height: '55vh',
                // width: '',
                // justifyContent: 'center',
                // display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h5">
                  Человеку в апатии сложно определить свои желания, кажется, что
                  совсем ничего не хочется и ничего не радует.
                </Typography>
              </Box>
              <Typography variant="h5">
                Также в сложные моменты не просто сориентироваться в своих
                желаниях, наш сайт поможет скорректировать свои ценности и
                стремления.
              </Typography>
            </Box>
          </Box>

          {/* <Grid item xs={1}>
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
          </Grid> */}
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default LandingPage;
