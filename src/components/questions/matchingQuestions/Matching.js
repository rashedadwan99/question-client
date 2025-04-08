import React, { useState, useEffect } from "react";
import "./matching.css";

function Matching({ question, setData, data }) {
  const [leftPair, setLeftPair] = useState(null);
  const [leftPairs, setLeftPairs] = useState([]);
  const [rightPairs, setRightPairs] = useState([]);

  useEffect(() => {
    setLeftPairs(question.matchingPairs.map((pair) => pair.left));
    setRightPairs(question.matchingPairs.map((pair) => pair.right));
  }, [question]);

  const matchingPairs =
    data.find((entry) => entry.matchingPairs)?.matchingPairs || [];

  const handleQuestionClick = (left) => {
    setLeftPair(left);
  };

  const handleAnswerClick = (right) => {
    if (!leftPair) return;

    const matchedPair = matchingPairs.find(
      (pair) => pair.left === leftPair && pair.right === right
    );

    let updatedPairs;

    if (matchedPair) {
      // If already matched, remove the pair (toggle off)
      updatedPairs = matchingPairs.filter(
        (pair) => !(pair.left === leftPair && pair.right === right)
      );
    } else {
      // If either left or right already matched with another, remove the old one
      updatedPairs = matchingPairs
        .filter((pair) => pair.left !== leftPair && pair.right !== right)
        .concat({ left: leftPair, right });
    }

    const filteredData = data.filter((d) => !d.matchingPairs);
    setData([...filteredData, { matchingPairs: updatedPairs }]);
    setLeftPair(null);
  };

  const findMatchFor = (side, value) =>
    matchingPairs.find((pair) => pair[side] === value);

  console.log(matchingPairs);
  return (
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
  );
}

export default Matching;
