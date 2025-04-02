import React from "react";
import "./stepper.css";
function Stepper({ questions, questionIndex, next }) {
  return (
    <ul className="stepper mt-4">
      {questions.map((_, i) => {
        return (
          <li
            key={i}
            className={`step${questionIndex === i ? " active" : ""}${
              next ? "" : " back"
            }`}
          />
        );
      })}
    </ul>
  );
}

export default Stepper;
