import React, { useState } from 'react';
import { Container, Card, CardContent, Button } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import AddQuestion from '../AddQuestion/AddQuestion';

function DashboardPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <PageWrapper isProfile={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        <Card sx={{ backgroundColor: '#ccc' }}>
          <CardContent>карточки с вопросами</CardContent>
        </Card>

        <Button variant="contained" onClick={handleOpen}>
          Добавить вопрос
        </Button>

        <AddQuestion open={open} setOpen={setOpen} />
      </Container>
    </PageWrapper>
  );
}

export default DashboardPage;
