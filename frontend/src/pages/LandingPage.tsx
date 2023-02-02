import React from 'react';
import { Container, Card, Box } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';
import About from '../features/About';

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isAdmin={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px', backgroundColor: '#d6dde596', width: '90vw', borderRadius: '9px' }}>
        <Box
        >
          <Box>
            <Box>
              <Card sx={{ backgroundColor: '#03b8f00f', background: '#ffffff00', boxShadow: 'none' }}>

                <QuestionCarousel />

              </Card>
            </Box>
            <About />

            <Box sx={{
              marginTop: '10vh',
              width: '60vw',
              backgroundColor: '#ffffff00',
              fontSize: '4vh',
              boxShadow: 'none'
              // height: '55vh',
              // width: '',
              // justifyContent: 'center',
              // display: 'flex',
              // flexDirection: 'column',
              // alignItems: 'center',
            }}>
              <Box>
                Человеку в апатии сложно определить свои желания, кажется, что
                совсем ничего не хочется и ничего не радует.
              </Box>
              Также в сложные
              моменты не просто сориентироваться в своих желаниях, наш сайт
              поможет скорректировать свои ценности и стремления.

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
    </PageWrapper >
  );
}

export default LandingPage;
