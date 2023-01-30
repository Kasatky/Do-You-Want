import React, { useState } from 'react';
import { Container, Card, CardContent, Button } from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import QuestionView from '../Question/QuestionView';
import AddQuestion from '../AddQuestion/AddQuestion';


function DashboardPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

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
          <Grid item xs={1} container columnSpacing={4}>
            <Grid item xs={8}>
              <Card sx={{ backgroundColor: '#ccc' }}>
                <CardContent><QuestionView /></CardContent>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card sx={{ backgroundColor: '#ccc', height: '400px' }}>
                <CardContent>Список вопросов, на которые пользователь ответил "да"</CardContent>
              </Card>
            </Grid>
          </Grid>

        <Button variant="contained" onClick={handleOpen}>
          Добавить вопрос
        </Button>

        <AddQuestion open={open} setOpen={setOpen} />
      </Container>
    </PageWrapper>
  );
}

export default DashboardPage;
