import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { useEffect, useState } from "react";
import { QuestionContext } from ".";
import "./app.css";
import Choosing from "./components/questions/choosingQuestion/Choosing";
import Matching from "./components/questions/matchingQuestions/Matching";
function App() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      label: "what is your hoppies",
      answers: [
        {
          id: 1,
          content: "football",
        },
        {
          id: 2,
          content: "basketball",
        },
        {
          id: 3,
          content: "tennis",
        },
      ],
    },
    {
      id: 2,
      label: "matching",
      questions: [
        { content: "jordan", id: 1 },
        { content: "palestine", id: 2 },
      ],
      answers: [
        {
          id: 1,
          content: "a mansaf country",
        },
        {
          id: 2,
          content: "an arabic country, forever",
        },
      ],
    },
  ]);
  useEffect(() => {
    const updatedQs = questions.map((q) => {
      return !q.questions
        ? {
            ...q,
            component: Choosing,
          }
        : {
            ...q,
            component: Matching,
          };
    });

    setQuestions(updatedQs);
  }, []);
  const [questionIndex, setQuestionIndex] = useState(0);
  return (
    <QuestionContext.Provider
      value={{ questions, setQuestions, questionIndex, setQuestionIndex }}
    >
      <Container fluid className="app-container">
        <MainRoutes />
      </Container>
    </QuestionContext.Provider>
  );
}

export default App;
