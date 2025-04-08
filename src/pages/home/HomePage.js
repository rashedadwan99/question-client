import React, { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import QuestionLayout from "../../components/layout/questionLayout/QuestionLayout";

function HomePage() {
  useEffect(() => {
    const body = document.getElementById("body");
    body.style.backgroundImage = 'url("./assets/images/background.jpg")';
    return () => {
      body.style.backgroundImage = "";
    };
  }, []);

  return (
    <MainLayout>
      <QuestionLayout />
    </MainLayout>
  );
}

export default HomePage;
