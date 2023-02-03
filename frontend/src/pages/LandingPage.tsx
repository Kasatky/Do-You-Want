import React from 'react';
import { Container, Box, Typography } from '@mui/material';
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
          width: '100vw',
          borderRadius: '9px',
        }}
      >
        <QuestionCarousel />

        <About />

        <Box
          className="textDiv"
          sx={{
            marginTop: '2em',
            backgroundColor: '#ffffff',
            fontSize: '4vh',
            boxShadow: 'none',
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <Typography sx={{ marginBottom: '2em' }} variant="h5">
            Человеку в апатии сложно определить свои желания, кажется, что
            совсем ничего не хочется и ничего не радует.
          </Typography>
          <Typography variant="h5">
            Также в сложные моменты не просто сориентироваться в своих желаниях,
            наш сайт поможет скорректировать свои ценности и стремления.
          </Typography>
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default LandingPage;
