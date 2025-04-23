import React, { useContext } from "react";
import { QuestionContext } from "../..";
import MainLayout from "../../components/layout/MainLayout";
import { Col, Stack } from "react-bootstrap";
import DomParser from "../../components/common/dom-parser/DomParser";
import PairsContainer from "./PairsContainer"
import "./answers.css";
function Answers() {
  const { questions } = useContext(QuestionContext);

  return (
    <MainLayout showHeader={false}>
      {questions.slice(1).map((q, i) => {
          return (
            <Col key={i} xs={12} sm={12} className="my-5 p-2">
              <h6>Question {i} :</h6>
              <Stack className="answer-container">
                <DomParser htmlResponse={q.content} />
              </Stack>
              <h6>Answer :</h6>
              <Stack className="answer-container">
                {q.correctAnswer && (
                  <textarea readOnly>{q.correctAnswer}</textarea>
                )}
                {q.matchingPairs && <PairsContainer />}
              </Stack>
              <hr />
            </Col>
          );
      })}
    </MainLayout>
  );
}

export default Answers;
