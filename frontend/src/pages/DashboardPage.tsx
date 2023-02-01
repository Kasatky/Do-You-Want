import React, { useEffect, useState } from "react";
import { Container, Card, CardContent, Button, Grid } from "@mui/material";
import PageWrapper from "../Wrappers/PageWrapper";
import QuestionView from "../Question/QuestionView";
import AddQuestion from "../AddQuestion/AddQuestion";
import ModalPrompt from "../features/ModalPrompt";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { addUserWishes } from "../wishSlice";

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
    <PageWrapper isProfile={false} isAdmin={false}>
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
              <Card sx={{ backgroundColor: '#ccc' }}>
                <CardContent>
                  <Button variant="contained" onClick={handleOpen}>
                    Добавить свой вопрос
                  </Button>

                  <QuestionView />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card sx={{ backgroundColor: '#ccc', height: '400px' }}>
                <CardContent>
                  Список вопросов, на которые вы ответили "да":
                  <div>
                    {userWishes.map((el) => (
                      <div key={el.id}>{el?.wish?.wish}</div>
                    ))}
                  </div>
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
