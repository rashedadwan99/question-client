import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { useEffect, useState } from "react";
import { QuestionContext } from ".";
import "./app.css";
import Choosing from "./components/questions/choosingQuestion/Choosing";
import Matching from "./components/questions/matchingQuestions/Matching";
import { getAllQuestions } from "./services/questionService";
import LoadingScreen from "./components/common/loadingScreen/LoadingScreen";
import Filling from "./components/questions/fillingQuestions/Filling";
import FirstForm from "./components/questions/first-form/FirstForm";
import { ToastContainer } from "react-toastify";

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [leftPairs, setLeftPairs] = useState([]);
  const [rightPairs, setRightPairs] = useState([]);

  const currentQuestion = questions[questionIndex];

  const shuffle = (array) =>
    [...array]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  useEffect(() => {
    if (currentQuestion?.matchingPairs) {
      setLeftPairs(
        shuffle(currentQuestion.matchingPairs.map((pair) => pair.left))
      );
      setRightPairs(
        shuffle(currentQuestion.matchingPairs.map((pair) => pair.right))
      );
    }
  }, [currentQuestion]);

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

        setQuestions([
          {
            content: "<b>Fill the Form<b>",
            name: "",
            universityNumber: "",
            component: FirstForm,
          },
          ...updatedQs,
        ]);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        setIsLoading(false);
      }
    };

    getQuestionsHandler();
  }, []);

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
