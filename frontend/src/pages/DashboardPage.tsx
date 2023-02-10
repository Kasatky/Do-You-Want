import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  Paper,
} from '@mui/material';
import PageWrapper from '../Wrappers/PageWrapper';
import QuestionView from '../Question/QuestionView';
import AddQuestion from '../AddQuestion/AddQuestion';
import ModalPrompt from '../features/ModalPrompt';
import { RootState, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { addUserWishes } from '../wishSlice';
import { styled } from '@mui/material/styles';
import AddedWish from '../features/AddedWish';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);
  const userWishes = useSelector((state: RootState) => state.wish.addedWishes);

  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    dispatch(addUserWishes());
  }, [dispatch]);

  const handleOpenPrompt = () => {
    setOpenPrompt(true);
    setTimeout(() => {
      setOpenPrompt(false);
    }, 2000);
  };

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
              <Card sx={{ backgroundColor: '#ffffff00', maxHeight: '800px' }}>
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    className="btn"
                  >
                    <AddIcon /> свой вопрос
                  </Button>

                  <QuestionView />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Card sx={{
                color: '#464b68',
                backgroundColor: '#dcd8e2f2',
                marginTop: '0em',
                alignItems: 'center',
                userSelect: 'none',
                fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                fontWeight: 500,
                fontSize: '1.3rem',
                lineHeight: 1.5,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
                width: '90%',
                padding: '6px 16px',
                borderRadius: '30px',
                marginBottom: '1em'
              }}>
                {userWishes.length > 7 ? (
                  <>
                    <p style={{ margin: '0px' }}>
                      Доступно желаний {userWishes.length}
                    </p>
                    <p style={{ margin: '0px' }}></p>
                    Пора воплощать их!
                  </>
                ) : (
                  <Box sx={{ fontSize: '1.1rem' }}>Ваши желания:</Box>
                )}
              </Card>
              <Card
                className='scrollBar'
                sx={{
                  borderRadius: '50px',
                  boxShadow: 'none',
                  backgroundColor: '#ffffff00',
                  maxHeight: '600px',
                  overflowY: 'auto',
                  userSelect: 'none',
                  maxWidth: '28em'
                }}
              >
                <CardContent sx={{ fontSize: '1.5em', fontWeight: 'bold', userSelect: 'none', background: '#ffffff00' }}>

                  <Stack style={{ marginTop: '10px' }}>
                    {userWishes.map((el) => (
                      <Item
                        key={el.id}
                        style={{
                          marginTop: '10px',
                          fontSize: '1em',
                          lineHeight: 0.8,
                          userSelect: 'none',
                          backgroundColor: '#dcd8e2e6',
                          borderRadius: '30px',
                        }}
                      >
                        <AddedWish wish={el} />
                      </Item>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <AddQuestion
          open={open}
          setOpen={setOpen}
          handleOpenPrompt={handleOpenPrompt}
        />

        <ModalPrompt open={openPrompt} />
      </Container>
    </PageWrapper >
  );
}

export default DashboardPage;
