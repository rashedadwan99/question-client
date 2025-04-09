import React, { useCallback, useContext, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Cimg from "../../common/img/Cimg";
import Qimg from "../../../assets/images/woman.png";
import Stepper from "../../stepper/Stepper";
import Cbutton from "../../common/button/Cbutton";
import { QuestionContext } from "../../..";
import "./questionLayout.css";
import DomParser from "../../common/dom-parser/DomParser";
import { Toast } from "../../common/toast/Toast";
function QuestionLayout() {
  const { questions, questionIndex, setQuestionIndex } =
    useContext(QuestionContext);
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  const [animationName, setAnimationName] = useState("");
  const currentQuestion = questions[questionIndex];
  const onClickNext = useCallback(() => {
    if (!questionIndex) {
      if (!currentQuestion?.name || !currentQuestion?.universityNumber) {
        return Toast("error", "please fill all fields");
      }
    }
    if (questionIndex) {
      const checkingData = data.find(
        (d) => d.questionId === currentQuestion._id
      );
      if (
        currentQuestion?.type === "multiple" &&
        !checkingData?.selectedChoice
      ) {
        return Toast("error", "please select a choice");
      } else if (
        currentQuestion?.type === "filling" &&
        !checkingData?.filledAnswer
      ) {
        return Toast("error", "please fill the field");
      } else if (
        currentQuestion?.type === "matching" &&
        checkingData?.matchingPairs.length <
          currentQuestion?.matchingPairs.length
      ) {
        return Toast("error", "please match all");
      }
    }

    setNext(1);
    setAnimationName("to-left");
    setTimeout(() => {
      setQuestionIndex(questionIndex + 1);
      setAnimationName("");
    }, [500]);
  }, [data, questionIndex, setQuestionIndex, currentQuestion]);
  const onClickBack = useCallback(() => {
    setNext(0);
    setAnimationName("to-right");
    setTimeout(() => {
      setQuestionIndex(questionIndex - 1);
      setAnimationName("");
    }, [500]);
  }, [questionIndex, setQuestionIndex]);

  const componentProps = {
    question: currentQuestion,
    animationName,
    data,
    setData,
  };

  const QuestionComponent = currentQuestion?.component;
  return (
    <Row className="justify-content-between align-items-start px-1">
      <Col xs={12} sm={12} md={12} lg={6} className="my-3">
        <Cimg src={Qimg} alt="woman" className="woman-img" />
        <Stepper {...{ questions, questionIndex, next }} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
        <Row className="justify-content-center">
          <DomParser
            htmlResponse={questions[questionIndex]?.content}
            className="mb-2"
          />
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
              <Cbutton variant="secondary" onClick={onClickNext}>
                submit
              </Cbutton>
            )}
          </Stack>
        </Row>
      </Col>
    </Row>
  );
}

export default QuestionLayout;
