import React, { useState, useContext } from "react";
import "./matching.css";
import { Col, Row } from "react-bootstrap";
import { QuestionContext } from "../../..";

function Matching({ question, setData, data }) {
  const [leftPair, setLeftPair] = useState(null);
  const { leftPairs, rightPairs } = useContext(QuestionContext);

  const matchingAnswer =
    data.find((entry) => entry.matchingAnswer)?.matchingAnswer || [];

  const handleQuestionClick = (left) => {
    setLeftPair(left);
  };

  const handleAnswerClick = (right) => {
    if (!leftPair) return;

    const matchedPair = matchingAnswer.find(
      (pair) => pair.left === leftPair && pair.right === right
    );

    let updatedPairs;

    if (matchedPair) {
      updatedPairs = matchingAnswer.filter(
        (pair) => !(pair.left === leftPair && pair.right === right)
      );
    } else {
      updatedPairs = matchingAnswer
        .filter((pair) => pair.left !== leftPair && pair.right !== right)
        .concat({ left: leftPair, right });
    }

    const filteredData = data.filter((d) => !d.matchingAnswer);
    setData([
      ...filteredData,
      { questionId: question._id, matchingAnswer: updatedPairs },
    ]);
    setLeftPair(null);
  };

  const findMatchFor = (side, value) =>
    matchingAnswer.find((pair) => pair[side] === value);

  return (
    <Col sm={12}>
      <Row>
        <div className="matching-container">
          {/* Questions Column */}
          <ul className="column">
            <h6>(Questions)</h6>
            {leftPairs.map((left) => {
              const matched = findMatchFor("left", left);
              return (
                <li
                  key={left}
                  className={`list-item question ${
                    leftPair === left ? "selected" : ""
                  } ${matched ? "matched" : ""}`}
                  onClick={() => handleQuestionClick(left)}
                >
                  {left}
                  {matched && (
                    <span className="match-indicator">
                      ✅ Matched with: {matched.right}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="vertical-line" />

          {/* Answers Column */}
          <ul className="column">
            <h6>(Answers)</h6>
            {rightPairs.map((right) => {
              const matched = findMatchFor("right", right);
              return (
                <li
                  key={right}
                  className={`list-item answer ${matched ? "matched" : ""}`}
                  onClick={() => handleAnswerClick(right)}
                >
                  {right}
                  {matched && (
                    <span className="match-indicator">
                      ✅ Matched with: {matched.left}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Row>
    </Col>
  );
}

export default Matching;
