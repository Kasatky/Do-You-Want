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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import { UserWish } from '../wishTypes';
import AddedWish from '../features/AddedWish';


function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [openPrompt, setOpenPrompt] = useState(false);

  const handleOpen = () => setOpen(true);

  const dispatch = useAppDispatch();
  const userWishes = useSelector((state: RootState) => state.wish.addedWishes);

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

              <Card sx={{ backgroundColor: '#ccc', maxHeight: '800px' }}>

                <CardContent>
                  <Button variant="contained" onClick={handleOpen}>
                    Добавить свой вопрос
                  </Button>

                  <QuestionView />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={12} sm={4}>
              <Card
                sx={{
                  backgroundColor: '#ccc',
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
                      <>
                        <Item
                          key={el.id}
                          style={{
                            marginTop: '10px',
                            fontSize: '2vw',
                            userSelect: 'none',
                          }}
                        >
                          {el?.wish?.wish[0].toUpperCase() +
                            el?.wish?.wish.slice(1, el?.wish?.wish.length - 1)}
                        </Item>
                      </>

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
