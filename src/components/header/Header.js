import React, { useContext } from "react";
import "./header.css";
import { QuestionContext } from "../../context/QuestionProvider";
function Header() {
  const { questions, questionIndex } = useContext(QuestionContext);
  return (
    <header>
      <span>Question {`${questionIndex + 1}/${questions.length}`}</span>
    </header>
  );
}

export default Header;
