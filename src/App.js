import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { useEffect, useState } from "react";
import { QuestionContext } from ".";
import Choosing from "./components/questions/choosingQuestion/Choosing";
import Matching from "./components/questions/matchingQuestions/Matching";
import { getAllQuestions } from "./services/questionService";
import LoadingScreen from "./components/common/loadingScreen/LoadingScreen";
import Filling from "./components/questions/fillingQuestions/Filling";
import FirstForm from "./components/questions/first-form/FirstForm";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import { routes } from "./routes/routes";
import "./app.css";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [leftPairs, setLeftPairs] = useState([]);
  const [rightPairs, setRightPairs] = useState([]);

  const currentQuestion = questions[questionIndex];

  useEffect(() => {
    const shuffle = (array) =>
      [...array]
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    if (currentQuestion?.matchingPairs) {
      const lefts = currentQuestion.matchingPairs.map((pair) => pair.left);
      const rights = currentQuestion.matchingPairs.map((pair) => pair.right);

      setLeftPairs(shuffle(lefts));
      setRightPairs(shuffle(rights));
    }
  }, [currentQuestion]);
  const { pathname } = useLocation();
  useEffect(() => {
    const getQuestionsHandler = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getAllQuestions();
        setIsLoading(false);

        const updatedQs = questions.map((q) => {
          const base = { ...q, goNext: false };
          if (q.type === "multiple") return { ...base, component: Choosing };
          if (q.type === "matching") return { ...base, component: Matching };
          return { ...base, component: Filling };
        });
        setQuestions(
          pathname === routes.homeRoute
            ? [
                {
                  content: "Fill the Form",
                  name: "",
                  universityNumber: "",
                  component: FirstForm,
                },
                ...updatedQs,
              ]
            : [...updatedQs]
        );
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setIsLoading(false);
      }
    };

    getQuestionsHandler();
  }, [pathname]);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        questionIndex,
        setQuestionIndex,
        leftPairs,
        rightPairs,
      }}
    >
      {!isLoading ? (
        <Container fluid className="app-container">
          <ToastContainer />

          <MainRoutes />
        </Container>
      ) : (
        <LoadingScreen />
      )}
    </QuestionContext.Provider>
  );
}

export default App;
