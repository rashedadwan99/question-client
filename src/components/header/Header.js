import React, { useContext } from "react";
import { QuestionContext } from "../..";
import "./header.css";
function Header() {
  const { questions, questionIndex } = useContext(QuestionContext);
  return (
    <header>
      <span>Question {`${questionIndex + 1}/${questions.length}`}</span>
    </header>
  );
}

export default Header;
