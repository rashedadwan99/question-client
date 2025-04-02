import React, { useState, useEffect } from "react";
import "./matching.css";

function Matching({ answers = [], questions = [], setData, data }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [matches, setMatches] = useState([]); // Stores matched pairs as [{ qId, ansId }]
  useEffect(() => {
    // Update data whenever matches change
    if (matches.length) setData([...data, ...matches]); // Ensure matches are spread into data
  }, [matches]);

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
  };

  const handleAnswerClick = (answerId) => {
    if (selectedQuestion !== null) {
      setMatches((prevMatches) => {
        let updatedMatches = [...prevMatches];

        // Check if the answer is already matched to another question
        const existingMatchIndex = updatedMatches.findIndex(
          (match) => match.ansId === answerId
        );

        if (existingMatchIndex !== -1) {
          updatedMatches.splice(existingMatchIndex, 1); // Remove old match
        }

        // Check if the selected question is already matched
        const questionMatchIndex = updatedMatches.findIndex(
          (match) => match.qId === selectedQuestion
        );

        if (questionMatchIndex !== -1) {
          updatedMatches.splice(questionMatchIndex, 1); // Unmatch previous answer
        }

        // If selecting the same answer, remove the match (toggle off)
        const isAlreadyMatched = prevMatches.some(
          (match) => match.qId === selectedQuestion && match.ansId === answerId
        );

        if (!isAlreadyMatched) {
          updatedMatches.push({ qId: selectedQuestion, ansId: answerId });
        }

        setSelectedQuestion(null); // Reset selection
        return updatedMatches;
      });
    }
  };

  return (
    <div className="matching-container">
      {/* Column 1 (Questions) */}
      <ul className="column">
        <h6>Column 1 (Questions)</h6>
        {questions.map((q) => {
          const matchedAnswer = data.find((match) => match.qId === q.id);
          return (
            <li
              key={q.id}
              className={`list-item question ${
                selectedQuestion === q.id ? "selected" : ""
              }`}
              onClick={() => handleQuestionClick(q.id)}
            >
              {q.content}
              {matchedAnswer && (
                <span className="match-indicator">
                  ✅ Matched with:{" "}
                  {answers.find((a) => a.id === matchedAnswer.ansId)?.content}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="vertical-line" />

      {/* Column 2 (Answers) */}
      <ul className="column">
        <h6>Column 2 (Answers)</h6>
        {answers.map((a) => {
          const matchedQuestion = data.find((match) => match.ansId === a.id);
          return (
            <li
              key={a.id}
              className="list-item answer"
              onClick={() => handleAnswerClick(a.id)}
            >
              {a.content}
              {matchedQuestion && (
                <span className="match-indicator">
                  ✅ Matched with:{" "}
                  {questions.find((q) => q.id === matchedQuestion.qId)?.content}
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
