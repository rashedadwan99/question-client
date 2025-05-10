import React, { useState, useContext } from "react";
import "./matching.css";
import { Col, Row } from "react-bootstrap";
import { QuestionContext } from "../../../context/QuestionProvider";
import { sliceString } from "../../../utils/sliceString";
import { useLocation } from "react-router-dom";
import { routes } from "../../../routes/routes";

function Matching({ question, setData, data }) {
  const [leftPair, setLeftPair] = useState(null);
  const { leftPairs, rightPairs } = useContext(QuestionContext);
  const { pathname } = useLocation();

  const isHomePage = pathname === routes.homeRoute;

  const matchingAnswer = isHomePage
    ? data?.find((entry) => entry.matchingAnswer)?.matchingAnswer || []
    : question.matchingPairs || [];

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

    const filteredData = data?.filter((d) => !d.matchingAnswer);
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
        <h6>click on the question then choose the answer</h6>
        <div className="matching-container">
          {/* Questions Column */}
          <ul className="column">
            <h6>(Questions)</h6>
            {leftPairs.map((left, i) => {
              const matched = findMatchFor("left", left);
              return (
                <li
                  key={i}
                  className={`list-item question ${
                    leftPair === left ? "selected" : ""
                  } ${matched ? "matched" : ""}`}
                  onClick={() =>
                    isHomePage ? handleQuestionClick(left) : () => {}
                  }
                >
                  {left}
                  {matched && (
                    <span className="match-indicator">
                      ✅ Matched with:
                      {sliceString(matched.right)}
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
            {rightPairs.map((right, i) => {
              const matched = findMatchFor("right", right);
              return (
                <li
                  key={i}
                  className={`list-item answer ${matched ? "matched" : ""}`}
                  onClick={
                    isHomePage ? () => handleAnswerClick(right) : () => {}
                  }
                >
                  {right}
                  {matched && (
                    <span className="match-indicator">
                      ✅ Matched with:
                      {sliceString(matched.left)}
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
