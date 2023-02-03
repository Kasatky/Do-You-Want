import React from "react";
import { Container, Card, Box } from "@mui/material";
import QuestionCarousel from "../features/QuestionCarousel";
import PageWrapper from "../Wrappers/PageWrapper";
import About from "../features/About";

function LandingPage(): JSX.Element {
  return (
    <PageWrapper isAdmin={false}>
      <Container
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
          borderRadius: "9px",
          width: "70%",
          position: "absolute",
          right: "1em",
        }}
      >
        <QuestionCarousel />

        <About />

        <Box
          sx={{
            marginTop: "10vh",
            width: "60vw",
            backgroundColor: "#ffffff00",
            fontSize: "4vh",
            boxShadow: "none",
          }}
        >
          <Box>
            <div className="text">
              Человеку в апатии сложно определить свои желания, кажется, что
              совсем ничего не хочется и ничего не радует.
            </div>
          </Box>
          Также в сложные моменты не просто сориентироваться в своих желаниях,
          наш сайт поможет скорректировать свои ценности и стремления.
        </Box>
      </Container>
    </PageWrapper>
  );
}

export default LandingPage;
