import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllQuestions } from "../services/questionService";
import Choosing from "../components/questions/choosingQuestion/Choosing";
import Matching from "../components/questions/matchingQuestions/Matching";
import Filling from "../components/questions/fillingQuestions/Filling";
import FirstForm from "../components/questions/first-form/FirstForm";
import { routes } from "../routes/routes";
import { AudioCacheProvider } from "./AudioCacheContext";

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leftPairs, setLeftPairs] = useState([]);
  const [rightPairs, setRightPairs] = useState([]);
  const location = useLocation();

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

  useEffect(() => {
    const getQuestionsHandler = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getAllQuestions();

        const updatedQs = questions.map((q) => {
          const base = { ...q, goNext: false };
          if (q.type === "multiple") return { ...base, component: Choosing };
          if (q.type === "matching") return { ...base, component: Matching };
          return { ...base, component: Filling };
        });

        setQuestions(
          location.pathname === routes.homeRoute
            ? [
                {
                  content: "Fill the Form",
                  name: "",
                  universityNumber: "",
                  component: FirstForm,
                },
                ...updatedQs,
              ]
            : [
                {
                  content: "Check the answers",
                  component: CheckAnswers,
                },
                ...updatedQs,
              ]
        );
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getQuestionsHandler();
  }, [location.pathname]);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        setQuestions,
        questionIndex,
        setQuestionIndex,
        leftPairs,
        rightPairs,
        isLoading,
      }}
    >
      {/* <AudioCacheProvider>
        </AudioCacheProvider> */}

      {children}
    </QuestionContext.Provider>
  );
};

export const useQuestionContext = () => useContext(QuestionContext);
export default function CheckAnswers() {
  return <></>;
}
