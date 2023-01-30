import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import AddQuestion from '../AddQuestion/AddQuestion';

function DashboardPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <PageWrapper isProfile={false}>
      <Container sx={{ marginTop: '40px', marginBottom: '40px' }}>
        {/* <Grid
          container
          rowSpacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        > */}
        {/* <Grid item xs={1}> */}
        <Card sx={{ backgroundColor: '#ccc' }}>
          <CardContent>карточки с вопросами</CardContent>
        </Card>
        {/* </Grid> */}

        <Button variant="contained" onClick={handleOpen}>
          Добавить вопрос
        </Button>
        {/* </Grid> */}
        <AddQuestion open={open} setOpen={setOpen} />
      </Container>
    </PageWrapper>
  );
}

export default DashboardPage;
