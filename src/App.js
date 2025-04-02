import { Container } from "react-bootstrap";
import MainRoutes from "./routes/MainRoutes";
import { useEffect, useState } from "react";
import { QuestionContext } from ".";
import "./app.css";
import Choosing from "./components/questions/choosingQuestion/Choosing";
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
      label: "what is your major",
      answers: [
        {
          id: 1,
          content: "CS",
        },
        {
          id: 2,
          content: "CIS",
        },
        {
          id: 3,
          content: "BIT",
        },
      ],
    },
  ]);
  useEffect(() => {
    const updatedQs = questions.map((q) => ({
      ...q,
      component: q.answers ? Choosing : q.component, // Only update if `answers` exist
    }));

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
