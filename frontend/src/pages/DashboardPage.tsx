import React, { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  Paper,
  IconButton,
  Tooltip,
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
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import { Box } from '@mui/material';
import InfoModal from '../features/InfoModal';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function DashboardPage() {
  const [openNewQuestion, setOpenNewQuestion] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openPromptQuestion, setOpenPromptQuestion] = useState(false);
  const userWishes = useSelector((state: RootState) => state.wish.addedWishes);

  const dispatch = useAppDispatch();

  const handleOpenNewQuestion = () => setOpenNewQuestion(true);
  const handleOpenInfo = () => setOpenInfo(true);

  useEffect(() => {
    dispatch(addUserWishes());
  }, [dispatch]);

  const handleOpenPrompt = () => {
    setOpenPromptQuestion(true);
    setTimeout(() => {
      setOpenPromptQuestion(false);
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
              <Card sx={{ backgroundColor: '#ffffff00', boxShadow: 'none', maxHeight: '800px' }}>
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={handleOpenNewQuestion}
                    className="btn"
                  >
                    <AddIcon /> свой вопрос
                  </Button>
                  <QuestionView />
                </CardContent>
              </Card>
              <IconButton onClick={handleOpenInfo}>
                <Tooltip title="О приложении" sx={{ fontSize: '30px', width: '30px', background: 'white' }}>

                  <LiveHelpIcon fontSize='large' sx={{ color: 'white' }} />

                </Tooltip>
              </IconButton>
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
                  <Box sx={{ fontFamily: 'Caveat, cursive', lineHeight: 1.1, }} >
                    <div style={{ margin: '0px', }}>
                      Желаний уже <span style={{ fontSize: '1.1em', fontFamily: 'cursive' }}>{' '}{userWishes.length}!</span>
                    </div>
                    <div style={{ margin: '0px' }}></div>
                    Самое время начать!
                  </Box>
                ) : (
                  <Box sx={{ fontSize: '1.1rem' }}>Ты хочешь:</Box>
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
                <CardContent sx={{ fontSize: '1.5em', fontWeight: 'bold', userSelect: 'none', background: '#ffffff00', marginTop: '-1em', }}>

                  <Stack style={{ marginTop: '10px' }}>
                    {userWishes && userWishes.map((el) => (
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
          open={openNewQuestion}
          setOpen={setOpenNewQuestion}
          handleOpenPrompt={handleOpenPrompt}
        />
        {openInfo && <InfoModal open={openInfo} setOpenInfo={setOpenInfo} />}

        <ModalPrompt open={openPromptQuestion} />
      </Container>
    </PageWrapper >
  );
}

export default DashboardPage;
