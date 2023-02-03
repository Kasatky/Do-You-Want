import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Stack,
  Paper,
} from "@mui/material";
import PageWrapper from "../Wrappers/PageWrapper";
import QuestionView from "../Question/QuestionView";
import AddQuestion from "../AddQuestion/AddQuestion";
import ModalPrompt from "../features/ModalPrompt";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { addUserWishes } from "../wishSlice";
import { styled } from "@mui/material/styles";
import AddedWish from "../features/AddedWish";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
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
      <Container sx={{ marginTop: "40px", marginBottom: "40px" }}>
        <Grid
          container
          rowSpacing={4}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={1} container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Card
                sx={{
                  marginTop: '50px',
                  backgroundColor: "rgba(255,255,255, 0.7)",
                  maxHeight: "800px",
                  fontWeight: "lighter !important",
                  fontFamily: '"Gill Sans", sans-serif !important',
                }}
              >
                <CardContent>
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    className="btn"
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
                  // backgroundColor: 'rgba(255,255,255, 0.0)',
                  background: 'transparent',
                  boxShadow:"none",
                  maxHeight: "800px",
                  overflowY: "scroll",
                  userSelect: "none",
                }}
              >
                <CardContent
                  sx={{
                    marginTop: '-20px',
                    fontSize: "1.9em",
                    userSelect: "none",
                    fontWeight: "lighter !important",
                    fontFamily: '"Gill Sans", sans-serif !important',
                  }}
                >
                  {userWishes.length > 7 ? (
                    <>
                      <p
                        style={{
                          margin: "0px",
                          fontWeight: "lighter !important",
                          fontFamily: '"Gill Sans", sans-serif !important',
                        }}
                      >
                        Доступно желаний {userWishes.length}
                      </p>
                      <p
                        style={{
                          margin: "0px",
                          fontWeight: "lighter !important",
                          fontFamily: '"Gill Sans", sans-serif !important',
                        }}
                      ></p>
                      Пора воплощать их!
                    </>
                  ) : (
                    `Ваши желания`
                  )}

                  <Stack style={{ marginTop: "10px" }}>
                    {userWishes.map((el) => (
                      <Item
                        key={el.id}
                        style={{
                          marginTop: "10px",
                          fontSize: "1em",
                          userSelect: "none",
                          fontWeight: "lighter !important",
                          fontFamily: '"Gill Sans", sans-serif !important',
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
