import React from 'react';
import { Container } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';

function ProfilePage(): JSX.Element {
  return (
    <PageWrapper isProfile={true}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        CONTENT
      </Container>
    </PageWrapper>
  );
}

export default ProfilePage;
