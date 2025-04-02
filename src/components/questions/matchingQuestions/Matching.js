import React from "react";
import "./matching.css";
function Matching({ answers = [], questions = [], data, setData, label }) {
  return (
    <div className="matching-container">
      <ul>
        <h6>column 1</h6>
        {questions.map((q) => {
          return (
            <li key={q.id} className={`list-item`}>
              {q.content}
            </li>
          );
        })}
      </ul>
      <div className="vertical-line" />
      <ul>
        <h6>column 2</h6>

        {answers.map((a) => {
          return (
            <li key={a.id} className={`list-item`}>
              {a.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Matching;
