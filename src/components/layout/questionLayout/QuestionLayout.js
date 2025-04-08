import React, { useCallback, useContext, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Cimg from "../../common/img/Cimg";
import Qimg from "../../../assets/images/woman.png";
import Stepper from "../../stepper/Stepper";
import Cbutton from "../../common/button/Cbutton";
import { QuestionContext } from "../../..";
import "./questionLayout.css";
import DomParser from "../../common/dom-parser/DomParser";
function QuestionLayout() {
  const { questions, questionIndex, setQuestionIndex } =
    useContext(QuestionContext);
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  const [animationName, setAnimationName] = useState("");

  const onClickNext = useCallback(() => {
    setNext(1);
    setAnimationName("to-left");
    setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
      setAnimationName("");
    }, [1000]);
  }, [questionIndex, setQuestionIndex]);
  const onClickBack = useCallback(() => {
    setNext(0);
    setAnimationName("to-right");
    setTimeout(() => {
      setQuestionIndex(questionIndex - 1);
      setAnimationName("");
    }, [1000]);
  }, [questionIndex, setQuestionIndex]);

  const componentProps =
    questions[questionIndex]?.type === "multiple"
      ? {
          question: questions[questionIndex],
          animationName,
          data,
          setData,
        }
      : {
          data,
          setData,
          question: questions[questionIndex],
        };
  const QuestionComponent = questions[questionIndex]?.component;
  return (
    <Row className="justify-content-between align-items-start px-1">
      <Col xs={12} sm={12} md={12} lg={6} className="my-3">
        <Cimg src={Qimg} alt="woman" className="woman-img" />
        <Stepper {...{ questions, questionIndex, next }} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
        <Row className="justify-content-center">
          <h3 className="question-content mb-5">
            <DomParser htmlResponse={questions[questionIndex]?.content} />
          </h3>
          <Stack
            className={`mb-3 justify-content-center align-items-start ${animationName}`}
          >
            {QuestionComponent && <QuestionComponent {...componentProps} />}
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
