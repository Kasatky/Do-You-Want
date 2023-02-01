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
              <Card sx={{ backgroundColor: '#51b3fc', maxHeight: '800px' }}>
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{
                      background:
                        'linear-gradient(to bottom, #0181f5 0%, rgba(93, 178, 255, 0.99) 100%)',
                    }}
                  >
                    Добавить свой вопрос
                  </Button>

                  <QuestionView />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: '#51b3fc',
                  maxHeight: '800px',
                  overflowY: 'scroll',
                  userSelect: 'none',
                }}
              >
                <CardContent sx={{ fontSize: '2vw', userSelect: 'none' }}>
                  {userWishes.length > 7 ? (
                    <>
                      <p style={{ margin: '0px' }}>
                        Доступно желаний {userWishes.length}
                      </p>
                      <p style={{ margin: '0px' }}></p>
                      Пора воплощать их!
                    </>
                  ) : (
                    `Ваши желания`
                  )}

                  <Stack style={{ marginTop: '10px' }}>
                    {userWishes.map((el) => (
                      <Item
                        key={el.id}
                        style={{
                          marginTop: '10px',
                          fontSize: '2vw',
                          userSelect: 'none',
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
    </PageWrapper>
  );
}

export default DashboardPage;
