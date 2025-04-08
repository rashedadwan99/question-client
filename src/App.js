import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { useEffect, useState } from "react";
import { QuestionContext } from ".";
import "./app.css";
import Choosing from "./components/questions/choosingQuestion/Choosing";
import Matching from "./components/questions/matchingQuestions/Matching";
import { getAllQuestions } from "./services/questionService";
import LoadingScreen from "./components/common/loadingScreen/LoadingScreen";
function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getQuestionsHandler = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getAllQuestions();
        setIsLoading(false);

        const updatedQs = questions.map((q) => {
          return q.type === "multiple"
            ? {
                ...q,
                component: Choosing,
              }
            : q.type === "matching"
            ? {
                ...q,
                component: Matching,
              }
            : {
                ...q,
                component: "",
              };
        });

        setQuestions(updatedQs);
      } catch (error) {
        setIsLoading(false);
      }
    };
    getQuestionsHandler();
  }, []);
  const [questionIndex, setQuestionIndex] = useState(0);
  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, questionIndex, setQuestionIndex }}
    >
      <Container fluid className="app-container">
        {!isLoading ? <MainRoutes /> : <LoadingScreen />}
      </Container>
    </QuestionContext.Provider>
  );
}

export default App;
