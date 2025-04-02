import React, { useCallback, useContext, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Cimg from "../../common/img/Cimg";
import Qimg from "../../../assets/images/woman.png";
import Stepper from "../../stepper/Stepper";
import Cbutton from "../../common/button/Cbutton";
import { QuestionContext } from "../../..";
import "./questionLayout.css";
function QuestionLayout() {
  const questions = useContext(QuestionContext);
  const [data, setData] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [next, setNext] = useState(0);
  const onClickNext = useCallback(() => {
    setQuestionIndex(questionIndex + 1);
    setNext(1);
  }, [questionIndex]);
  const onClickBack = useCallback(() => {
    setQuestionIndex(questionIndex - 1);
    setNext(0);
  }, [questionIndex]);

  const choosingProps = {
    answers: questions[questionIndex].answers,
    question: questions[questionIndex],

    data,
    setData,
  };
  const QuestionComponent = questions[questionIndex].component;
  return (
    <Row className="justify-content-between align-items-start">
      <Col xs={12} sm={12} md={12} lg={6} className="my-3">
        <Cimg
          src={Qimg}
          alt="woman"
          style={{ objectFit: "cover", maxWidth: "80%" }}
        />
        <Stepper {...{ questions, questionIndex, next }} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
        <Row className="justify-content-center">
          <h3 className="question-label mb-5">
            {questions[questionIndex].label}
          </h3>
          <Stack className="mb-3 justify-content-center align-items-start">
            {QuestionComponent && <QuestionComponent {...choosingProps} />}
          </Stack>
          <Stack direction="horizontal" className="justify-content-between">
            {questionIndex ? (
              <Cbutton onClick={onClickBack}>back</Cbutton>
            ) : (
              <></>
            )}
            {questionIndex !== questions.length - 1 ? (
              <Cbutton variant="secondary" onClick={onClickNext}>
                next
              </Cbutton>
            ) : (
              <></>
            )}
          </Stack>
        </Row>
      </Col>
    </Row>
  );
}

export default QuestionLayout;
