import React from 'react';
import { Container, Card, Box, Typography } from '@mui/material';
import QuestionCarousel from '../features/QuestionCarousel';
import PageWrapper from '../Wrappers/PageWrapper';
import About from '../features/About';

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isAdmin={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px', width: '90vw', borderRadius: '9px' }}>
        <Box
        >
          <Box>
            <Box>
              <Card sx={{ backgroundColor: '#03b8f00f', background: '#ffffff00', boxShadow: 'none' }}>
                <QuestionCarousel />
              </Card>
            </Box>
            <About />

            <Box className="textDiv" sx={{
              marginTop: '10vh',
              backgroundColor: '#ffffff00',
              fontSize: '4vh',
              boxShadow: 'none'
            }}>
              <Box>
                <Typography sx={{ marginBottom: '2em' }} variant="h5">
                  Человеку в апатии сложно определить свои желания, кажется, что
                  совсем ничего не хочется и ничего не радует.
                </Typography>
                <Typography variant="h5">
                  Также в сложные моменты не просто сориентироваться в своих
                  желаниях, наш сайт поможет скорректировать свои ценности и
                  стремления.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default LandingPage;
